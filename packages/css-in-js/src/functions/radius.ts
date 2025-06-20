// ============================================================================
// Radius 工具函数
// ============================================================================

import { radiusValues, type RadiusKey } from "../tokens/radius"
import { cssVarRef } from "../css-variables/config"

/// 获取圆角值
/// @param name - 圆角名称
/// @param asVar - 是否返回 CSS 变量，默认 true
/// @returns 圆角值或 CSS 变量
/// @example
///   radius("md")        // "var(--cdt-radius-md)"
///   radius("sm", false) // "0.125rem"
export function radius(name: RadiusKey, asVar: boolean = true): string {
  if (!(name in radiusValues)) {
    throw new Error(`圆角 '${name}' 不存在`)
  }

  if (asVar) {
    return cssVarRef(`radius-${name}`)
  }

  return radiusValues[name]
}

/// 列出所有圆角值
/// @returns 圆角名称列表
export function listRadius(): string[] {
  return Object.keys(radiusValues)
}
