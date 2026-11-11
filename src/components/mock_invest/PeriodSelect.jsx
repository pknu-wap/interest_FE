const periods = [
  { label: "약 1개월 전부터", days: 20 },
  { label: "약 3개월 전부터", days: 60 },
  { label: "약 6개월 전부터", days: 120 },
];

export default function PeriodSelect({ stock, onSelect, onBack }) {
  return (
    <>
      <button className="mock-link" onClick={onBack}>
        ← 종목 다시 고르기
      </button>
      <h1 className="mock-title">{stock.stockName}</h1>
      <p className="mock-subtitle">언제부터 시작해 볼까요?</p>

      {periods.map((period) => (
        <button
          key={period.days}
          className="mock-scenario"
          onClick={() => onSelect(period)}
        >
          <strong>{period.label}</strong>
          <span>
            {stock.dates[stock.dates.length - period.days]} 부터 어제까지
          </span>
        </button>
      ))}

      <p className="mock-notice">
        실시간이 아니라 전 영업일까지의 종가 기준이에요.
      </p>
    </>
  );
}