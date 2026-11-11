const scenarioMetadata = [
  {
    id: "scenario1",
    stockName: "WAP전자",
    startDate: "2021.03",
    description: "호외요! 한국은행이 기준금리 0.25%p 인상했다고 하네요.",
    prices: [68700, 69100, 68400, 69500, 70200, 70800, 68900, 67200, 66100, 66800, 65400, 64900, 65700, 64200, 63800],
    news: [
      {
        dayIndex: 5,
        headline: "한국은행, 기준금리 0.25%p 인상",
        body: "금융통화위원회가 기준금리를 올렸어요. 대출 이자 부담이 커져서 기업들이 투자를 줄일 수 있어요.",
      },
    ],
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
    stockName: "B바이오",
    startDate: "2020.06",
    description: "이 기업, 생각보다 고평가받고 있는거 같은데요?",
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
    stockName: "C건설",
    startDate: "2019.01",
    description: "부채비율 높은 기업 시나리오",
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
  {
    id: "scenario4",
    stockName: "🗽 Jonson&Ponson Logistics",
    startDate: "2019.01",
    description: "미국에 도날드덕 대통령이 계엄령을 선포했어요!",
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