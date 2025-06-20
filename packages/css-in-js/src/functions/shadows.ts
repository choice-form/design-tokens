// ============================================================================
// 阴影工具函数
// ============================================================================

import {
  shadowsLight,
  shadowsDark,
  semanticShadows,
  hardShadows,
  type ShadowKey,
} from "../tokens/shadows"
import { cssVarRef } from "../css-variables/config"

type Theme = "light" | "dark"

/// 获取阴影值
/// @param name - 阴影名称
/// @param theme - 主题名称，"light" | "dark"，默认自动检测
/// @param asVar - 是否返回 CSS 变量，默认 true
/// @returns 阴影值或 CSS 变量
/// @example
///   shadow("md")                // "var(--cdt-shadow-md)"
///   shadow("lg", null, false)   // "0px 2px 5px..."
///   shadow("lg", "dark")        // "var(--cdt-shadow-lg)"
export function shadow(name: ShadowKey, theme?: Theme | null, asVar: boolean = true): string {
  // 如果请求 CSS 变量，直接返回
  if (asVar) {
    return cssVarRef(`shadow-${name}`)
  }

  // 自动检测主题
  const currentTheme = theme || "light"

  // 检查阴影是否存在
  if (!shadowExists(name)) {
    throw new Error(`阴影 '${name}' 不存在。可用的阴影: ${listAllShadows().join(", ")}`)
  }

  // 获取阴影值
  return getShadowValue(name, currentTheme)
}

/// 列出所有可用阴影
/// @returns 阴影名称列表
export function listShadows(): string[] {
  return listAllShadows()
}

/// 列出语义阴影
/// @returns 语义阴影名称列表
export function listSemanticShadows(): string[] {
  return Object.keys(semanticShadows)
}

// ============================================================================
// 辅助函数
// ============================================================================

/// 检查阴影是否存在
/// @param name - 阴影名称
/// @returns 是否存在
function shadowExists(name: string): boolean {
  // 检查基础阴影 (light theme)
  if (name in shadowsLight) {
    return true
  }

  // 检查基础阴影 (dark theme)
  if (name in shadowsDark) {
    return true
  }

  // 检查语义阴影
  if (name in semanticShadows) {
    return true
  }

  // 检查特殊阴影
  if (name in hardShadows) {
    return true
  }

  return false
}

/// 获取阴影值
/// @param name - 阴影名称
/// @param theme - 主题名称
/// @returns 阴影值
function getShadowValue(name: string, theme: Theme): string {
  // 选择主题对应的阴影映射
  const shadows = theme === "dark" ? shadowsDark : shadowsLight

  // 直接查找基础阴影
  if (name in shadows) {
    const shadowList = shadows[name as keyof typeof shadows]
    return shadowListToString(shadowList)
  }

  // 查找语义阴影
  if (name in semanticShadows) {
    const baseName = semanticShadows[name as keyof typeof semanticShadows]

    // 如果是特殊阴影，返回处理后的值
    if (baseName in hardShadows) {
      const specialShadow = hardShadows[baseName as keyof typeof hardShadows]
      return shadowListToString(specialShadow)
    }

    // 否则递归获取基础阴影
    if (baseName in shadows) {
      const shadowList = shadows[baseName as keyof typeof shadows]
      return shadowListToString(shadowList)
    }
  }

  // 查找特殊阴影
  if (name in hardShadows) {
    const specialShadow = hardShadows[name as keyof typeof hardShadows]
    return shadowListToString(specialShadow)
  }

  return "无法解析"
}

/// 将阴影列表转换为字符串
/// @param shadowList - 阴影列表
/// @returns 阴影字符串
function shadowListToString(shadowList: readonly string[]): string {
  return shadowList.join(", ")
}

/// 列出所有阴影
/// @returns 阴影名称列表
function listAllShadows(): string[] {
  const lightShadows = Object.keys(shadowsLight)
  const darkShadows = Object.keys(shadowsDark)
  const semanticShadowKeys = Object.keys(semanticShadows)
  const specialShadowKeys = Object.keys(hardShadows)

  // 合并并去重
  const allShadows = [
    ...new Set([...lightShadows, ...darkShadows, ...semanticShadowKeys, ...specialShadowKeys]),
  ]

  return allShadows
}
