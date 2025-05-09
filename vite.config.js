import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      '@mui/material/Unstable_Grid2',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Tooltip'
    ]
  },

  define: {
    'process.env': process.env
  },

  plugins: [react(), svgr()],
  // base: './'
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
