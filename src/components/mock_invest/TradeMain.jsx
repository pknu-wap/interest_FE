import { useEffect, useState } from "react";

import CompanyInfo from "./CompanyInfo";
import PriceChart from "./PriceChart";
import {
  INITIAL_QUANTITY,
  calculateProfit,
} from "../../utils/mock_invest/tradeUtils";

const DAY_MS = 1500; // 1x 속도에서 하루가 넘어가는 시간(ms)
const SPEEDS = [1, 2, 3];
const QUANTITY_CHIPS = [1, 5];

export default function TradeMain({ scenario, onBack, onFinish }) {
  const initialValue = scenario.prices[0] * INITIAL_QUANTITY;

  const [view, setView] = useState("main");
  const [hasCheckedCompanyInfo, setHasCheckedCompanyInfo] = useState(false);
  const [hasCheckedFinancials, setHasCheckedFinancials] = useState(false);
  const [trades, setTrades] = useState([]);
  const [popupNews, setPopupNews] = useState(null);
  const [seenNews, setSeenNews] = useState([]);

  const [dayIndex, setDayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const [quantity, setQuantity] = useState(INITIAL_QUANTITY);
  const [averagePrice, setAveragePrice] = useState(scenario.prices[0]);
  const [cash, setCash] = useState(initialValue);
  const [tradeQuantity, setTradeQuantity] = useState(1);

  const lastIndex = scenario.prices.length - 1;
  const isLastDay = dayIndex === lastIndex;
  const currentPrice = scenario.prices[dayIndex];
  const evaluationAmount = currentPrice * quantity;
  const profit = calculateProfit(initialValue, evaluationAmount, trades);

  const maxBuy = Math.floor(cash / currentPrice);
  const canBuy = tradeQuantity >= 1 && tradeQuantity <= maxBuy;
  const canSell = tradeQuantity >= 1 && tradeQuantity <= quantity;

  // 재생 중이면 (1000 / 속도)ms마다 하루씩 넘겨요
  useEffect(() => {
    if (!isPlaying || popupNews || view !== "main" || dayIndex >= lastIndex) {
      return;
    }

    const timer = setTimeout(() => {
      const nextIndex = dayIndex + 1;
      setDayIndex(nextIndex);

      const news = (scenario.news ?? []).find(
        (item) => item.dayIndex === nextIndex
      );

      if (news) {
        setIsPlaying(false);
        setPopupNews(news);
        setSeenNews((previous) => [...previous, news]);
      } else if (nextIndex >= lastIndex) {
        setIsPlaying(false);
      }
    }, DAY_MS / speed);

    return () => clearTimeout(timer);
  }, [isPlaying, speed, dayIndex, popupNews, view, scenario.news, lastIndex]);

  const openCompanyInfo = () => {
    setIsPlaying(false);
    setHasCheckedCompanyInfo(true);
    setView("company");
  };

  const handleQuantityChange = (event) => {
    const value = Math.floor(Number(event.target.value));
    setTradeQuantity(Number.isNaN(value) ? 0 : Math.max(0, value));
  };

  const executeTrade = (type) => {
    const amount = currentPrice * tradeQuantity;

    if (type === "buy") {
      if (!canBuy) return;
      const newAveragePrice = Math.round(
        (averagePrice * quantity + amount) / (quantity + tradeQuantity)
      );
      setAveragePrice(newAveragePrice);
      setQuantity(quantity + tradeQuantity);
      setCash(cash - amount);
    } else {
      if (!canSell) return;
      setQuantity(quantity - tradeQuantity);
      setCash(cash + amount);
    }

    setTrades([
      ...trades,
      {
        dayIndex,
        type,
        price: currentPrice,
        quantity: tradeQuantity,
        checkedCompanyInfo: hasCheckedCompanyInfo,
      },
    ]);
  };

  const handleFinish = () => {
    onFinish({
      profit,
      rate: (profit / initialValue) * 100,
      finalDay: dayIndex + 1,
      trades,
      hasCheckedFinancials,
    });
  };

  if (view === "company") {
    return (
      <CompanyInfo
        scenario={scenario}
        onBack={() => setView("main")}
        onViewFinancials={() => setHasCheckedFinancials(true)}
      />
    );
  }

  return (
    <>
      <button className="mock-link" onClick={onBack}>
        ← 시나리오 다시 고르기
      </button>
      <h1 className="mock-title">{scenario.stockName}</h1>
      <p className="mock-subtitle">
        {scenario.dates
          ? `${scenario.dates[dayIndex]} (${dayIndex + 1}일차)`
          : `${dayIndex + 1}일차`}{" "}
        / 종가 {currentPrice.toLocaleString()}원
      </p>

      <div className="mock-skip-row">
        <button
          className="mock-btn mock-play"
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={isLastDay}
        >
          <span
            key={`${dayIndex}-${speed}-${isPlaying}`}
            className={"mock-play-fill" + (isPlaying ? " running" : "")}
            style={{ animationDuration: `${DAY_MS / speed}ms` }}
          />
          <span className="mock-play-label">
            {isLastDay
              ? "마지막 날이에요"
              : isPlaying
              ? "⏸ 일시정지"
              : "▶ 재생"}
          </span>
        </button>
        <div className="mock-toggle">
          {SPEEDS.map((value) => (
            <button
              key={value}
              className={speed === value ? "active" : ""}
              onClick={() => setSpeed(value)}
            >
              {value}x
            </button>
          ))}
        </div>
      </div>

      <div className="mock-card">
        <p className="mock-label">평가금액</p>
        <p className="mock-eval">{evaluationAmount.toLocaleString()}원</p>
        <p className={"mock-profit " + (profit >= 0 ? "up" : "down")}>
          총 손익 {profit >= 0 ? "+" : ""}
          {profit.toLocaleString()}원
        </p>
        <PriceChart prices={scenario.prices} dayIndex={dayIndex} />
      </div>

      <div className="mock-card">
        <div className="mock-qty">
          <span>수량</span>
          <div className="mock-qty-stepper">
            <button
              onClick={() => setTradeQuantity(Math.max(1, tradeQuantity - 1))}
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={tradeQuantity}
              onChange={handleQuantityChange}
            />
            <button onClick={() => setTradeQuantity(tradeQuantity + 1)}>
              +
            </button>
          </div>
        </div>
          <div className="mock-chips">
          {QUANTITY_CHIPS.map((value) => (
            <button key={value} onClick={() => setTradeQuantity(value)}>
              {value}주
            </button>
          ))}
          <button onClick={() => setTradeQuantity(Math.max(1, maxBuy))}>
            최대
          </button>
          <button onClick={() => setTradeQuantity(Math.max(1, quantity))}>
            보유전량
          </button>
        </div>
        <div className="mock-info-row">
          <span>매수 가능 수량</span>
          <span>{maxBuy}주</span>
        </div>
        <div className="mock-info-row">
          <span>예상 거래금액</span>
          <span>{(currentPrice * tradeQuantity).toLocaleString()}원</span>
        </div>
      </div>

      <div className="mock-actions">
        <button
          className="mock-btn sell"
          onClick={() => executeTrade("sell")}
          disabled={!canSell}
        >
          매도 {tradeQuantity}주
        </button>
        <button
          className="mock-btn buy"
          onClick={() => executeTrade("buy")}
          disabled={!canBuy}
        >
          매수 {tradeQuantity}주
        </button>
        <button className="mock-btn" onClick={openCompanyInfo}>
          기업정보
        </button>
      </div>

      {tradeQuantity > quantity && (
        <p className="mock-hint">
          보유 수량({quantity}주)보다 많아서 매도할 수 없어요.
        </p>
      )}
      {tradeQuantity > maxBuy && (
        <p className="mock-hint">
          현금이 부족해서 최대 {maxBuy}주까지 살 수 있어요.
        </p>
      )}

      {seenNews.length > 0 && (
        <div className="mock-card">
          <p className="mock-section">뉴스</p>
          {seenNews.map((item) => (
            <div key={item.dayIndex} className="mock-news-item">
              <strong>{item.headline}</strong>
              <span>{item.dayIndex + 1}일차</span>
            </div>
          ))}
        </div>
      )}

      <div className="mock-card">
        <div className="mock-info-row">
          <span>보유 현금</span>
          <span>{cash.toLocaleString()}원</span>
        </div>
        <div className="mock-info-row">
          <span>보유 수량</span>
          <span>{quantity}주</span>
        </div>
        <div className="mock-info-row">
          <span>매입 평균가</span>
          <span>{averagePrice.toLocaleString()}원</span>
        </div>
      </div>

      {scenario.mode !== "free" && (
        <button className="mock-btn primary" onClick={handleFinish}>
          거래 마무리하고 결과 보기
        </button>
      )}

      {popupNews && (
        <div className="mock-overlay">
          <div className="mock-sheet">
            <p className="mock-news-tag">📰 속보</p>
            <h3>{popupNews.headline}</h3>
            <p className="mock-news-body">{popupNews.body}</p>
            <button
              className="mock-btn primary"
              onClick={() => setPopupNews(null)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}