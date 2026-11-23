import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const loginEndpoint = env.VITE_KAKAO_LOGIN_ENDPOINT
  const apiTarget = loginEndpoint ? new URL(loginEndpoint).origin : undefined

  return {
    plugins: [react()],
    server: {
      host: '127.0.0.1',
      port: 3000,
      strictPort: true,
      proxy: apiTarget
        ? {
            '/api': {
              target: apiTarget,
              changeOrigin: true,
            },
          }
        : undefined,
    },
  }
})
