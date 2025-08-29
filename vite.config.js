import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({ mode }) => {
  return {
    plugins: [tailwindcss(), react()],
    optimizeDeps: {
      include: ["lucide-react"], // make sure icons are optimized properly
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            radix: ["@radix-ui/react-avatar", "@radix-ui/react-select"],
            ui: [
              "./src/sections/team-section.jsx",
              "./src/sections/events-section.jsx",
            ],
          },
        },
      },
    },
  }
})
