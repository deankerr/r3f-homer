import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  define: {
    __VERCEL_ENV__: process.env.VITE_VERCEL_ENV,
  },
})
