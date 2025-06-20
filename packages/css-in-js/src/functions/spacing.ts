// ============================================================================
// Spacing 工具函数
// ============================================================================

import { cssVarRef } from "../css-variables/config"
import {
  breakpointExists,
  getBreakpointAliases,
  getBreakpointKeys,
  getBreakpointValue,
  type BreakpointValue as BreakpointValueType,
} from "../tokens/breakpoints"
import { scale } from "../tokens/spacing"

export type SpacingKey = keyof typeof scale
// 扩展类型支持分数字符串和任意值
export type FractionString = `${number}/${number}`
export type ArbitraryValue = `[${string}]`
export type SpacingValue =
  | SpacingKey
  | BreakpointValueType
  | number
  | FractionString
  | ArbitraryValue

/// 获取间距值 (类似 Tailwind 的统一计算方式)
/// @param size - 间距大小，支持预设值、任意数值、分数、断点别名或任意值
/// @returns 计算后的间距值
/// @example
///   spacing(0)         // "0"
///   spacing("px")      // "1px"
///   spacing(4)         // "calc(var(--cdt-spacing) * 4)"
///   spacing(15)        // "calc(var(--cdt-spacing) * 15)" - 任意数值
///   spacing("1/2")     // "50%" - 分数百分比
///   spacing("2/3")     // "66.666667%" - 分数百分比
///   spacing("[10vh]")  // "10vh" - 任意值
///   spacing("[calc(100%-1rem)]") // "calc(100%-1rem)" - calc表达式
///   spacing("md")      // "var(--cdt-breakpoint-md)" - 断点别名
export function spacing(size: SpacingValue): string {
  // 特殊值直接返回
  if (size === 0) {
    return "0"
  }
  if (size === "px") {
    return "1px"
  }

  // 处理任意值 [value]
  if (typeof size === "string" && size.startsWith("[") && size.endsWith("]")) {
    const arbitraryValue = size.slice(1, -1)
    return arbitraryValue
  }

  // 处理分数 1/2, 2/3 等
  if (typeof size === "string" && size.includes("/")) {
    return parseFraction(size)
  }

  // 断点别名支持
  if (typeof size === "string" && breakpointExists(size)) {
    return cssVarRef(`breakpoint-${size}`)
  }

  // 获取倍数值
  let multiplier: number | string | null = null

  // 检查是否为预设值
  if (size in scale) {
    multiplier = scale[size as SpacingKey]
  } else if (typeof size === "number") {
    // 支持任意数值
    multiplier = size
  } else {
    throw new Error(
      `spacing() 参数错误: '${size}' 不是有效的间距值。\n` +
        `可用预设值: ${Object.keys(scale).join(", ")}\n` +
        `断点: ${getBreakpointKeys().join(", ")}\n` +
        `断点别名: ${getBreakpointAliases().join(", ")}\n` +
        `分数值: "1/2", "1/3", "2/3", "1/4", "3/4" 等\n` +
        `任意值: "[10vh]", "[calc(100%-1rem)]" 等\n` +
        `示例: spacing(4), spacing("1/2"), spacing("[10vh]"), spacing("md")`,
    )
  }

  // 统一返回 calc 计算结果
  return `calc(${cssVarRef("spacing")} * ${multiplier})`
}

/// 解析分数字符串为百分比
/// @param fraction - 分数字符串，如 "1/2", "2/3"
/// @returns 百分比字符串
/// @example
///   parseFraction("1/2")  // "50%"
///   parseFraction("2/3")  // "66.666667%"
///   parseFraction("3/4")  // "75%"
function parseFraction(fraction: string): string {
  const match = fraction.match(/^(\d+)\/(\d+)$/)
  if (!match) {
    throw new Error(`无效的分数格式: '${fraction}'. 正确格式如: "1/2", "2/3"`)
  }

  const numerator = parseInt(match[1], 10)
  const denominator = parseInt(match[2], 10)

  if (denominator === 0) {
    throw new Error(`分母不能为0: '${fraction}'`)
  }

  const percentage = (numerator / denominator) * 100

  // 保留6位小数，去除多余的0
  return `${parseFloat(percentage.toFixed(6))}%`
}

