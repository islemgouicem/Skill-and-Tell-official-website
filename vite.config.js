import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/snt_website/' : '/',
    plugins: [tailwindcss(),react()],
  }
})
