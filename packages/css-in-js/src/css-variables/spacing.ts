// ============================================================================
// Spacing CSS 变量生成器
// ============================================================================

import { baseSpacing, cssVar } from './config'

/// 生成间距相关的 CSS 变量
export function generateSpacingVariables(): string {
  return `  ${cssVar('spacing')}: ${baseSpacing};`
}