/// 批量获取间距值（用于padding, margin简写）
/// @param sizes - 间距大小列表，支持1-4个值
/// @returns 计算后的间距值字符串
/// @example
///   spacingList(4, 6)          // "calc(var(--cdt-spacing) * 4) calc(var(--cdt-spacing) * 6)"
///   spacingList(0, 4, "px")    // "0 calc(var(--cdt-spacing) * 4) 1px"
///   spacingList("1/2", "full") // "50% calc(var(--cdt-spacing) * full)"
export function spacingList(...sizes: SpacingValue[]): string {
  return sizes.map((size) => spacing(size)).join(" ")
}

/// 检查是否为有效的间距值
/// @param size - 间距大小
/// @returns 是否为有效值
/// @example
///   spacingExists(4)           // true - 预设值
///   spacingExists(15)          // true - 任意数值
///   spacingExists("md")        // true - 断点别名
///   spacingExists("1/2")       // true - 分数
///   spacingExists("[10vh]")    // true - 任意值
///   spacingExists("abc")       // false - 无效值
export function spacingExists(size: unknown): boolean {
  // 断点别名检查
  if (breakpointExists(size)) {
    return true
  }

  // 字符串值检查
  if (typeof size === "string") {
    // 任意值检查
    if (size.startsWith("[") && size.endsWith("]")) {
      return true
    }

    // 分数检查
    if (size.includes("/")) {
      return /^\d+\/\d+$/.test(size)
    }

    // 预设值检查
    if (size in scale) {
      return true
    }
  }

  // 数值检查
  if (typeof size === "number") {
    return true
  }

  return false
}

/// 获取所有预设的间距大小
/// @returns 所有预设间距大小的key列表
export function spacingKeys(): SpacingKey[] {
  return Object.keys(scale) as SpacingKey[]
}

/// 获取常用分数值列表
/// @returns 常用分数值数组
export function commonFractions(): FractionString[] {
  return [
    "1/2",
    "1/3",
    "2/3",
    "1/4",
    "3/4",
    "1/5",
    "2/5",
    "3/5",
    "4/5",
    "1/6",
    "5/6",
    "1/12",
    "5/12",
    "7/12",
    "11/12",
  ]
}

/// 获取间距值对应的像素值（用于文档和调试）
/// @param size - 间距大小
/// @param basePx - 基础单位的像素值，默认为4px
/// @returns 像素值描述
/// @example
///   spacingToPx(0)           // "0px"
///   spacingToPx("px")        // "1px"
///   spacingToPx(4)           // "16px"
///   spacingToPx(15)          // "60px" - 任意数值
///   spacingToPx("1/2")       // "50%" - 分数
///   spacingToPx("[10vh]")    // "10vh" - 任意值
///   spacingToPx("md")        // "768px (breakpoint)" - 断点别名
export function spacingToPx(size: SpacingValue, basePx: number = 4): string {
  if (size === "px") {
    return "1px"
  }
  if (size === 0) {
    return "0px"
  }

  // 任意值
  if (typeof size === "string" && size.startsWith("[") && size.endsWith("]")) {
    return size.slice(1, -1)
  }

  // 分数值
  if (typeof size === "string" && size.includes("/")) {
    return parseFraction(size)
  }

  // 检查是否为断点
  if (breakpointExists(size)) {
    const breakpointValue = getBreakpointValue(size as BreakpointValueType)
    return `${breakpointValue}px (breakpoint)`
  }

  if (size in scale) {
    const multiplier = scale[size as SpacingKey]
    if (typeof multiplier === "number") {
      return `${multiplier * basePx}px`
    }
    return multiplier // 对于 "1px" 这样的值
  }

  if (typeof size === "number") {
    return `${size * basePx}px`
  }

  return "未知"
}
