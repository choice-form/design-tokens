// ============================================================================
// 基础 Z-Index 层级定义
// ============================================================================
export const zindexValues = {
  sticky: 100,
  fixed: 700,
  backdrop: 800,
  modals: 810,
  popover: 820,
  menu: 910,
  tooltip: 1000,
  notification: 1100,
  scroll: 1200,
} as const

// 类型定义
export type ZindexValueKey = keyof typeof zindexValues
export type ZindexKey = ZindexValueKey
