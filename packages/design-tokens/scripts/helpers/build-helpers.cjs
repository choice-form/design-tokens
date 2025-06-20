#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔧 构建 TypeScript helper 函数...");

// 确保 dist 目录存在
const distDir = path.join(__dirname, "../../dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 编译 TypeScript 文件
try {
  console.log("📦 使用 TypeScript 编译器编译 helpers...");

  // 运行 tsc 命令
  execSync("npx tsc --project ../../config/tsconfig.build.json", {
    stdio: "inherit",
    cwd: __dirname,
  });

  console.log("✅ TypeScript helper 函数构建完成!");
} catch (error) {
  console.error("❌ TypeScript 编译失败:", error.message);
  process.exit(1);
}
