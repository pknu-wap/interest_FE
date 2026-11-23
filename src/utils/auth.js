const SESSION_TOKEN_KEY = "session_token";

export function saveSessionToken(token) {
  window.sessionStorage.setItem(SESSION_TOKEN_KEY, token);
}

export function getSessionToken() {
  return window.sessionStorage.getItem(SESSION_TOKEN_KEY);
}

export function authenticatedFetch(input, options = {}) {
  const token = getSessionToken();
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);

  return fetch(input, {
    ...options,
    headers,
    credentials: "omit",
  });
}
