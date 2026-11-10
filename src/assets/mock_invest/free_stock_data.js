// 일단 임시용이에욤 더미 데이터로~

const DAYS = 120;

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 어제부터 거꾸로 올라가며 주말을 뺀 영업일 날짜 만듬ㅇ
function makeBusinessDates(count) {
  const dates = [];
  const date = new Date();
  date.setDate(date.getDate() - 1);

  while (dates.length < count) {
    const weekday = date.getDay();
    if (weekday !== 0 && weekday !== 6) {
      dates.unshift(formatDate(date));
    }
    date.setDate(date.getDate() - 1);
  }
  return dates;
}

// 같은 seed면 항상 같은 가격이 나오는 간단한 랜덤 워크
function makePrices(basePrice, count, seed) {
  const prices = [];
  let price = basePrice;
  let state = seed;

  for (let i = 0; i < count; i++) {
    state = (state * 9301 + 49297) % 233280;
    const change = (state / 233280 - 0.5) * 0.04;
    price = Math.max(100, Math.round((price * (1 + change)) / 10) * 10);
    prices.push(price);
  }
  return prices;
}

const dates = makeBusinessDates(DAYS);

function makeStock(stockCode, stockName, basePrice, seed, marketCap) {
  return {
    stockCode,
    stockName,
    dates,
    prices: makePrices(basePrice, DAYS, seed),
    companyInfo: {
      stockCode,
      marketCap,
      roe: null,
      per: null,
      pbr: null,
      financials: null,
    },
  };
}

const freeStockData = [
  makeStock("005930", "삼성전자", 71000, 11, "429조원"),
  makeStock("000020", "동화약품", 10000, 23, "2,790억원"),
  makeStock("035420", "NAVER", 182000, 37, "29조 8,000억원"),
  makeStock("035720", "카카오", 45000, 41, null),
  makeStock("005380", "현대차", 210000, 53, null),
];

export default freeStockData;