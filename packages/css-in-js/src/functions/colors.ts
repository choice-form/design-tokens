// ============================================================================
// 颜色工具函数
// ============================================================================

import {
  baseColorsLight,
  baseColorsDark,
  paleColors,
  semanticColorsLight,
  semanticColorsDark,
  extendedSemanticColors,
  colorAliases,
  defaultAlpha,
} from "../tokens/colors"
import { cssVarRef } from "../css-variables/config"

type ColorKey =
  | keyof typeof baseColorsLight
  | keyof typeof paleColors
  | keyof typeof semanticColorsLight
  | keyof typeof extendedSemanticColors
  | keyof typeof colorAliases
type Theme = "light" | "dark"

/// 获取颜色值
/// @param name - 颜色名称，支持基础色、语义色和短别名
/// @param alpha - 透明度，默认为1
/// @returns 完整的 rgba 颜色值
/// @example
///   color("blue-500")            // "rgba(var(--cdt-blue-500), 1)"
///   color("fg-default", 0.8)     // "rgba(var(--cdt-foreground-default), 0.8)"
///   color("bd-strong", 0.3)      // "rgba(var(--cdt-boundary-strong), 0.3)"
export function color(name: ColorKey, alpha: number = 1): string {
  // 处理短别名
  const resolvedName = resolveColorAlias(name)

  // 验证颜色是否存在
  if (!colorExists(resolvedName)) {
    throw new Error(
      `颜色 '${name}' 不存在。\n` +
        `可用颜色包括:\n` +
        `基础色: ${listBaseColors().join(", ")}\n` +
        `语义色: ${listSemanticColors().join(", ")}\n` +
        `短别名: ${listColorAliases().join(", ")}`,
    )
  }

  // 处理默认透明度
  const finalAlpha =
    alpha === 1 && resolvedName in defaultAlpha
      ? defaultAlpha[resolvedName as keyof typeof defaultAlpha]
      : alpha

  // 生成 rgba 函数调用
  return `rgba(${cssVarRef(resolvedName)}, ${finalAlpha})`
}

/// 批量获取颜色值（用于渐变等场景）
/// @param colors - 颜色定义列表，可以是字符串或[颜色名, 透明度]元组
/// @returns 颜色值数组
/// @example
///   colorList("blue-500", "purple-500", "pink-500")
///   colorList(["blue-500", 0.8], "purple-500", ["pink-500", 0.3])
export function colorList(...colors: (ColorKey | [ColorKey, number])[]): string[] {
  return colors.map((colorDef) => {
    if (Array.isArray(colorDef)) {
      const [name, alpha] = colorDef
      return color(name, alpha)
    } else {
      return color(colorDef)
    }
  })
}

// ============================================================================
// 辅助函数
// ============================================================================

/// 解析颜色别名
/// @param name - 颜色名称
/// @returns 解析后的真实颜色名称
function resolveColorAlias(name: ColorKey): string {
  if (name in colorAliases) {
    return colorAliases[name as keyof typeof colorAliases]
  }
  return name
}

/// 检查颜色是否存在
/// @param name - 颜色名称
/// @returns 是否存在
function colorExists(name: string): boolean {
  // 检查基础颜色 (light theme)
  if (name in baseColorsLight) {
    return true
  }

  // 检查基础颜色 (dark theme) - 主要用于验证
  if (name in baseColorsDark) {
    return true
  }

  // 检查基础颜色调色板
  if (name in paleColors) {
    return true
  }

  // 检查语义颜色（light theme）
  if (name in semanticColorsLight) {
    return true
  }

  // 检查语义颜色（dark theme）
  if (name in semanticColorsDark) {
    return true
  }

  // 检查扩展语义颜色
  if (name in extendedSemanticColors) {
    return true
  }

  return false
}

/// 列出所有基础颜色
/// @returns 基础颜色名称列表
function listBaseColors(): string[] {
  // 使用 light theme 的基础颜色作为参考（两个主题的键是相同的）
  return Object.keys(baseColorsLight)
}

/// 列出所有语义颜色
/// @returns 语义颜色名称列表
function listSemanticColors(): string[] {
  const lightColors = Object.keys(semanticColorsLight)
  const darkColors = Object.keys(semanticColorsDark)
  const extendedColors = Object.keys(extendedSemanticColors)

  // 合并并去重
  const allColors = [...new Set([...lightColors, ...darkColors, ...extendedColors])]
  return allColors
}

/// 列出所有颜色别名
/// @returns 颜色别名列表
function listColorAliases(): string[] {
  return Object.keys(colorAliases)
}

/// 获取颜色的RGB值（用于调试和演示）
/// @param name - 颜色名称
/// @param theme - 主题 ("light" 或 "dark")，默认为 "light"
/// @returns RGB值描述
/// @example
///   colorToRgb("blue-500")            // "13, 153, 255" (light theme)
///   colorToRgb("blue-500", "dark")    // "12, 140, 233" (dark theme)
///   colorToRgb("fg-default", "light") // "0, 0, 0"
export function colorToRgb(name: ColorKey, theme: Theme = "light"): string {
  const resolvedName = resolveColorAlias(name)

  if (!colorExists(resolvedName)) {
    return "颜色不存在"
  }

  // 选择正确的颜色集合
  const baseColors = theme === "dark" ? baseColorsDark : baseColorsLight
  const semanticColors = theme === "dark" ? semanticColorsDark : semanticColorsLight

  // 检查基础颜色
  if (resolvedName in baseColors) {
    const rgb = baseColors[resolvedName as keyof typeof baseColors]
    return `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`
  }

  // 检查基础颜色调色板
  if (resolvedName in paleColors) {
    const rgb = paleColors[resolvedName as keyof typeof paleColors]
    return `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`
  }

  // 检查语义颜色
  if (resolvedName in semanticColors) {
    const value = semanticColors[resolvedName as keyof typeof semanticColors]
    if (typeof value === "string") {
      return colorToRgb(value as ColorKey, theme) // 递归解析引用
    } else if (Array.isArray(value)) {
      return `${value[0]}, ${value[1]}, ${value[2]}`
    }
  }

  // 检查扩展语义颜色
  if (resolvedName in extendedSemanticColors) {
    const value = extendedSemanticColors[resolvedName as keyof typeof extendedSemanticColors]
    if (typeof value === "string") {
      return colorToRgb(value as ColorKey, theme) // 递归解析引用
    } else if (Array.isArray(value)) {
      return `${value[0]}, ${value[1]}, ${value[2]}`
    }
  }

  return "无法解析"
}
