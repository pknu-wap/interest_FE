import { useState } from "react";
import { Link, useParams } from "react-router";

import learnPageMetadata from "../assets/learn_page/learn_page_metadata.js";
import BottomTab from "../components/common/BottomTab.jsx";
import InterestSimulation from "../components/learn_page/InterestSimulation";
import "./LearnPage.css";

export default function LearnPage() {
  const { chapterName } = useParams();
  const chapter = learnPageMetadata[chapterName];

  const [stepIndex, setStepIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!chapter) {
    return <h1>'{chapterName}'라는 이름의 챕터는 존재하지 않습니다.</h1>;
  }

  const step = chapter.steps[stepIndex];
  const totalSteps = chapter.steps.length;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === totalSteps - 1;

  const question = step.type === "quiz" ? step.questions[questionIndex] : null;
  const isLastQuestion =
    step.type === "quiz" && questionIndex === step.questions.length - 1;
  const isAnswered = selectedIndex !== null;

  const goToStep = (index) => {
    setStepIndex(index);
    setQuestionIndex(0);
    setSelectedIndex(null);
  };

  const handleNext = () => {
    if (step.type === "quiz" && !isLastQuestion) {
      setQuestionIndex(questionIndex + 1);
      setSelectedIndex(null);
      return;
    }
    goToStep(stepIndex + 1);
  };

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedIndex(index);
  };

  const getOptionClass = (index) => {
    let className = "learn-option";
    if (!isAnswered) return className;
    if (index === question.answerIndex) className += " correct";
    else if (index === selectedIndex) className += " wrong";
    return className;
  };

  const renderNextButton = () => {
    const isFinal = isLastStep && (step.type !== "quiz" || isLastQuestion);
    if (isFinal) {
      return <Link to={`/units/${chapter.unit}`}>학습 완료</Link>;
    }
    return <button onClick={handleNext}>다음</button>;
  };

  return (
    <div className="learn-page">
      <div className="learn-progress">
        <div
          className="learn-progress-bar"
          style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
        />
      </div>
      <p className="learn-count">
        학습 {stepIndex + 1}/{totalSteps}
      </p>
      <h1 className="learn-title">{chapter.title}</h1>
      <p className="learn-guide">
        {step.type === "quiz" ? "답을 골라주세요" : step.label}
      </p>

      {step.type === "quiz" ? (
        <>
          <div className={"learn-card" + (isAnswered ? " dimmed" : "")}>
            Q{questionIndex + 1}. {question.question}
          </div>

          {question.options.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(index)}
              onClick={() => handleSelect(index)}
            >
              {option}
            </button>
          ))}

          <div className="learn-action">{isAnswered && renderNextButton()}</div>

          <BottomTab />
        </>
      ) : (
        <>
          {step.type === "explain" ? (
            <div className="learn-card large">
              {step.lines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          ) : (
            <InterestSimulation />
          )}

          <div className="learn-action">{renderNextButton()}</div>

          {!isFirstStep && (
            <button
              className="learn-back"
              onClick={() => goToStep(stepIndex - 1)}
            >
              ‹
            </button>
          )}
        </>
      )}
    </div>
  );
}