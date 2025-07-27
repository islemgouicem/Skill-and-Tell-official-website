import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/snt_website/', // Replace with your actual repo name
  plugins: [tailwindcss(), react()],
})
