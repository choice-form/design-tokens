// ============================================================================
// Z-Index 工具函数
// ============================================================================

import { zindexValues, type ZindexKey } from "../tokens/zindex"
import { cssVarRef } from "../css-variables/config"

/// 获取 z-index 值
/// @param name - z-index 名称
/// @param asVar - 是否返回 CSS 变量，默认 true
/// @returns z-index 值或 CSS 变量
/// @example
///   zindex("modals")        // "var(--cdt-z-modals)"
///   zindex("tooltip", false) // "1000"
export function zindex(name: ZindexKey, asVar: boolean = true): string {
  if (!(name in zindexValues)) {
    throw new Error(`z-index '${name}' 不存在`)
  }

  if (asVar) {
    return cssVarRef(`z-${name}`)
  }

  return zindexValues[name].toString()
}

/// 列出所有 z-index 值
/// @returns z-index 名称列表
export function listZindex(): string[] {
  return Object.keys(zindexValues)
}
