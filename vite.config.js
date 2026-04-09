import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"

export default defineConfig(() => {
  return {
    base: "/",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [tailwindcss(), react()],
    optimizeDeps: {
      include: ["lucide-react"], // make sure icons are optimized properly
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Only split large, independent libraries
              // Supabase (large library)
              if (id.includes('@supabase')) {
                return 'vendor-supabase';
              }
              // Three.js (3D library - large and independent)
              if (id.includes('three')) {
                return 'vendor-three';
              }
              // Everything else stays together to avoid React dependency issues
              return 'vendor';
            }

            // App-specific chunks - split by route
            if (id.includes('src/apps/skillntell')) {
              return 'app-skillntell';
            }
            if (id.includes('src/apps/eunoia')) {
              return 'app-eunoia';
            }
            if (id.includes('src/apps/mobai')) {
              return 'app-mobai';
            }
          },
        },
      },
      chunkSizeWarningLimit: 800,
    },
  }
})
