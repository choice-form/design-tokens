// ============================================================================
// Breakpoint 工具函数
// ============================================================================

import { cssVarRef } from "../css-variables/config"
import {
  breakpointAliases,
  breakpointExists,
  breakpoints,
  containerMaxWidths,
  getBreakpointValue,
  getBreakpointValueInRem,
  mediaQueryOrientations,
  mediaQueryTypes,
  resolveBreakpointAlias,
  type BreakpointKey,
  type BreakpointValue,
  type MediaQueryOptions,
  type MediaQueryType,
} from "../tokens/breakpoints"

// ============================================================================
// 基础断点函数
// ============================================================================

/// 获取断点值
/// @param breakpoint - 断点名称、别名或数值
/// @returns CSS 变量引用或像素值
/// @example
///   breakpoint('md')      // "var(--cdt-breakpoint-md)"
///   breakpoint('tablet')  // "var(--cdt-breakpoint-md)" (别名)
///   breakpoint(768)       // "768px"
export function breakpoint(breakpoint: BreakpointValue): string {
  if (typeof breakpoint === "number") {
    return `${breakpoint}px`
  }

  if (!breakpointExists(breakpoint)) {
    throw new Error(
      `断点 '${breakpoint}' 不存在。\n` +
        `可用断点: ${Object.keys(breakpoints).join(", ")}\n` +
        `可用别名: ${Object.keys(breakpointAliases).join(", ")}\n` +
        `或使用数值: breakpoint(768)`,
    )
  }

  const resolved = resolveBreakpointAlias(breakpoint)

  if (typeof resolved === "number") {
    return `${resolved}px`
  }

  return cssVarRef(`breakpoint-${resolved}`)
}

/// 获取容器最大宽度
/// @param breakpoint - 断点名称或别名
/// @returns CSS 变量引用或值
/// @example
///   container('md')      // "var(--cdt-container-md)"
///   container('tablet')  // "var(--cdt-container-md)" (别名)
export function container(breakpoint: BreakpointValue): string {
  const resolved = resolveBreakpointAlias(breakpoint)

  if (typeof resolved === "number") {
    return `${resolved}px`
  }

  if (!(resolved in containerMaxWidths)) {
    throw new Error(`容器断点 '${breakpoint}' 不存在`)
  }

  return cssVarRef(`container-${resolved}`)
}

// ============================================================================
// 媒体查询函数
// ============================================================================

/// 生成 min-width 媒体查询
/// @param breakpoint - 断点名称、别名或数值
/// @param type - 媒体查询类型，默认为 'screen'
/// @returns 媒体查询字符串
/// @example
///   up('md')        // "@media screen and (min-width: 768px)"
///   up('tablet')    // "@media screen and (min-width: 768px)" (别名)
///   up(768)         // "@media screen and (min-width: 768px)" (数值)
export function up(breakpoint: BreakpointValue, type: MediaQueryType = "screen"): string {
  const value = getBreakpointValue(breakpoint)
  const mediaType = type in mediaQueryTypes ? mediaQueryTypes[type] : type

  const remValue = getBreakpointValueInRem(breakpoint)

  return `@media ${mediaType} and (min-width: ${remValue})`
}

/// 生成 max-width 媒体查询
/// @param breakpoint - 断点名称、别名或数值
/// @param type - 媒体查询类型，默认为 'screen'
/// @returns 媒体查询字符串
/// @example
///   down('md')      // "@media screen and (max-width: 767.98px)"
///   down('tablet')  // "@media screen and (max-width: 767.98px)" (别名)
///   down(768)       // "@media screen and (max-width: 767.98px)" (数值)
export function down(breakpoint: BreakpointValue, type: MediaQueryType = "screen"): string {
  const value = getBreakpointValue(breakpoint)
  const mediaType = type in mediaQueryTypes ? mediaQueryTypes[type] : type

  // 减去 0.02px 以避免重叠，然后转换为 rem
  const maxValueInRem = (value - 0.02) / 16

  return `@media ${mediaType} and (max-width: ${maxValueInRem}rem)`
}

/// 生成范围媒体查询 (min-width 和 max-width)
/// @param minBreakpoint - 最小断点
/// @param maxBreakpoint - 最大断点
/// @param type - 媒体查询类型，默认为 'screen'
/// @returns 媒体查询字符串
/// @example
///   between('sm', 'lg')  // "@media screen and (min-width: 640px) and (max-width: 1023.98px)"
export function between(
  minBreakpoint: BreakpointValue,
  maxBreakpoint: BreakpointValue,
  type: MediaQueryType = "screen",
): string {
  const minValue = getBreakpointValueInRem(minBreakpoint)
  const maxValue = getBreakpointValue(maxBreakpoint)
  const maxValueInRem = (maxValue - 0.02) / 16
  const mediaType = type in mediaQueryTypes ? mediaQueryTypes[type] : type

  return `@media ${mediaType} and (min-width: ${minValue}) and (max-width: ${maxValueInRem}rem)`
}

