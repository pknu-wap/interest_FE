import { useEffect, useState } from "react";

import {
  fetchScenarios,
  fetchScenarioDetail,
  saveSimulationResult,
} from "../api/mockInvestApi";
import BottomTab from "../components/common/BottomTab";
import ScenarioCard from "../components/mock_invest/ScenarioCard";
import TradeMain from "../components/mock_invest/TradeMain";
import TradeResult from "../components/mock_invest/TradeResult";
import "./MockInvestPage.css";

export default function MockInvestPage() {
  const [step, setStep] = useState("select");
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    fetchScenarios()
      .then(setScenarios)
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectScenario = async (scenario) => {
    if (loading) return;
    setLoading(true);
    setErrorMessage("");
    try {
      const detail = await fetchScenarioDetail(scenario.id);
      setSelectedScenario({ ...scenario, ...detail });
      setStep("trade");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async (tradeResult) => {
    setResult(tradeResult);
    setStep("result");
    setSaveStatus("saving");
    try {
      await saveSimulationResult({
        scenarioId: selectedScenario.id,
        ...tradeResult,
      });
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  };

  const handleRetry = () => {
    setSaveStatus("");
    setStep("select");
  };

  let content;

  if (step === "trade") {
    content = (
      <TradeMain
        scenario={selectedScenario}
        onBack={() => setStep("select")}
        onFinish={handleFinish}
      />
    );
  } else if (step === "result") {
    content = (
      <>
        <TradeResult
          scenario={selectedScenario}
          result={result}
          onRetry={handleRetry}
        />
        {saveStatus === "error" && (
          <p className="mock-subtitle">결과 저장에 실패했어요</p>
        )}
      </>
    );
  } else {
    content = (
      <>
        <p className="mock-part">B Part · 모의투자</p>
        <h1 className="mock-title">어떤 종목으로 시작할까요?</h1>
        {loading && <p className="mock-subtitle">불러오는 중이에요...</p>}
        {errorMessage && <p className="mock-subtitle">{errorMessage}</p>}
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            onSelect={handleSelectScenario}
          />
        ))}
      </>
    );
  }

  return (
    <div className="mock-page">
      {content}
      <BottomTab />
    </div>
  );
}