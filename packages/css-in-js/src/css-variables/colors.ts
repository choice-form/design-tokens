// ============================================================================
// Colors CSS 变量生成器
// ============================================================================

import { cssVar } from "./config"

type RGB = [number, number, number]

/// 生成基础颜色 CSS 变量的字符串
/// @param colors - 颜色对象
/// @returns CSS 变量字符串
function generateBaseColorVariables(colors: Record<string, RGB>): string {
  return Object.entries(colors)
    .map(([name, rgb]) => `  ${cssVar(name)}: ${rgb[0]}, ${rgb[1]}, ${rgb[2]};`)
    .join("\n")
}

/// 生成语义颜色 CSS 变量的字符串
/// @param colors - 语义颜色对象
/// @param baseColors - 基础颜色对象，用于解析引用
/// @returns CSS 变量字符串
function generateSemanticColorVariables(
  colors: Record<string, RGB | string>,
  baseColors: Record<string, RGB>,
): string {
  return Object.entries(colors)
    .map(([name, value]) => {
      if (typeof value === "string") {
        // 引用其他颜色
        if (value in baseColors) {
          const rgb = baseColors[value]
          return `  ${cssVar(name)}: ${rgb[0]}, ${rgb[1]}, ${rgb[2]};`
        }
        // 引用其他语义颜色（需要递归解析）
        return `  ${cssVar(name)}: var(${cssVar(value)});`
      } else {
        // 直接RGB值
        return `  ${cssVar(name)}: ${value[0]}, ${value[1]}, ${value[2]};`
      }
    })
    .join("\n")
}

/// 生成扩展语义颜色 CSS 变量的字符串
/// @param colors - 扩展语义颜色对象
/// @returns CSS 变量字符串
function generateExtendedSemanticColorVariables(colors: Record<string, RGB | string>): string {
  return Object.entries(colors)
    .map(([name, value]) => {
      if (typeof value === "string") {
        // 引用其他颜色
        return `  ${cssVar(name)}: var(${cssVar(value)});`
      } else {
        // 直接RGB值
        return `  ${cssVar(name)}: ${value[0]}, ${value[1]}, ${value[2]};`
      }
    })
    .join("\n")
}

/// 生成完整的颜色 CSS 变量
/// @param baseColors - 基础颜色
/// @param semanticColors - 语义颜色
/// @param extendedColors - 扩展语义颜色
/// @returns CSS 变量字符串
export function generateColorVariables(
  baseColors: Record<string, RGB>,
  paleColors: Record<string, RGB>,
  semanticColors: Record<string, RGB | string>,
  extendedColors: Record<string, RGB | string>,
): string {
  const baseVars = generateBaseColorVariables(baseColors)
  const paleVars = generateBaseColorVariables(paleColors)
  const semanticVars = generateSemanticColorVariables(semanticColors, baseColors)
  const extendedVars = generateExtendedSemanticColorVariables(extendedColors)

  return [baseVars, paleVars, semanticVars, extendedVars].filter(Boolean).join("\n")
}
