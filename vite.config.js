import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/sp/',
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['.localhost', 'localhost'],
  },
  test: {
    environment: 'node',
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
  },
})
