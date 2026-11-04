import { useState } from "react";

import scenarioMetadata from "../assets/mock_invest/scenario_metadata.js";
import BottomTab from "../components/common/BottomTab";
import ScenarioCard from "../components/mock_invest/ScenarioCard";
import TradeMain from "../components/mock_invest/TradeMain";
import TradeResult from "../components/mock_invest/TradeResult";
import "./MockInvestPage.css";

export default function MockInvestPage() {
  const [step, setStep] = useState("select");
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [result, setResult] = useState(null);

  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
    setStep("trade");
  };

  const handleFinish = (tradeResult) => {
    setResult(tradeResult);
    setStep("result");
  };

  let content;

  if (step === "trade") {
    content = (
      <TradeMain
        scenario={selectedScenario}
        onBack={() => setStep("select")}
        onFinish={handleFinish}
      />
    );
  } else if (step === "result") {
    content = (
      <TradeResult
        scenario={selectedScenario}
        result={result}
        onRetry={() => setStep("select")}
      />
    );
  } else {
    content = (
      <>
        <p className="mock-part">B Part 모의투자</p>
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
  }

  return (
    <div className="mock-page">
      {content}
      <BottomTab />
    </div>
  );
}