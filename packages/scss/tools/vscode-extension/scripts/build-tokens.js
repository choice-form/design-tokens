#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

/**
 * 构建时生成嵌入的令牌数据
 */
async function buildTokens() {
  try {
    console.log("🎨 开始构建令牌数据...")

    // 令牌数据文件路径
    const tokensDataPath = path.resolve(__dirname, "../../../generated/tokens-data.json")
    const outputPath = path.resolve(__dirname, "../src/data/tokens-data.ts")

    // 确保输出目录存在
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // 检查令牌数据文件是否存在
    if (!fs.existsSync(tokensDataPath)) {
      console.warn(`⚠️  令牌数据文件不存在: ${tokensDataPath}`)
      console.log("正在生成令牌数据...")

      // 运行令牌提取脚本
      const { execSync } = require("child_process")
      const scriptsDir = path.resolve(__dirname, "../../../scripts")
      execSync("node extract-tokens.js", {
        cwd: scriptsDir,
        stdio: "inherit",
      })

      // 再次检查文件是否存在
      if (!fs.existsSync(tokensDataPath)) {
        throw new Error(`令牌数据文件仍然不存在: ${tokensDataPath}`)
      }
    }

    // 读取令牌数据
    const tokensData = JSON.parse(fs.readFileSync(tokensDataPath, "utf8"))

    // 生成TypeScript文件内容
    const tsContent = `// 这个文件是自动生成的，请不要手动编辑
// 生成时间: ${new Date().toISOString()}

import { TokensData } from '../types/tokens'

/**
 * 嵌入的令牌数据
 * 在构建时从 tokens-data.json 生成
 */
export const EMBEDDED_TOKENS_DATA: TokensData = ${JSON.stringify(tokensData, null, 2)}

/**
 * 令牌统计信息
 */
export const TOKENS_STATS = {
  colors: ${tokensData.data.colors.length},
  spacing: ${tokensData.data.spacing.length},
  radius: ${tokensData.data.radius.length},
  shadows: ${tokensData.data.shadows.length},
  zindex: ${tokensData.data.zindex.length},
  typography: ${tokensData.data.typography.length},
  buildTime: '${new Date().toISOString()}'
} as const
`

    // 写入TypeScript文件
    fs.writeFileSync(outputPath, tsContent, "utf8")

    console.log(`✅ 令牌数据已嵌入到: ${outputPath}`)
    console.log(`📊 统计信息:`)
    console.log(`   - 颜色: ${tokensData.data.colors.length}`)
    console.log(`   - 间距: ${tokensData.data.spacing.length}`)
    console.log(`   - 圆角: ${tokensData.data.radius.length}`)
    console.log(`   - 阴影: ${tokensData.data.shadows.length}`)
    console.log(`   - 层级: ${tokensData.data.zindex.length}`)
    console.log(`   - 字体: ${tokensData.data.typography.length}`)
  } catch (error) {
    console.error("❌ 构建令牌数据失败:", error)
    process.exit(1)
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  buildTokens()
}

module.exports = { buildTokens }
