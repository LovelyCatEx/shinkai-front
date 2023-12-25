import { fileURLToPath, URL } from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig(({command,mode}) => {
  const config = loadEnv(mode, "./")
  console.log("Loaded config: ", config, "mode: ", mode, "command: ", command)
  return {
    base: './',
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        // 这里配置 mixin.scss 混合文件的全局引入
        scss: {
          additionalData: `@import "@/styles/mixin.scss";`
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          target: config.VITE_API_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    }
  }
})