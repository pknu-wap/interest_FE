import { Link } from "react-router";

import { buildFeedback } from "../../utils/mock_invest/tradeUtils";

export default function TradeResult({ scenario, result, onRetry }) {
  const { profit, rate, finalDay, trades, hasCheckedFinancials } = result;
  const { goods, misses } = buildFeedback(trades, hasCheckedFinancials);

  const sign = profit >= 0 ? "+" : "";

  return (
    <>
      <p className="mock-subtitle">
        {scenario.stockName} · {finalDay}일차 / 거래 결과
      </p>

      <div className="mock-card">
        <h1 className={"mock-result " + (profit >= 0 ? "up" : "down")}>
          {sign}
          {profit.toLocaleString()}원 ({sign}
          {rate.toFixed(1)}%)
        </h1>
      </div>

      <div className="mock-card mock-feedback">
        <p className="mock-section">거래 리포트 피드백</p>
        {trades.length === 0 ? (
          <p>거래 기록이 없어요.</p>
        ) : (
          <>
            {goods.map((text, index) => (
              <p key={"good" + index}>👍 잘한 점: {text}</p>
            ))}
            {misses.map((text, index) => (
              <p key={"miss" + index}>👀 놓친 지표: {text}</p>
            ))}
          </>
        )}
      </div>

      <button className="mock-btn" onClick={onRetry}>
        다시 해보기
      </button>
      <Link className="mock-btn primary" to="/units/unit1">
        A Part 리마인드
      </Link>
    </>
  );
}