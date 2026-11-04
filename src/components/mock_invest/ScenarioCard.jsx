export default function ScenarioCard({ scenario, onSelect }) {
  return (
    <button className="mock-scenario" onClick={() => onSelect(scenario)}>
      <strong>
        {scenario.stockName} · {scenario.startDate}
      </strong>
      <span>{scenario.description}</span>
    </button>
  );
}