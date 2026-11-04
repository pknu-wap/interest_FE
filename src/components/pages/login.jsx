import { useEffect, useRef, useState } from "react";
import "./login.css";

const KAKAO_STATE_KEY = "kakao_oauth_state";

function getRedirectUri() {
  return `${window.location.origin}${window.location.pathname}`;
}

function getKakaoLoginEndpoint(apiBaseUrl, kakaoLoginEndpoint) {
  if (kakaoLoginEndpoint) return kakaoLoginEndpoint;
  return `${apiBaseUrl.replace(/\/+$/, "")}/api/auth/kakao`;
}

function KakaoIcon() {
  return (
    <svg
      className="login-kakao-icon"
      viewBox="0 0 20 18"
      aria-hidden="true"
    >
      <path d="M10 1C5.03 1 1 4.12 1 7.97c0 2.46 1.66 4.62 4.15 5.85l-.84 3.1a.4.4 0 0 0 .61.43l3.8-2.52c.42.06.84.1 1.28.1 4.97 0 9-3.12 9-6.96S14.97 1 10 1Z" />
    </svg>
  );
}

export default function Login({
  kakaoRestApiKey = "1304ac232764438b146d93b3f07f9624",
  apiBaseUrl = "",
  kakaoLoginEndpoint = import.meta.env.VITE_KAKAO_LOGIN_ENDPOINT,
  onLoginSuccess,
  onSkipTutorial,
}) {
  const [errorMessage, setErrorMessage] = useState(() => {
    const callbackUrl = new URL(window.location.href);
    if (callbackUrl.searchParams.has("error")) {
      return (
        callbackUrl.searchParams.get("error_description") ||
        "카카오 로그인을 취소했거나 인증에 실패했습니다."
      );
    }
    return "";
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(() => {
    const callbackUrl = new URL(window.location.href);
    return (
      callbackUrl.searchParams.has("code") &&
      !callbackUrl.searchParams.has("error")
    );
  });
  const callbackStarted = useRef(false);

  useEffect(() => {
    const callbackUrl = new URL(window.location.href);
    const kakaoError = callbackUrl.searchParams.get("error");
    const authorizationCode = callbackUrl.searchParams.get("code");
    const receivedState = callbackUrl.searchParams.get("state");

    if (kakaoError) {
      callbackUrl.searchParams.delete("error");
      callbackUrl.searchParams.delete("error_description");
      callbackUrl.searchParams.delete("state");
      window.history.replaceState({}, "", callbackUrl);
      return;
    }

    if (!authorizationCode || callbackStarted.current) return;
    callbackStarted.current = true;
    callbackUrl.searchParams.delete("code");
    callbackUrl.searchParams.delete("state");
    window.history.replaceState({}, "", callbackUrl);

    const redirectUri = getRedirectUri();

    Promise.resolve()
      .then(() => {
        let expectedState;
        try {
          expectedState = window.sessionStorage.getItem(KAKAO_STATE_KEY);
          window.sessionStorage.removeItem(KAKAO_STATE_KEY);
        } catch {
          throw new Error("브라우저에서 로그인 세션을 확인할 수 없습니다.");
        }

        if (!expectedState || receivedState !== expectedState) {
          throw new Error(
            "로그인 요청을 확인할 수 없습니다. 다시 시도해 주세요.",
          );
        }

        return fetch(getKakaoLoginEndpoint(apiBaseUrl, kakaoLoginEndpoint), {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: authorizationCode, redirectUri }),
        });
      })
      .then(async (response) => {
        const responseText = await response.text();
        let responseBody = {};
        if (responseText.trim()) {
          try {
            responseBody = JSON.parse(responseText);
          } catch {
            throw new Error(
              `로그인 서버가 올바른 JSON 응답을 반환하지 않았습니다. (HTTP ${response.status})`,
            );
          }
        }

        if (!response.ok) {
          throw new Error(
            responseBody?.message ||
              `카카오 로그인 처리에 실패했습니다. (HTTP ${response.status})`,
          );
        }
        return responseBody;
      })
      .then((responseBody) => {
        setStatusMessage("로그인되었습니다.");
        if (onLoginSuccess) {
          onLoginSuccess(
            responseBody?.user ?? responseBody?.data?.user ?? responseBody,
          );
        }
      })
      .catch((error) => {
        setErrorMessage(
          error instanceof TypeError
            ? "로그인 서버에 연결할 수 없습니다. 서버 상태와 CORS 설정을 확인해 주세요."
            : error.message ||
                "서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.",
        );
      })
      .finally(() => setIsLoading(false));
  }, [apiBaseUrl, kakaoLoginEndpoint, onLoginSuccess]);

  function startKakaoLogin() {
    setErrorMessage("");
    setStatusMessage("");

    if (!kakaoRestApiKey.trim()) {
      setErrorMessage("카카오 REST API 키를 Login 설정에 입력해 주세요.");
      return;
    }

    const redirectUri = getRedirectUri();
    const randomState = new Uint8Array(32);
    try {
      window.crypto.getRandomValues(randomState);
    } catch {
      setErrorMessage("안전한 로그인 연결을 시작할 수 없습니다.");
      return;
    }
    const state = Array.from(randomState, (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");

    try {
      window.sessionStorage.setItem(KAKAO_STATE_KEY, state);
    } catch {
      setErrorMessage("브라우저에서 로그인 세션을 저장할 수 없습니다.");
      return;
    }

    const authorizeUrl = new URL("https://kauth.kakao.com/oauth/authorize");
    authorizeUrl.search = new URLSearchParams({
      client_id: kakaoRestApiKey.trim(),
      redirect_uri: redirectUri,
      response_type: "code",
      state,
    }).toString();

    window.location.assign(authorizeUrl.toString());
  }

  return (
    <main className="login-screen">
      <div className="login-brand">
        <h1 className="login-title">
          금리도
          <br />
          모르면서
        </h1>
      </div>

      <section className="login-actions" aria-label="계정 로그인">
        <p className="login-signup">SNS 계정으로 간편 가입하기</p>
        <button
          className="login-kakao"
          type="button"
          onClick={startKakaoLogin}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          <KakaoIcon />
          <span>
            {isLoading ? "로그인 처리 중..." : "카카오계정으로 로그인"}
          </span>
        </button>
        <button
          className="login-skip"
          type="button"
          onClick={onSkipTutorial}
        >
          <span>로그인 없이 둘러보기</span>
        </button>
        {errorMessage && (
          <p className="login-feedback login-feedback--error" role="alert">
            {errorMessage}
          </p>
        )}
        {statusMessage && (
          <p className="login-feedback" role="status">
            {statusMessage}
          </p>
        )}
      </section>
    </main>
  );
}
