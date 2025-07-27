import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import ghPages from 'vite-plugin-gh-pages'

export default defineConfig({
  base: '/snt_website/',
  plugins: [tailwindcss(), react(), ghPages()],
})
