// ============================================================================
// Breakpoint 令牌定义
// ============================================================================

/// 基础断点配置
/// 使用标准的响应式设计断点，与 Tailwind CSS 保持一致
/// 单位使用 rem，假设 1rem = 16px
export const breakpoints = {
  xs: 475, // 29.6875rem
  sm: 640, // 40rem
  md: 768, // 48rem
  lg: 1024, // 64rem
  xl: 1280, // 80rem
  "2xl": 1536, // 96rem
} as const

/// 容器最大宽度配置
/// 用于设置容器在不同断点下的最大宽度
/// 单位使用 rem，与断点保持一致
export const containerMaxWidths = {
  xs: "none",
  sm: 640, // 40rem
  md: 768, // 48rem
  lg: 1024, // 64rem
  xl: 1280, // 80rem
  "2xl": 1536, // 96rem
} as const

/// 断点别名映射
/// 提供更语义化的命名
export const breakpointAliases = {
  mobile: "xs",
  tablet: "md",
  desktop: "lg",
  widescreen: "xl",
  ultrawide: "2xl",
} as const

/// 媒体查询类型
export const mediaQueryTypes = {
  screen: "screen",
  print: "print",
  all: "all",
} as const

/// 媒体查询方向
export const mediaQueryOrientations = {
  portrait: "portrait",
  landscape: "landscape",
} as const

// ============================================================================
// 类型定义
// ============================================================================

export type BreakpointKey = keyof typeof breakpoints
export type ContainerKey = keyof typeof containerMaxWidths
export type BreakpointAliasKey = keyof typeof breakpointAliases
export type MediaQueryType = keyof typeof mediaQueryTypes
export type MediaQueryOrientation = keyof typeof mediaQueryOrientations

export type BreakpointValue = BreakpointKey | BreakpointAliasKey | number
export type MediaQueryOptions = {
  maxHeight?: number
  maxWidth?: BreakpointValue
  minHeight?: number
  minWidth?: BreakpointValue
  orientation?: MediaQueryOrientation
  type?: MediaQueryType
}

// ============================================================================
// 辅助函数
// ============================================================================

/// 解析断点别名
/// @param breakpoint - 断点名称或别名
/// @returns 解析后的断点名称
export function resolveBreakpointAlias(breakpoint: BreakpointValue): BreakpointKey | number {
  if (typeof breakpoint === "number") {
    return breakpoint
  }

  if (breakpoint in breakpointAliases) {
    const alias = breakpointAliases[breakpoint as BreakpointAliasKey]
    return alias as BreakpointKey
  }

  if (breakpoint in breakpoints) {
    return breakpoint as BreakpointKey
  }

  throw new Error(`未知的断点: ${breakpoint}`)
}

/// 获取断点的像素值
/// @param breakpoint - 断点名称、别名或数值
/// @returns 像素值数字
export function getBreakpointValue(breakpoint: BreakpointValue): number {
  const resolved = resolveBreakpointAlias(breakpoint)

  if (typeof resolved === "number") {
    return resolved
  }

  return breakpoints[resolved]
}

/// 获取断点的 rem 值
/// @param breakpoint - 断点名称、别名或数值
/// @returns rem 值字符串
export function getBreakpointValueInRem(breakpoint: BreakpointValue): string {
  const pxValue = getBreakpointValue(breakpoint)
  return `${pxValue / 16}rem`
}

/// 检查断点是否存在
/// @param breakpoint - 断点名称
/// @returns 是否存在
export function breakpointExists(breakpoint: unknown): boolean {
  if (typeof breakpoint === "number") {
    return true
  }

  if (typeof breakpoint === "string") {
    return breakpoint in breakpoints || breakpoint in breakpointAliases
  }

  return false
}

/// 获取所有断点名称
/// @returns 断点名称列表
export function getBreakpointKeys(): BreakpointKey[] {
  return Object.keys(breakpoints) as BreakpointKey[]
}

/// 获取所有断点别名
/// @returns 断点别名列表
export function getBreakpointAliases(): BreakpointAliasKey[] {
  return Object.keys(breakpointAliases) as BreakpointAliasKey[]
}
