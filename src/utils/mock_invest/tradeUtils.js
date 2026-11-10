export const INITIAL_QUANTITY = 20;

// 총 손익 = 현재 평가금액 + (매도 이익 - 매수할때 쓴 돈) - 처음 평가금액 <이거 맞나...>
export function calculateProfit(initialValue, currentValue, trades) {
  const cashFlow = trades.reduce((sum, trade) => {
    const amount = trade.price * trade.quantity;
    return trade.type === "buy" ? sum - amount : sum + amount;
  }, 0);

  return currentValue + cashFlow - initialValue;
}

// 거래 기록으로 피드백 문구 창 <확인창느낌으로할지 수정필요>
export function buildFeedback(trades, hasCheckedFinancials, hasFinancials = true) {
  const goods = [];
  const misses = [];

  const uncheckedTrades = trades.filter((trade) => !trade.checkedCompanyInfo);

  if (uncheckedTrades.length === 0) {
    goods.push("모든 거래 전에 기업정보를 확인했어요.");
  } else {
    misses.push(
      `기업정보를 확인하지 않고 거래한 적이 ${uncheckedTrades.length}번 있어요.`
    );
  }

  if (hasFinancials) {
    if (hasCheckedFinancials) {
      goods.push("재무제표를 확인했어요.");
    } else {
      misses.push("부채비율 같은 재무제표 지표를 보지 않았어요.");
    }
  }

  return { goods, misses };
}