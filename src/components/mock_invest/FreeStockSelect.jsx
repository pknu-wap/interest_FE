import { useState } from "react";

import freeStockData from "../../assets/mock_invest/free_stock_data.js";

export default function FreeStockSelect({ onSelect, onBack }) {
  const [query, setQuery] = useState("");

  const keyword = query.trim().toLowerCase();
  const results = freeStockData.filter(
    (stock) =>
      stock.stockName.toLowerCase().includes(keyword) ||
      stock.stockCode.includes(keyword)
  );

  return (
    <>
      <button className="mock-link" onClick={onBack}>
        ← 모드 다시 고르기
      </button>
      <h1 className="mock-title">종목을 검색해 보세요</h1>

      <input
        className="mock-search"
        type="text"
        placeholder="종목명 또는 종목코드"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {results.length === 0 && (
        <p className="mock-subtitle">검색 결과가 없어요</p>
      )}

      {results.map((stock) => (
        <button
          key={stock.stockCode}
          className="mock-scenario"
          onClick={() => onSelect(stock)}
        >
          <strong>{stock.stockName}</strong>
          <span>{stock.stockCode}</span>
        </button>
      ))}

      <p className="mock-notice">
        지금은 임시 시세예요. 가상 투자이며 투자 권유가 아니에요.
      </p>
    </>
  );
}