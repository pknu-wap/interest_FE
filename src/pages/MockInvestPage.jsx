import { useState } from "react";

import scenarioMetadata from "../assets/mock_invest/scenario_metadata.js";
import BottomTab from "../components/common/BottomTab";
import FreeStockSelect from "../components/mock_invest/FreeStockSelect";
import PeriodSelect from "../components/mock_invest/PeriodSelect";
import ScenarioCard from "../components/mock_invest/ScenarioCard";
import TradeMain from "../components/mock_invest/TradeMain";
import TradeResult from "../components/mock_invest/TradeResult";
import "./MockInvestPage.css";

export default function MockInvestPage() {
  const [step, setStep] = useState("mode");
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [result, setResult] = useState(null);

  // 시나리오 모드: 기존 임시 데이터(scenario_metadata.js) 사용
  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
    setStep("trade");
  };

  // 자유 투자 모드: 고른 종목 + 시작 시점으로 거래 화면에 넘길 데이터를 만들어요
  const handleSelectStock = (stock) => {
    setSelectedStock(stock);
    setStep("free-period");
  };

  const handleSelectPeriod = (period) => {
    const dates = selectedStock.dates.slice(-period.days);
    const prices = selectedStock.prices.slice(-period.days);

    setSelectedScenario({
      id: `free-${selectedStock.stockCode}`,
      mode: "free",
      stockName: selectedStock.stockName,
      startDate: dates[0],
      dates,
      prices,
      companyInfo: selectedStock.companyInfo,
    });
    setStep("trade");
  };

  const handleFinish = (tradeResult) => {
    setResult(tradeResult);
    setStep("result");
  };

  const handleBackFromTrade = () => {
    setStep(selectedScenario.mode === "free" ? "free-period" : "select");
  };

  let content;

  if (step === "trade") {
    content = (
      <TradeMain
        scenario={selectedScenario}
        onBack={handleBackFromTrade}
        onFinish={handleFinish}
      />
    );
  } else if (step === "result") {
    content = (
      <TradeResult
        scenario={selectedScenario}
        result={result}
        onRetry={() => setStep("mode")}
      />
    );
  } else if (step === "select") {
    content = (
      <>
        <button className="mock-link" onClick={() => setStep("mode")}>
          ← 모드 다시 고르기
        </button>
        <h1 className="mock-title">어떤 종목으로 시작할까요?</h1>
        {scenarioMetadata.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            onSelect={handleSelectScenario}
          />
        ))}
      </>
    );
  } else if (step === "free-stock") {
    content = (
      <FreeStockSelect
        onSelect={handleSelectStock}
        onBack={() => setStep("mode")}
      />
    );
  } else if (step === "free-period") {
    content = (
      <PeriodSelect
        stock={selectedStock}
        onSelect={handleSelectPeriod}
        onBack={() => setStep("free-stock")}
      />
    );
  } else {
    content = (
      <>
        <p className="mock-part">B Part · 모의투자</p>
        <h1 className="mock-title">어떻게 연습해 볼까요?</h1>

        <button className="mock-scenario" onClick={() => setStep("select")}>
          <strong>시나리오 모드</strong>
          <span>정해진 상황 속에서 배운 내용을 복습해보아요</span>
        </button>
        <button
          className="mock-scenario"
          onClick={() => setStep("free-stock")}
        >
          <strong>자유 투자 모드</strong>
          <span>실제 종목을 골라 과거 시세로 투자해 봐요</span>
        </button>
      </>
    );
  }

  return (
    <div className="mock-page">
      {content}
      <BottomTab />
    </div>
  );
}