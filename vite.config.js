import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(() => {
  return {
    base: "/",
    plugins: [tailwindcss(), react()],
    optimizeDeps: {
      include: ["lucide-react"], // make sure icons are optimized properly
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor chunks - split by library
            if (id.includes('node_modules')) {
              // React core
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'vendor-react';
              }
              // Radix UI components
              if (id.includes('@radix-ui')) {
                return 'vendor-radix';
              }
              // Framer motion
              if (id.includes('framer-motion')) {
                return 'vendor-motion';
              }
              // Supabase (likely large)
              if (id.includes('@supabase')) {
                return 'vendor-supabase';
              }
              // Three.js (3D library - can be large)
              if (id.includes('three')) {
                return 'vendor-three';
              }
              // Lucide icons
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              // Embla carousel
              if (id.includes('embla-carousel')) {
                return 'vendor-carousel';
              }
              // Utility libraries (small, can be grouped)
              if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
                return 'vendor-utils';
              }
              // Other vendors (should be minimal now)
              return 'vendor-other';
            }

            // App-specific chunks - split by route/app
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
      chunkSizeWarningLimit: 600, // Increase limit slightly to 600 KB
    },
  }
})