/// 生成精确断点媒体查询 (只在特定断点范围内)
/// @param breakpoint - 断点名称、别名或数值
/// @param type - 媒体查询类型，默认为 'screen'
/// @returns 媒体查询字符串
/// @example
///   only('md')     // "@media screen and (min-width: 768px) and (max-width: 1023.98px)"
export function only(breakpoint: BreakpointValue, type: MediaQueryType = "screen"): string {
  const breakpointKeys = Object.keys(breakpoints) as BreakpointKey[]
  const resolved = resolveBreakpointAlias(breakpoint)

  if (typeof resolved === "number") {
    // 对于数值，无法确定上界，只使用 min-width
    return up(resolved, type)
  }

  const currentIndex = breakpointKeys.indexOf(resolved)

  if (currentIndex === -1) {
    throw new Error(`断点 '${breakpoint}' 不存在于预定义断点中`)
  }

  const currentValue = breakpoints[resolved]

  // 如果是最大的断点，只使用 min-width
  if (currentIndex === breakpointKeys.length - 1) {
    return up(currentValue, type)
  }

  // 使用下一个断点作为上界
  const nextBreakpoint = breakpointKeys[currentIndex + 1]
  const nextValue = breakpoints[nextBreakpoint]

  return between(currentValue, nextValue, type)
}

// ============================================================================
// 高级媒体查询函数
// ============================================================================

/// 生成自定义媒体查询
/// @param options - 媒体查询选项
/// @returns 媒体查询字符串
/// @example
///   media({ minWidth: 'md', maxWidth: 'lg', orientation: 'landscape' })
export function media(options: MediaQueryOptions): string {
  const { type = "screen", orientation, minWidth, maxWidth, minHeight, maxHeight } = options

  const mediaType = type in mediaQueryTypes ? mediaQueryTypes[type] : type
  const conditions: string[] = []

  if (minWidth !== undefined) {
    const value = getBreakpointValue(minWidth)
    conditions.push(`(min-width: ${value}px)`)
  }

  if (maxWidth !== undefined) {
    const value = getBreakpointValue(maxWidth)
    conditions.push(`(max-width: ${value - 0.02}px)`)
  }

  if (minHeight !== undefined) {
    conditions.push(`(min-height: ${minHeight}px)`)
  }

  if (maxHeight !== undefined) {
    conditions.push(`(max-height: ${maxHeight}px)`)
  }

  if (orientation && orientation in mediaQueryOrientations) {
    conditions.push(`(orientation: ${mediaQueryOrientations[orientation]})`)
  }

  if (conditions.length === 0) {
    return `@media ${mediaType}`
  }

  return `@media ${mediaType} and ${conditions.join(" and ")}`
}

/// 移动设备优先的媒体查询（xs 及以上）
/// @returns 媒体查询字符串
/// @example
///   mobile()  // "@media screen and (min-width: 475px)"
export function mobile(): string {
  return up("xs")
}

/// 平板设备媒体查询（md 到 lg）
/// @returns 媒体查询字符串
/// @example
///   tablet()  // "@media screen and (min-width: 768px) and (max-width: 1023.98px)"
export function tablet(): string {
  return between("md", "lg")
}

/// 桌面设备媒体查询（lg 及以上）
/// @returns 媒体查询字符串
/// @example
///   desktop()  // "@media screen and (min-width: 1024px)"
export function desktop(): string {
  return up("lg")
}

/// 打印媒体查询
/// @returns 打印媒体查询字符串
/// @example
///   print()  // "@media print"
export function print(): string {
  return "@media print"
}

// ============================================================================
// 辅助和调试函数
// ============================================================================

/// 获取断点信息（用于调试和文档）
/// @param breakpoint - 断点名称或别名
/// @returns 断点信息对象
/// @example
///   getBreakpointInfo('md')
///   // { name: 'md', value: 768, css: 'var(--cdt-breakpoint-md)', px: '768px' }
export function getBreakpointInfo(breakpoint: BreakpointValue) {
  const resolved = resolveBreakpointAlias(breakpoint)
  const value = getBreakpointValue(breakpoint)

  return {
    name: typeof resolved === "string" ? resolved : "custom",
    value,
    css: typeof resolved === "string" ? cssVarRef(`breakpoint-${resolved}`) : `${value}px`,
    px: `${value}px`,
    up: up(breakpoint),
    down: down(breakpoint),
    only: typeof resolved === "string" ? only(resolved) : up(value),
  }
}

/// 列出所有可用的断点
/// @returns 断点信息列表
export function listBreakpoints() {
  const breakpointKeys = Object.keys(breakpoints) as BreakpointKey[]
  const aliases = Object.keys(breakpointAliases)

  return {
    breakpoints: breakpointKeys.map((key) => ({
      name: key,
      value: breakpoints[key],
      css: cssVarRef(`breakpoint-${key}`),
      px: `${breakpoints[key]}px`,
    })),
    aliases: aliases.map((alias) => ({
      alias,
      target: breakpointAliases[alias as keyof typeof breakpointAliases],
    })),
  }
}
