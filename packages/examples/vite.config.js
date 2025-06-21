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
    }),
  ],

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      "@examples": resolve(__dirname, "."),
    },
  },

  server: {
    port: 3001,
    open: true,
  },
});
