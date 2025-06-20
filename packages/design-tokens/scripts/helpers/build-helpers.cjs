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

// 复制 preflight.css 文件到 dist 目录
try {
  console.log("📄 复制 preflight.css...");

  const sourceFile = path.join(__dirname, "../../src/styles/preflight.css");
  const targetFile = path.join(distDir, "preflight.css");

  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    console.log("✅ preflight.css 复制完成!");
  } else {
    console.warn("⚠️  preflight.css 源文件不存在:", sourceFile);
  }
} catch (error) {
  console.error("❌ preflight.css 复制失败:", error.message);
}

// 修复 shadow 颜色格式
try {
  console.log("🎨 修复 shadow 颜色格式...");
  const tokensCSsPath = path.join(distDir, "tokens.css");
  if (fs.existsSync(tokensCSsPath)) {
    let cssContent = fs.readFileSync(tokensCSsPath, "utf8");

    // 转换 color(srgb r g b) 格式为 rgb(r, g, b)
    cssContent = cssContent.replace(
      /color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/g,
      (match, r, g, b) => {
        const red = Math.round(parseFloat(r) * 255);
        const green = Math.round(parseFloat(g) * 255);
        const blue = Math.round(parseFloat(b) * 255);
        return `rgb(${red}, ${green}, ${blue})`;
      }
    );

    // 转换 color(srgb r g b / alpha) 格式为 rgba(r, g, b, alpha)
    cssContent = cssContent.replace(
      /color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\/\s*([\d.]+)\)/g,
      (match, r, g, b, alpha) => {
        const red = Math.round(parseFloat(r) * 255);
        const green = Math.round(parseFloat(g) * 255);
        const blue = Math.round(parseFloat(b) * 255);
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      }
    );

    // 处理 Terrazzo 可能没有正确处理的空格分隔 rgba 格式
    // rgba(255 255 255 / 0.08) → rgba(255, 255, 255, 0.08)
    cssContent = cssContent.replace(
      /rgba\((\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)\)/g,
      "rgba($1, $2, $3, $4)"
    );

    fs.writeFileSync(tokensCSsPath, cssContent);
    console.log("✅ Shadow 颜色格式修复完成");
  }
} catch (error) {
  console.error("❌ Shadow 颜色格式修复失败:", error.message);
}
