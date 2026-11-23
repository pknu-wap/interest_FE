import { useEffect, useState } from 'react'
import Login from './components/pages/login.jsx'
import Info from './components/pages/info.jsx'
import BeforeTuto from './components/pages/beforetuto.jsx'
import Tuto from './components/pages/tuto.jsx'
import MainPage from './components/pages/main.jsx'

function App() {
  const [screen, setScreen] = useState('splash')
  const [userName, setUserName] = useState('회원')

  useEffect(() => {
    if (screen !== 'splash') return undefined

    const timeoutId = window.setTimeout(() => setScreen('login'), 3000)
    return () => window.clearTimeout(timeoutId)
  }, [screen])

  useEffect(() => {
    if (screen !== 'info') return undefined

    const timeoutId = window.setTimeout(() => setScreen('beforetuto'), 5000)
    return () => window.clearTimeout(timeoutId)
  }, [screen])

  function handleLoginSuccess(user) {
    const name =
      user?.kakao_account?.profile?.nickname ??
      user?.profile?.nickname ??
      user?.properties?.nickname ??
      user?.nickname ??
      user?.name ??
      user?.displayName

    setUserName(typeof name === 'string' && name.trim() ? name.trim() : '회원')
    setScreen('info')
  }

  if (screen === 'splash') {
    return <MainPage />
  }

  if (screen === 'info') {
    return (
      <Info
        name={userName}
        onContinue={() => setScreen('beforetuto')}
      />
    )
  }

  if (screen === 'beforetuto') {
    return <BeforeTuto onSelect={() => setScreen('tuto')} />
  }

  if (screen === 'tuto') {
    return <Tuto onContinue={() => setScreen('amain')} />
  }

  if (screen === 'amain') {
    return (
      <main aria-label="AMain 화면">
        <h1>AMain</h1>
        <p>실제 AMain 화면이 추가되면 이 위치에 연결됩니다.</p>
      </main>
    )
  }

  return (
    <Login
      onLoginSuccess={handleLoginSuccess}
      onSkipTutorial={() => setScreen('amain')}
    />
  )
}

export default App
