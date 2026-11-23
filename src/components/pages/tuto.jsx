import { useState } from "react";
import "./tuto.css";
import GradientBackground from "./gradient-background.jsx";

const introParts = [
  {
    part: "A Part",
    title: "배우고",
    description: "금융 용어 배우기",
  },
  {
    part: "B Part",
    title: "써먹고",
    description: "배운 내용으로 모의투자 해보기",
  },
];

function IntroCard({ part, title, description }) {
  return (
    <section className="tuto-card" aria-label={`${part}: ${title}`}>
      <p className="tuto-card-part">{part}</p>
      <h2 className="tuto-card-title">{title}</h2>
      <p className="tuto-card-description">{description}</p>
    </section>
  );
}

export default function Tuto({ onContinue }) {
  const [isContinuing, setIsContinuing] = useState(false);

  function continueToMain() {
    if (isContinuing) return;

    setIsContinuing(true);
    window.setTimeout(() => {
      if (onContinue) onContinue();
    }, 200);
  }

  return (
    <main className="tuto-screen">
      <GradientBackground />

      <header className="tuto-heading">
        <p>배우고, 써먹고</p>
        <h1>이렇게 진행돼요</h1>
      </header>

      <div className="tuto-cards">
        {introParts.map((item) => (
          <IntroCard key={item.part} {...item} />
        ))}
      </div>

      <button
        className={`tuto-continue${isContinuing ? " tuto-continue--selected" : ""}`}
        type="button"
        disabled={isContinuing}
        onClick={continueToMain}
      >
        시작해볼게요
      </button>

    </main>
  );
}
