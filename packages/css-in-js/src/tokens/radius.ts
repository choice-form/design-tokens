// ============================================================================
// Radius 圆角令牌定义
// ============================================================================

export const radiusValues = {
  sm: '0.125rem', // 2px
  md: '0.3125rem', // 5px
  lg: '0.8125rem', // 13px
} as const

// 类型定义
export type RadiusValueKey = keyof typeof radiusValues
export type RadiusKey = RadiusValueKey
