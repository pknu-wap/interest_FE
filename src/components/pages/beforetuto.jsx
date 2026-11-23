import { useState } from "react";
import "./beforetuto.css";

const knowledgeLevels = [
  {
    title: "잘몰라요",
    description: "처음부터 차근차근 배울래요",
  },
  {
    title: "거시경제 용어 정도는 알아요",
    description: "예) 금리, 채권",
  },
  {
    title: "저 정도면 전문가죠",
    description: "투자자산운용사 보유",
  },
];

export default function Tuto({ onSelect }) {
  const [selectedLevel, setSelectedLevel] = useState(null);

  function selectLevel(index) {
    if (selectedLevel !== null) return;

    setSelectedLevel(index);
    window.setTimeout(() => {
      if (onSelect) onSelect(knowledgeLevels[index]);
    }, 200);
  }

  return (
    <main className="beforetuto-screen">
      <div className="beforetuto-background" aria-hidden="true">
        <span className="beforetuto-glow beforetuto-glow--one" />
        <span className="beforetuto-glow beforetuto-glow--two" />
        <span className="beforetuto-glow beforetuto-glow--three" />
        <span className="beforetuto-glow beforetuto-glow--four" />
      </div>

      <header className="beforetuto-heading">
        <p className="tuto-eyebrow">시작하기 전에</p>
        <h1>본인의 금융 지식은</h1>
      </header>

      <section className="beforetuto-options" aria-label="금융 지식 수준 선택">
        {knowledgeLevels.map((level, index) => (
          <button
            className={`beforetuto-option${selectedLevel === index ? " beforetuto-option--selected" : ""}`}
            type="button"
            key={level.title}
            aria-pressed={selectedLevel === index}
            disabled={selectedLevel !== null}
            onClick={() => selectLevel(index)}
          >
            <span className="beforetuto-option-title">{level.title}</span>
            <span className="beforetuto-option-description">{level.description}</span>
          </button>
        ))}
      </section>
    </main>
  );
}
