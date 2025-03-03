import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://angaven.github.io/platzi-prueba-tecnica-react-e-shop/',
  plugins: [react()],
})
