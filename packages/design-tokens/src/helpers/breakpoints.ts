// ============================================================================
// Breakpoint Helper Functions - 断点辅助函数
// ============================================================================

import { getAllTokenPaths, getToken } from "./tokens";
import type {
  BreakpointValue,
  MediaQueryType,
  ThemeMode,
} from "../types/helpers";

// 定义尺寸令牌的类型
interface DimensionToken {
  value: number;
  unit: string;
}

/**
 * 检查是否为尺寸令牌
 * @param token - 令牌对象
 * @returns 是否为尺寸令牌
 */
function isDimensionToken(token: any): token is DimensionToken {
  return (
    token &&
    typeof token === "object" &&
    typeof token.value === "number" &&
    typeof token.unit === "string"
  );
}

/**
 * 获取断点值（编译时类型检查版本）
 * @param name - 断点名称
 * @param mode - 主题模式
 * @returns CSS 断点值
 * @example
 *   breakpoint("sm")   // "640px"
 *   breakpoint("md")   // "768px"
 *   breakpoint("lg")   // "1024px"
 */
export function breakpoint(name: BreakpointValue, mode?: ThemeMode): string;

/**
 * 获取断点值（运行时动态值版本）
 * @param name - 断点名称
 * @param mode - 主题模式
 * @returns CSS 断点值
 */
export function breakpoint(name: string, mode?: ThemeMode): string;

/**
 * 获取断点值（实现）
 */
export function breakpoint(name: string, mode: ThemeMode = "."): string {
  const tokenPath = `breakpoints.${name}`;

  try {
    const tokenValue = getToken(tokenPath, mode);

    if (!isDimensionToken(tokenValue)) {
      throw new Error(
        `Token at path '${tokenPath}' is not a valid dimension token`
      );
    }

    return `${tokenValue.value}${tokenValue.unit}`;
  } catch (error) {
    const availableBreakpoints = listBreakpoints();
    throw new Error(
      `Breakpoint '${name}' not found. Available breakpoints: ${availableBreakpoints.join(", ")}`
    );
  }
}

/**
 * 生成媒体查询（编译时类型检查版本）
 * @param name - 断点名称
 * @param type - 媒体查询类型，默认 "screen"
 * @param mode - 主题模式
 * @returns 完整的媒体查询字符串
 * @example
 *   mediaQuery("md")          // "@media screen and (min-width: 768px)"
 *   mediaQuery("lg", "print") // "@media print and (min-width: 1024px)"
 */
export function mediaQuery(
  name: BreakpointValue,
  type?: MediaQueryType,
  mode?: ThemeMode
): string;

/**
 * 生成媒体查询（运行时动态值版本）
 */
export function mediaQuery(
  name: string,
  type?: MediaQueryType,
  mode?: ThemeMode
): string;

/**
 * 生成媒体查询（实现）
 */
export function mediaQuery(
  name: string,
  type: MediaQueryType = "screen",
  mode?: ThemeMode
): string {
  const breakpointValue = breakpoint(name, mode);
  return `@media ${type} and (min-width: ${breakpointValue})`;
}

/**
 * 生成向下媒体查询（max-width）（编译时类型检查版本）
 * @param name - 断点名称
 * @param type - 媒体查询类型，默认 "screen"
 * @param mode - 主题模式
 * @returns 向下的媒体查询字符串
 * @example
 *   mediaQueryDown("md")     // "@media screen and (max-width: 767.98px)"
 */
export function mediaQueryDown(
  name: BreakpointValue,
  type?: MediaQueryType,
  mode?: ThemeMode
): string;

/**
 * 生成向下媒体查询（运行时动态值版本）
 */
export function mediaQueryDown(
  name: string,
  type?: MediaQueryType,
  mode?: ThemeMode
): string;

/**
 * 生成向下媒体查询（实现）
 */
export function mediaQueryDown(
  name: string,
  type: MediaQueryType = "screen",
  mode?: ThemeMode
): string {
  const tokenPath = `breakpoints.${name}`;
  const tokenValue = getToken(tokenPath, mode || ".");

  if (!isDimensionToken(tokenValue)) {
    throw new Error(`Breakpoint '${name}' not found`);
  }

  // 减去 0.02px 以避免重叠
  const maxValue = tokenValue.value - 0.02;
  return `@media ${type} and (max-width: ${maxValue}${tokenValue.unit})`;
}

/**
 * 批量获取多个断点值
 * @param names - 断点名称数组
 * @param mode - 主题模式
 * @returns CSS 断点值数组
 * @example
 *   breakpointList("sm", "md")  // ["640px", "768px"]
 */
export function breakpointList(...names: BreakpointValue[]): string[] {
  return names.map((name) => breakpoint(name));
}

/**
 * 获取所有可用的断点名称
 * @returns 断点名称数组
 */
export function listBreakpoints(): string[] {
  return getAllTokenPaths()
    .filter((path) => path.startsWith("breakpoints."))
    .map((path) => path.replace("breakpoints.", ""))
    .sort();
}

/**
 * 检查断点是否存在
 * @param name - 断点名称
 * @param mode - 主题模式
 * @returns 是否存在
 */
export function breakpointExists(name: string, mode?: ThemeMode): boolean {
  try {
    breakpoint(name, mode);
    return true;
  } catch {
    return false;
  }
}

/**
 * 获取断点的详细信息
 * @param name - 断点名称
 * @param mode - 主题模式
 * @returns 断点详细信息
 */
export function breakpointInfo(name: string, mode: ThemeMode = ".") {
  const tokenPath = `breakpoints.${name}`;
  const tokenValue = getToken(tokenPath, mode);

  if (!isDimensionToken(tokenValue)) {
    throw new Error(`Breakpoint '${name}' not found`);
  }

  return {
    name,
    path: tokenPath,
    value: tokenValue.value,
    unit: tokenValue.unit,
    cssValue: `${tokenValue.value}${tokenValue.unit}`,
    mediaQuery: mediaQuery(name, "screen", mode),
    mediaQueryDown: mediaQueryDown(name, "screen", mode),
  };
}
