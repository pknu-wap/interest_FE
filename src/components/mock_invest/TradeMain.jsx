import { useState } from "react";

import CompanyInfo from "./CompanyInfo";
import PriceChart from "./PriceChart";
import SafetyGuardBanner from "./SafetyGuardBanner";
import {
  INITIAL_QUANTITY,
  calculateProfit,
} from "../../utils/mock_invest/tradeUtils";

export default function TradeMain({ scenario, onBack, onFinish }) {
  const [view, setView] = useState("main");
  const [hasCheckedCompanyInfo, setHasCheckedCompanyInfo] = useState(false);
  const [hasCheckedFinancials, setHasCheckedFinancials] = useState(false);
  const [pendingTrade, setPendingTrade] = useState(null);
  const [trades, setTrades] = useState([]);

  const [dayIndex, setDayIndex] = useState(0);
  const [skipDays, setSkipDays] = useState(1);
  const [quantity, setQuantity] = useState(INITIAL_QUANTITY);
  const [averagePrice, setAveragePrice] = useState(scenario.prices[0]);

  const lastIndex = scenario.prices.length - 1;
  const currentPrice = scenario.prices[dayIndex];
  const evaluationAmount = currentPrice * quantity;
  const initialValue = scenario.prices[0] * INITIAL_QUANTITY;
  const profit = calculateProfit(initialValue, evaluationAmount, trades);

  const openCompanyInfo = () => {
    setHasCheckedCompanyInfo(true);
    setPendingTrade(null);
    setView("company");
  };

  const handleSkip = () => {
    setDayIndex(Math.min(dayIndex + skipDays, lastIndex));
  };

  const executeTrade = (type) => {
    if (type === "sell" && quantity === 0) return;

    if (type === "buy") {
      const newAveragePrice = Math.round(
        (averagePrice * quantity + currentPrice) / (quantity + 1)
      );
      setAveragePrice(newAveragePrice);
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }

    setTrades([
      ...trades,
      {
        dayIndex,
        type,
        price: currentPrice,
        quantity: 1,
        checkedCompanyInfo: hasCheckedCompanyInfo,
      },
    ]);
  };

  const requestTrade = (type) => {
    if (hasCheckedCompanyInfo) {
      executeTrade(type);
    } else {
      setPendingTrade(type);
    }
  };

  const handleProceed = () => {
    executeTrade(pendingTrade);
    setPendingTrade(null);
  };

  const handleFinish = () => {
    onFinish({
      profit,
      rate: (profit / initialValue) * 100,
      finalDay: dayIndex + 1,
      trades,
      hasCheckedFinancials,
    });
  };

  if (view === "company") {
    return (
      <CompanyInfo
        scenario={scenario}
        onBack={() => setView("main")}
        onViewFinancials={() => setHasCheckedFinancials(true)}
      />
    );
  }

  return (
    <>
      <button className="mock-link" onClick={onBack}>
        ← 시나리오 다시 고르기
      </button>
      <h1 className="mock-title">{scenario.stockName}</h1>
      <p className="mock-subtitle">
        {dayIndex + 1}일차 · 시가 {currentPrice.toLocaleString()}원
      </p>

      <div className="mock-skip-row">
        <div className="mock-toggle">
          <button
            className={skipDays === 1 ? "active" : ""}
            onClick={() => setSkipDays(1)}
          >
            1일
          </button>
          <button
            className={skipDays === 7 ? "active" : ""}
            onClick={() => setSkipDays(7)}
          >
            1주
          </button>
        </div>
        <button
          className="mock-btn"
          onClick={handleSkip}
          disabled={dayIndex === lastIndex}
        >
          {skipDays === 1 ? "1일" : "1주"} 넘기기
        </button>
      </div>

      <div className="mock-card">
        <p className="mock-label">평가금액</p>
        <p className="mock-eval">{evaluationAmount.toLocaleString()}원</p>
        <p className={"mock-profit " + (profit >= 0 ? "up" : "down")}>
          총 손익 {profit >= 0 ? "+" : ""}
          {profit.toLocaleString()}원
        </p>
        <PriceChart prices={scenario.prices} dayIndex={dayIndex} />
      </div>

      <div className="mock-actions">
        <button className="mock-btn sell" onClick={() => requestTrade("sell")}>
          매도
        </button>
        <button className="mock-btn buy" onClick={() => requestTrade("buy")}>
          매수
        </button>
        <button className="mock-btn" onClick={openCompanyInfo}>
          기업정보
        </button>
      </div>

      {pendingTrade && (
        <SafetyGuardBanner
          onOpenCompanyInfo={openCompanyInfo}
          onProceed={handleProceed}
        />
      )}

      <div className="mock-card">
        <div className="mock-info-row">
          <span>보유 수량</span>
          <span>{quantity}주</span>
        </div>
        <div className="mock-info-row">
          <span>매입 평균가</span>
          <span>{averagePrice.toLocaleString()}원</span>
        </div>
      </div>

      <button className="mock-btn primary" onClick={handleFinish}>
        거래 마무리하고 결과 보기
      </button>
    </>
  );
}