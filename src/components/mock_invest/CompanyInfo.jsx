import { useState } from "react";

import FinancialModal from "./FinancialModal";

export default function CompanyInfo({ scenario, onBack, onViewFinancials }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { stockCode, marketCap, roe, per, pbr } = scenario.companyInfo;

  const handleOpenModal = () => {
    onViewFinancials();
    setIsModalOpen(true);
  };

  return (
    <>
      <button className="mock-link" onClick={onBack}>
        ← 거래 화면으로
      </button>
      <h1 className="mock-title">{scenario.stockName}</h1>
      <p className="mock-subtitle">종목코드 {stockCode}</p>

      <div className="mock-card">
        <p className="mock-section">투자 지표</p>
        <div className="mock-info-row">
          <span>시가총액</span>
          <span>{marketCap}</span>
        </div>
        <div className="mock-info-row">
          <span>ROE</span>
          <span>{roe}</span>
        </div>
      </div>

      <div className="mock-card">
        <p className="mock-section">가치평가 지표</p>
        <div className="mock-info-row">
          <span>PER</span>
          <span>{per}</span>
        </div>
        <div className="mock-info-row">
          <span>PBR</span>
          <span>{pbr}</span>
        </div>
      </div>

      <button className="mock-btn primary" onClick={handleOpenModal}>
        재무제표 보기
      </button>

      {isModalOpen && (
        <FinancialModal
          stockName={scenario.stockName}
          companyInfo={scenario.companyInfo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}