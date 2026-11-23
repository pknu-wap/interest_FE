import GradientBackground from "./gradient-background.jsx";
import "./main.css";

export default function MainPage() {
  return (
    <main className="main-screen" aria-label="메인 페이지">
      <GradientBackground />
      <div className="main-logo" aria-hidden="true" />
    </main>
  );
}
