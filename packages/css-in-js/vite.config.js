import { defineConfig } from "vite"
import { resolve } from "path"
import { fileURLToPath } from "node:url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        functions: resolve(__dirname, "src/functions/index.ts"),
        "css-variables": resolve(__dirname, "src/css-variables/index.ts"),
      },
      name: "DesignTokens",
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["tinycolor2"],
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
