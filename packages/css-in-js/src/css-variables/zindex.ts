// ============================================================================
// Z-Index CSS 变量生成器
// ============================================================================

import { cssVar } from './config'

/// 生成 z-index CSS 变量
/// @param zindexValues - z-index 值
/// @returns CSS 变量字符串
export function generateZindexVariables(zindexValues: Record<string, number>): string {
  return Object.entries(zindexValues)
    .map(([name, value]) => `  ${cssVar(`z-${name}`)}: ${value};`)
    .join('\n')
}
