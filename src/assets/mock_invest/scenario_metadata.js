const scenarioMetadata = [
  {
    id: "scenario1",
    stockName: "WAP전자",
    startDate: "2021.03",
    description: "금리인상가 곧 인상될 거에요!",
    prices: [68700, 69100, 68400, 67900, 68800, 70200, 71000, 72300, 71500, 73100, 74000, 73200, 72800, 74500, 74100],
    companyInfo: {
      stockCode: "123456",
      marketCap: "420조원",
      roe: "9.8%",
      per: "14.3배",
      pbr: "1.2배",
      financials: {
        revenue: "2,847억원",
        operatingProfit: "312억원",
        debtRatio: "41.2%",
      },
    },
  },
  {
    id: "scenario2",
    stockName: "WAB바이오",
    startDate: "2020.06",
    description: "기업이 가치보다 비싸게 평가받고 있는거 같은데...",
    prices: [52000, 53500, 55200, 58000, 57000, 61000, 63500, 62000, 66000, 69000, 67500, 64000, 60500, 58000, 55000],
    companyInfo: {
      stockCode: "234567",
      marketCap: "8조원",
      roe: "2.1%",
      per: "85.4배",
      pbr: "9.8배",
      financials: {
        revenue: "412억원",
        operatingProfit: "-38억원",
        debtRatio: "63.5%",
      },
    },
  },
  {
    id: "scenario3",
    stockName: "WAC건설",
    startDate: "2019.01",
    description: "빚이 조금 많아 보이군요",
    prices: [38000, 37500, 37800, 36900, 36000, 36500, 35200, 34800, 35500, 34000, 33200, 33800, 32500, 32000, 31500],
    companyInfo: {
      stockCode: "345678",
      marketCap: "1.2조원",
      roe: "3.4%",
      per: "6.2배",
      pbr: "0.4배",
      financials: {
        revenue: "9,860억원",
        operatingProfit: "215억원",
        debtRatio: "312.8%",
      },
    },
  },
];

export default scenarioMetadata;