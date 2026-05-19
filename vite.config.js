import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      // Proxies /formsubmit/* → https://formsubmit.co/* during local dev.
      // Avoids CORS since the request leaves from the Node process, not the browser.
      '/formsubmit': {
        target: 'https://formsubmit.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/formsubmit/, ''),
      },
    },
  },
})
