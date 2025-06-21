import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/design-tokens/" : "./",

  plugins: [
    react(),
    wyw({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
      classNameSlug: (hash, name) => `cdt-${hash}`,
      evaluationRules: [
        {
          action: "ignore",
          test: /node_modules/,
        },
      ],
      evalTimeout: 60000,
    }),
  ],

  // 确保 CSS 文件被正确处理
  css: {
    postcss: {},
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: process.env.NODE_ENV === "production" ? "esbuild" : false,
    rollupOptions: {
      external: [],
      maxParallelFileOps: 5,
    },
  },

  resolve: {
    alias: {
      "@examples": resolve(__dirname, "."),
    },
    // 确保 CSS 文件正确解析
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".css"],
  },

  server: {
    port: 3001,
    open: true,
  },

  optimizeDeps: {
    include: ["@choiceform/design-tokens"],
  },
});
