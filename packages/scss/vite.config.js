import { defineConfig } from "vite"
import { resolve } from "path"
import { fileURLToPath, URL } from "node:url"
import react from "@vitejs/plugin-react"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  // React插件
  plugins: [react()],

  // CSS配置
  css: {
    modules: {
      // 生成的类名格式
      generateScopedName: "css_[hash:base36:6]",
    },
    preprocessorOptions: {
      scss: {
        // 使用现代 Sass API 解决 legacy JS API 弃用警告
        api: "modern-compiler",
        // 自动导入我们的设计令牌（相对于 demo 目录中的 SCSS 文件）
        // additionalData: `@use "../../src/_index" as dt;`,
      },
    },
  },

  // 解析配置
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
  },
})
