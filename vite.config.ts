import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'
import { themeScriptPlugin } from './plugins/vite-plugin-theme-script'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    viteReact(),
    themeScriptPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
