// ============================================================================
// Radius CSS 变量生成器
// ============================================================================

import { cssVar } from './config'

/// 生成圆角 CSS 变量
/// @param radiusValues - 圆角值
/// @returns CSS 变量字符串
export function generateRadiusVariables(radiusValues: Record<string, string>): string {
  return Object.entries(radiusValues)
    .map(([name, value]) => `  ${cssVar(`radius-${name}`)}: ${value};`)
    .join('\n')
}
