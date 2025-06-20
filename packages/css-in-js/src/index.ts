// ============================================================================
// Design Tokens 主入口文件
// ============================================================================

// 导出所有函数
export * from "./functions"

// 导出所有 tokens（供高级用户直接访问，排除重复的 SpacingKey）
export * from "./tokens"
export type { SpacingKey } from "./functions/spacing" // 使用 functions 版本的 SpacingKey

// 导出 CSS 变量管理（供高级用户直接访问）
export * from "./css-variables"

// 提供便捷的初始化功能
import { generateFullCssVariables, generateThemeVariables } from "./css-variables"

/// 生成主题变量
/// @param theme - 主题名称
/// @param selector - 主题选择器
/// @param customVars - 自定义变量
/// @returns CSS 字符串
/// @example
///   import { theme } from '@choiceform/design-js-tokens'
///   const darkThemeCSS = theme('dark', '.dark', {
///     'spacing': '0.2rem' // 更紧凑的间距
///   })
export function theme(
  themeName: string,
  selector?: string,
  customVars: Record<string, string> = {},
): string {
  return generateThemeVariables(themeName, selector, customVars)
}

// ============================================================================
// CSS 变量字符串导出（供各种用途）
// ============================================================================

/**
 * 获取完整的 CSS 变量字符串
 * 可以在任何 CSS-in-JS 库中使用，或者写入 CSS 文件
 *
 * @example
 * // 在 CSS-in-JS 中使用
 * import { getCssVariables } from '@choiceform/design-js-tokens'
 * const globalCSS = `:root { ${getCssVariables()} }`
 */
export const getCssVariables = generateFullCssVariables
