#!/usr/bin/env node

/* eslint-env node */

/**
 * SCSS 令牌提取脚本
 * 从现有的 SCSS 文件中提取设计令牌，按类型生成 JSON 文件
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置路径
const TOKENS_DIR = path.join(__dirname, "../src/tokens")
const OUTPUT_DIR = path.join(__dirname, "../generated")

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

/**
 * 解析 SCSS Map 语法
 * @param {string} content - SCSS 文件内容
 * @param {string} mapName - Map 变量名（如 'base-colors-light'）
 * @returns {Object} 解析后的数据
 */
function parseScssMap(content, mapName) {
  const mapRegex = new RegExp(`\\$${mapName}:\\s*\\((.*?)\\)\\s*(?:!default)?\\s*;`, "gs")
  const match = mapRegex.exec(content)

  if (!match) {
    console.warn(`⚠️  未找到 SCSS Map: $${mapName}`)
    return {}
  }

  const mapContent = match[1]
  const result = {}

  // 按行分割，去除空行和注释行
  const lines = mapContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("//"))

  for (const line of lines) {
    // 匹配不同的格式：
    // "key": (r, g, b),
    // "key": value,
    // key: value,
    const patterns = [
      // RGB 元组格式: "blue-500": (13, 153, 255),
      /^["']([^"']+)["']:\s*\((\d+),\s*(\d+),\s*(\d+)\)\s*,?\s*(?:\/\/.*)?$/,
      // 字符串值: "key": "value",
      /^["']([^"']+)["']:\s*["']([^"']+)["']\s*,?\s*(?:\/\/.*)?$/,
      // 数值: "key": 123,
      /^["']([^"']+)["']:\s*([^,\s]+)\s*,?\s*(?:\/\/.*)?$/,
      // 无引号键: key: value,
      /^([^"':,\s]+):\s*([^,\s]+)\s*,?\s*(?:\/\/.*)?$/,
    ]

    let matched = false
    for (const pattern of patterns) {
      const match = line.match(pattern)
      if (match) {
        matched = true
        const key = match[1]

        if (pattern === patterns[0]) {
          // RGB 元组
          const [, , r, g, b] = match
          result[key] = {
            rgb: [parseInt(r), parseInt(g), parseInt(b)],
            hex: `#${parseInt(r).toString(16).padStart(2, "0")}${parseInt(g).toString(16).padStart(2, "0")}${parseInt(b).toString(16).padStart(2, "0")}`,
          }
        } else {
          // 其他值
          let value = match[2]

          // 数据类型处理
          if (value === "0") {
            result[key] = { value: 0 }
          } else if (/^\d+(\.\d+)?$/.test(value)) {
            result[key] = { value: parseFloat(value) }
          } else if (value.endsWith("px") || value.endsWith("rem") || value.endsWith("%")) {
            result[key] = { value: value }
          } else {
            // 移除引号
            value = value.replace(/^["']|["']$/g, "")
            result[key] = { value: value }
          }
        }
        break
      }
    }

    if (!matched && line.trim()) {
      console.warn(`⚠️  无法解析行: ${line}`)
    }
  }

  return result
}

/**
 * 提取颜色令牌
 */
function extractColors() {
  const colorsFile = path.join(TOKENS_DIR, "_colors.scss")

  if (!fs.existsSync(colorsFile)) {
    console.error(`❌ 颜色文件不存在: ${colorsFile}`)
    return null
  }

  console.log("🎨 提取颜色令牌...")
  const content = fs.readFileSync(colorsFile, "utf8")

  // 提取各种颜色 Map
  const baseColorsLight = parseScssMap(content, "base-colors-light")
  const baseColorsDark = parseScssMap(content, "base-colors-dark")
  const semanticColorsLight = parseScssMap(content, "semantic-colors-light")
  const semanticColorsDark = parseScssMap(content, "semantic-colors-dark")
  const extendedSemanticColors = parseScssMap(content, "extended-semantic-colors")
  const colorAliases = parseScssMap(content, "color-aliases")

  // 转换为 VSCode 扩展格式
  const colors = []

  // 基础颜色 (只保留 Light Theme)
  Object.entries(baseColorsLight).forEach(([name, data]) => {
    colors.push({
      key: `"${name}"`,
      value: data.hex || data.value,
      rgb: data.rgb ? data.rgb.join(", ") : undefined,
      preview: data.hex || data.value,
      category: "base",
      description: `${name.replace("-", " ")} color`,
    })
  })

  // 跳过语义颜色和扩展语义颜色，只保留基础颜色和短别名

  // 颜色别名 - 只保留短命名 (bg-, fg-, bd-)
  Object.entries(colorAliases).forEach(([alias, data]) => {
    // 只保留短命名的别名
    if (alias.startsWith("bg-") || alias.startsWith("fg-") || alias.startsWith("bd-")) {
      colors.push({
        key: `"${alias}"`,
        value: `var(--cdt-${data.value})`,
        category: "alias",
        description: `Alias for ${data.value}`,
      })
    }
  })

  console.log(`✅ 提取了 ${colors.length} 个颜色令牌`)
  return colors
}

/**
 * 提取间距令牌
 */
function extractSpacing() {
  const spacingFile = path.join(TOKENS_DIR, "_spacing.scss")

  if (!fs.existsSync(spacingFile)) {
    console.error(`❌ 间距文件不存在: ${spacingFile}`)
    return null
  }

  console.log("📐 提取间距令牌...")
  const content = fs.readFileSync(spacingFile, "utf8")

  const scale = parseScssMap(content, "scale")
  const spacing = []

  Object.entries(scale).forEach(([key, data]) => {
    const { value } = data
    let pixelValue = "0px"
    let description = "No spacing"

    if (value === 0) {
      pixelValue = "0px"
      description = "No spacing"
    } else if (typeof value === "string" && value.endsWith("px")) {
      pixelValue = value
      description = value
    } else if (typeof value === "number") {
      pixelValue = `${value * 4}px`
      description = `${value * 4}px (${value} * 4px)`
    }

    spacing.push({
      key: key,
      value: value,
      pixelValue: pixelValue,
      description: description,
    })
  })

  // 添加断点别名（从 spacing 函数支持的断点）
  const breakpoints = [
    { key: "sm", value: "640px", description: "Small breakpoint (640px)" },
    { key: "md", value: "768px", description: "Medium breakpoint (768px)" },
    { key: "lg", value: "1024px", description: "Large breakpoint (1024px)" },
    { key: "xl", value: "1280px", description: "Extra large breakpoint (1280px)" },
    { key: "2xl", value: "1536px", description: "2X large breakpoint (1536px)" },
  ]

  breakpoints.forEach(({ key, value, description }) => {
    spacing.push({
      key: key,
      value: value,
      pixelValue: value,
      description: description,
    })
  })

  console.log(`✅ 提取了 ${spacing.length} 个间距令牌（包括 ${breakpoints.length} 个断点）`)
  return spacing
}

/**
 * 提取圆角令牌
 */
function extractRadius() {
  const radiusFile = path.join(TOKENS_DIR, "_radius.scss")

  if (!fs.existsSync(radiusFile)) {
    console.error(`❌ 圆角文件不存在: ${radiusFile}`)
    return null
  }

  console.log("⭕ 提取圆角令牌...")
  const content = fs.readFileSync(radiusFile, "utf8")

  const radiusValues = parseScssMap(content, "radius-values")
  const radius = []

  // 基础圆角值
  Object.entries(radiusValues).forEach(([key, data]) => {
    radius.push({
      key: key,
      value: data.value,
      category: "base",
      description: `${key} border radius`,
    })
  })

  console.log(`✅ 提取了 ${radius.length} 个圆角令牌`)
  return radius
}

/**
 * 提取阴影令牌
 */
function extractShadows() {
  const shadowsFile = path.join(TOKENS_DIR, "_shadows.scss")

  if (!fs.existsSync(shadowsFile)) {
    console.error(`❌ 阴影文件不存在: ${shadowsFile}`)
    return null
  }

  console.log("🌑 提取阴影令牌...")
  const content = fs.readFileSync(shadowsFile, "utf8")

  // 只提取语义阴影
  const semanticShadows = parseScssMap(content, "semantic-shadows")
  const shadows = []

  // 语义阴影
  Object.entries(semanticShadows).forEach(([name, data]) => {
    shadows.push({
      key: name,
      value: `var(--cdt-shadow-${name})`,
      category: "semantic",
      description: `${name} semantic shadow`,
    })
  })

  console.log(`✅ 提取了 ${shadows.length} 个阴影令牌`)
  return shadows
}

/**
 * 提取字体排版令牌
 */
function extractTypography() {
  const typographyFile = path.join(TOKENS_DIR, "_typography.scss")

  if (!fs.existsSync(typographyFile)) {
    console.error(`❌ 字体排版文件不存在: ${typographyFile}`)
    return null
  }

  console.log("🔤 提取字体排版令牌...")
  const content = fs.readFileSync(typographyFile, "utf8")

  // 提取各种字体排版 Map
  const fontSizes = parseScssMap(content, "font-sizes")
  const fontFamilies = parseScssMap(content, "font-families")
  const fontWeights = parseScssMap(content, "font-weights")
  const lineHeights = parseScssMap(content, "line-heights")
  const letterSpacings = parseScssMap(content, "letter-spacings")

  const typography = []

  // 字体大小
  Object.entries(fontSizes).forEach(([key, data]) => {
    typography.push({
      key: key,
      value: data.value,
      category: "font-size",
      description: `${key} font size`,
    })
  })

  // 字体族
  Object.entries(fontFamilies).forEach(([key, data]) => {
    // 字体族是数组，需要转换为字符串
    const fontList = Array.isArray(data.value) ? data.value.join(", ") : data.value
    typography.push({
      key: key,
      value: fontList,
      category: "font-family",
      description: `${key} font family`,
    })
  })

  // 字体重量
  Object.entries(fontWeights).forEach(([key, data]) => {
    typography.push({
      key: key,
      value: data.value,
      category: "font-weight",
      description: `${key} font weight`,
    })
  })

  // 行高
  Object.entries(lineHeights).forEach(([key, data]) => {
    typography.push({
      key: key,
      value: data.value,
      category: "line-height",
      description: `${key} line height`,
    })
  })

  // 字符间距
  Object.entries(letterSpacings).forEach(([key, data]) => {
    typography.push({
      key: key,
      value: data.value,
      category: "letter-spacing",
      description: `${key} letter spacing`,
    })
  })

  console.log(`✅ 提取了 ${typography.length} 个字体排版令牌`)
  return typography
}

/**
 * 提取 Z-index 令牌
 */
function extractZindex() {
  const zindexFile = path.join(TOKENS_DIR, "_zindex.scss")

  if (!fs.existsSync(zindexFile)) {
    console.error(`❌ Z-index 文件不存在: ${zindexFile}`)
    return null
  }

  console.log("📚 提取 Z-index 令牌...")
  const content = fs.readFileSync(zindexFile, "utf8")

  // 只提取基础 Z-index Map
  const zindexValues = parseScssMap(content, "zindex-values")
  const zindex = []

  // 基础 Z-index 值
  Object.entries(zindexValues).forEach(([key, data]) => {
    zindex.push({
      key: key,
      value: data.value,
      category: "base",
      description: `${key} z-index level`,
    })
  })

  console.log(`✅ 提取了 ${zindex.length} 个 Z-index 令牌`)
  return zindex
}

/**
 * 写入 JSON 文件
 */
function writeJsonFile(filename, data) {
  const filePath = path.join(OUTPUT_DIR, filename)
  const jsonContent = JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      source: "SCSS tokens extraction",
      data: data,
    },
    null,
    2,
  )

  fs.writeFileSync(filePath, jsonContent)
  console.log(`📁 已生成: ${path.relative(process.cwd(), filePath)}`)
}

/**
 * 主函数
 */
function main() {
  console.log("🚀 开始提取 SCSS 设计令牌...\n")

  try {
    // 提取各类令牌
    const colors = extractColors()
    const spacing = extractSpacing()
    const radius = extractRadius()
    const shadows = extractShadows()
    const zindex = extractZindex()
    const typography = extractTypography()

    // 按类型保存
    if (colors) writeJsonFile("color.json", colors)
    if (spacing) writeJsonFile("spacing.json", spacing)
    if (radius) writeJsonFile("radius.json", radius)
    if (shadows) writeJsonFile("shadows.json", shadows)
    if (zindex) writeJsonFile("zindex.json", zindex)
    if (typography) writeJsonFile("typography.json", typography)

    // 生成 VSCode 扩展专用的统一文件
    const vscodeData = {
      spacing: spacing || [],
      colors: colors || [],
      shadows: shadows || [],
      zindex: zindex || [],
      radius: radius || [],
      typography: typography || [],
    }

    writeJsonFile("tokens-data.json", vscodeData)

    console.log("\n🎉 提取完成！生成的文件：")
    console.log("   📁 generated/")
    console.log("   ├── color.json        (颜色令牌)")
    console.log("   ├── spacing.json      (间距令牌)")
    console.log("   ├── radius.json       (圆角令牌)")
    console.log("   ├── shadows.json      (阴影令牌)")
    console.log("   ├── zindex.json       (Z-index令牌)")
    console.log("   ├── typography.json   (字体排版令牌)")
    console.log("   └── tokens-data.json  (VSCode扩展用)")
  } catch (error) {
    console.error("❌ 提取失败:", error.message)
    process.exit(1)
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { main, extractColors, extractSpacing, extractRadius, extractTypography }
