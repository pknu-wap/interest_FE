import "./info.css";
import GradientBackground from "./gradient-background.jsx";

export default function Info({ name, onContinue }) {
  const greeting = (
    <>
      안녕하세요,
      <br />
      {name}님
    </>
  )

  return (
    <main className="info-screen">
      <GradientBackground />

      {onContinue ? (
        <button
          className="info-continue"
          type="button"
          onClick={onContinue}
          aria-label="다음 화면으로 이동"
        >
          <span className="info-greeting">{greeting}</span>
        </button>
      ) : (
        <div className="info-greeting">{greeting}</div>
      )}

    </main>
  );
}
