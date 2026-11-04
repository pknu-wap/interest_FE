export default function SafetyGuardBanner({ onOpenCompanyInfo, onProceed }) {
  return (
    <div className="mock-banner">
      <p>💡 거래 전에 잠깐! PBR을 확인하셨나요?</p>
      <div className="mock-banner-actions">
        <button className="mock-btn" onClick={onOpenCompanyInfo}>
          기업정보 보기
        </button>
        <button className="mock-btn primary" onClick={onProceed}>
          확인 및 진행
        </button>
      </div>
    </div>
  );
}