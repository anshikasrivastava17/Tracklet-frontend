import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
    }),
    tailwindcss(),
  ],

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
    ],
    force: false,
  },

  server: {
    port: 5173,
    fs: {
      strict: false,
    },
    // Proxy API calls to local backend during development
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/products': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/monitor': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/test-monitor': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    warmup: {
      clientFiles: [
        './src/App.jsx',
        './src/components/Landing/Landing.jsx',
        './src/components/Navbar/Navbar.jsx',
        './src/components/GoogleBlobs/GoogleBlobs.jsx',
      ],
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            if (id.includes('react-router-dom')) {
              return 'router';
            }
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'vendor';
            }
          }
        }
      },
    },
    // REMOVED the minify: 'esbuild' line entirely!
  },

  css: {
    devSourcemap: false,
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})