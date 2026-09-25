import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages(/portfolio/) 하위 경로에서도 동작하도록 상대 경로로 빌드
  base: './',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      // 기존 SCSS 가 @import 방식이라 deprecation 경고만 숨김
      scss: { silenceDeprecations: ['import'] },
    },
  },
});
