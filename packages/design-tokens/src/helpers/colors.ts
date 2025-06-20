// ============================================================================
// Color Helper Functions - 基于 Terrazzo 的简洁颜色系统
// ============================================================================

import type { ColorPath, ColorAlpha } from "../types/helpers";
// @ts-ignore - tokens.js 由 Terrazzo 在构建时生成
import { token, tokens } from "../tokens.js";

/**
 * 颜色辅助函数 - 返回包装在 rgba() 中的 CSS 变量
 *
 * @param path - 颜色 token 路径，如 'blue.500' 或 'background.default'
 * @param alpha - 可选的透明度值 (0-1)
 * @param mode - 可选的主题模式 ('light' | 'dark' | '.')，默认为 '.'
 * @returns CSS 颜色值，格式为 rgba(var(--cdt-color-xxx))
 *
 * @example
 * color('blue.500')                    // "rgba(var(--cdt-color-blue-500))"
 * color('blue.500', 0.8)               // "rgba(var(--cdt-color-blue-500), 0.8)"
 * color('blue.500', 1, 'dark')         // "rgba(var(--cdt-color-blue-500))" - 深色模式
 * color('background.default')          // "rgba(var(--cdt-color-background-default))"
 */
export function color(
  path: ColorPath,
  alpha?: ColorAlpha,
  mode: string = "."
): string {
  // 基本验证
  if (!path || typeof path !== "string") {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[design-tokens] Invalid color path:", path);
    }
    return `rgba(0, 0, 0, ${alpha ?? 1})`;
  }

  // 标准化路径 - 确保以 'color.' 开头
  const tokenPath = path.startsWith("color.") ? path : `color.${path}`;

  // 限制透明度范围
  const normalizedAlpha =
    alpha !== undefined ? Math.max(0, Math.min(1, alpha)) : undefined;

  // 验证 token 是否存在（仅在开发模式）
  if (process.env.NODE_ENV !== "production") {
    const tokenValue = token(tokenPath, mode);
    if (!tokenValue) {
      console.warn(
        `[design-tokens] Color token "${path}" (${tokenPath}:${mode}) not found`
      );
      return `rgba(0, 0, 0, ${normalizedAlpha ?? 1})`;
    }
  }

  // 生成 CSS 变量名
  const cssVarName = tokenPath.replace(/\./g, "-");
  const cssVar = `var(--cdt-${cssVarName})`;

  // 返回完整的 rgba() 表达式
  if (normalizedAlpha !== undefined) {
    return `rgba(${cssVar}, ${normalizedAlpha})`;
  }

  return `rgba(${cssVar})`;
}

/**
 * 获取原始颜色 CSS 变量（不包装 rgba，用于需要手动控制的场景）
 *
 * @param path - 颜色 token 路径
 * @returns 原始 CSS 变量引用
 *
 * @example
 * colorVar('blue.500')  // "var(--cdt-color-blue-500)"
 */
export function colorVar(path: string): string {
  const tokenPath = path.startsWith("color.") ? path : `color.${path}`;
  const cssVarName = tokenPath.replace(/\./g, "-");
  return `var(--cdt-${cssVarName})`;
}

/**
 * 获取颜色的十六进制值（静态值，用于编译时场景）
 *
 * @param path - 颜色 token 路径
 * @param mode - 主题模式，默认为 '.'
 * @returns 十六进制颜色值
 *
 * @example
 * colorHex('blue.500')        // "#0d99ff"
 * colorHex('blue.500', 'dark') // "#0c8ce9"
 */
export function colorHex(path: string, mode: string = "."): string {
  const tokenPath = path.startsWith("color.") ? path : `color.${path}`;
  const tokenValue = token(tokenPath, mode);

  if (tokenValue?.hex) {
    return tokenValue.hex;
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[design-tokens] Color hex for "${path}" (${tokenPath}:${mode}) not found`
    );
  }

  return "#000000";
}

/**
 * 获取颜色的 RGB 数值数组（静态值，用于编译时场景）
 *
 * @param path - 颜色 token 路径
 * @param mode - 主题模式，默认为 '.'
 * @returns RGB 数值数组 [r, g, b]
 *
 * @example
 * colorRgb('blue.500')        // [13, 153, 255]
 * colorRgb('blue.500', 'dark') // [12, 140, 233]
 */
export function colorRgb(
  path: string,
  mode: string = "."
): [number, number, number] {
  const tokenPath = path.startsWith("color.") ? path : `color.${path}`;
  const tokenValue = token(tokenPath, mode);

  if (tokenValue?.components && Array.isArray(tokenValue.components)) {
    const [r, g, b] = tokenValue.components;
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[design-tokens] Color RGB for "${path}" (${tokenPath}:${mode}) not found`
    );
  }

  return [0, 0, 0];
}

/**
 * 检查颜色 token 是否存在
 *
 * @param path - 颜色 token 路径
 * @param mode - 主题模式，默认为 '.'
 * @returns 是否存在该颜色 token
 */
export function hasColor(path: string, mode: string = "."): boolean {
  if (!path || typeof path !== "string") {
    return false;
  }

  const tokenPath = path.startsWith("color.") ? path : `color.${path}`;
  const tokenValue = token(tokenPath, mode);

  return !!tokenValue;
}

/**
 * 获取颜色 token 的完整原始数据
 *
 * @param path - 颜色 token 路径
 * @param mode - 主题模式，默认为 '.'
 * @returns Terrazzo token 的完整数据对象
 *
 * @example
 * getColorToken('blue.500')
 * // Returns: { colorSpace: "srgb", components: [0.051, 0.6, 1], alpha: 1, hex: "#0d99ff" }
 */
export function getColorToken(path: string, mode: string = ".") {
  const tokenPath = path.startsWith("color.") ? path : `color.${path}`;
  return token(tokenPath, mode);
}

/**
 * 获取所有可用的颜色路径（不包含 color. 前缀）
 *
 * @returns 所有颜色路径的数组
 *
 * @example
 * getAllAvailableColors() // ["blue.500", "background.default", ...]
 */
export function getAllAvailableColors(): string[] {
  return Object.keys(tokens)
    .filter((key) => key.startsWith("color."))
    .map((key) => key.replace("color.", ""));
}

/**
 * 按类别获取颜色路径
 *
 * @param category - 颜色类别
 * @returns 该类别下的颜色路径数组
 *
 * @example
 * getColorsByCategory('background') // ["background.default", "background.accent", ...]
 */
export function getColorsByCategory(category: string): string[] {
  return Object.keys(tokens)
    .filter((key) => key.startsWith(`color.${category}.`))
    .map((key) => key.replace("color.", ""));
}

// 重新导出 Terrazzo 的 token 函数，用于高级用法
export { token };

// ============================================================================
// 使用指南：
//
// 1. 推荐的基本用法：
//    color('blue.500')                // 生成 CSS 变量
//    colorHex('blue.500')             // 获取静态十六进制值
//
// 2. 直接使用 Terrazzo token 函数：
//    token('color.blue.500')          // 获取 token 原始数据
//
// 3. 主题模式支持：
//    color('blue.500', 1, 'dark')     // 深色模式
//    colorHex('blue.500', 'light')    // 浅色模式
//
// 4. 获取颜色列表：
//    getAllAvailableColors()          // 获取所有颜色
//    getColorsByCategory('background') // 获取背景颜色
// ============================================================================
