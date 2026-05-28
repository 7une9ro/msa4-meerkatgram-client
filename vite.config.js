import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],

  // 아래 css 및 build 설정을 추가하여 소스맵을 활성화합니다.
  css: {
    devSourcemap: true // 개발 단계에서 스타일 소스맵 활성화
  },
  build: {
    sourcemap: true // 빌드 및 디버깅용 소스맵 활성화
  },
  
  // 개발 서버 Proxy 정의
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Request 대상 서버 도메인
        changeOrigin: true, // Request Header [Host] 필드 값을 대상 서버 호스트로 번경
        secure: false // SSL 인증서 검증 무시
      }
    }
  }
})
