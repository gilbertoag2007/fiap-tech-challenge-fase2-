import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/rotas':   'http://localhost:8000',
      '/cidades': 'http://localhost:8000',
      '/produtos': 'http://localhost:8000',
      '/health':  'http://localhost:8000',
    },
  },
})
