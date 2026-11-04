export default function FinancialModal({ stockName, companyInfo, onClose }) {
  const { financials, per } = companyInfo;

  return (
    <div className="mock-overlay">
      <div className="mock-sheet">
        <h3>{stockName} · 재무제표 요약</h3>
        <div className="mock-info-row">
          <span>매출액</span>
          <span>{financials.revenue}</span>
        </div>
        <div className="mock-info-row">
          <span>영업이익</span>
          <span>{financials.operatingProfit}</span>
        </div>
        <div className="mock-info-row">
          <span>부채비율</span>
          <span>{financials.debtRatio}</span>
        </div>
        <div className="mock-info-row">
          <span>PER</span>
          <span>{per}</span>
        </div>
        <button className="mock-btn primary" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}