import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [react(), UnoCSS()],
  server: {
    host: true,
    port: 3100,
  },
  optimizeDeps: {
    include: ['three']
  }
})