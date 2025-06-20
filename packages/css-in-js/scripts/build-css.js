#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 动态导入 ES 模块
async function buildCSS() {
  try {
    // 导入构建后的模块
    const { getCssVariables, theme } = await import("../dist/index.js")

    const distDir = path.join(__dirname, "../dist")

    // getCssVariables() 已经包含完整的 :root { ... } CSS规则
    const mainCSS = getCssVariables()

    // 生成完整的 CSS 文件（包含亮色和暗色主题）
    const fullCSS = `/* ChoiceForm Design Tokens CSS Variables */
/* 自动生成，请勿手动修改 */

${mainCSS}

`

    // 写入文件
    fs.writeFileSync(path.join(distDir, "design-tokens.css"), fullCSS)

    console.log("✅ CSS 文件生成成功:")
    console.log("  - design-tokens.css (完整版，包含亮色和暗色主题)")
  } catch (error) {
    console.error("❌ CSS 文件生成失败:", error)
    process.exit(1)
  }
}

buildCSS()
