const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, options) {
  if (!BASE_URL) {
    throw new Error("서버 주소(VITE_API_BASE_URL)가 설정되지 않았어요.");
  }

  const response = await fetch(`${BASE_URL}${path}`, options);
  if (!response.ok) {
    throw new Error(`요청에 실패했어요 (${response.status})`);
  }
  return response.json();
}

export function fetchScenarios() {
  return request("/scenarios");
}

export function fetchScenarioDetail(id) {
  return request(`/scenarios/${id}`);
}

export function saveSimulationResult(payload) {
  return request("/simulation-results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}