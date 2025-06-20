// ============================================================================
// CSS 变量生成器主入口
// ============================================================================

import {
  baseColorsLight,
  baseColorsDark,
  paleColors,
  semanticColorsLight,
  semanticColorsDark,
  extendedSemanticColors,
} from "../tokens/colors"
import { shadowsLight, shadowsDark, semanticShadows, hardShadows } from "../tokens/shadows"
// Typography imports removed - generateTypographyVariables now handles its own imports
import { zindexValues } from "../tokens/zindex"
import { radiusValues } from "../tokens/radius"
import { generateColorVariables } from "./colors"
import { generateShadowVariables } from "./shadows"
import { generateTypographyVariables } from "./typography"
import { generateZindexVariables } from "./zindex"
import { generateRadiusVariables } from "./radius"
import { generateBreakpointVariables } from "./breakpoints"
import { baseSpacing, cssVar } from "./config"

/// 生成所有 CSS 自定义属性的字符串
/// @param theme - 主题名称，默认为 'default'
/// @returns CSS 字符串
export function generateCssVariables(theme: string = "default"): string {
  // 基础变量
  const baseVars = `
  /* Base Variables */
  ${cssVar("spacing")}: ${baseSpacing};`

  // 断点变量
  const breakpointVars = generateBreakpointVariables()

  // 颜色变量 - Light Theme
  const lightColorVars = generateColorVariables(
    baseColorsLight,
    paleColors,
    semanticColorsLight,
    extendedSemanticColors,
  )

  // 阴影变量 - Light Theme
  const lightShadowVars = generateShadowVariables(shadowsLight, semanticShadows, hardShadows)

  // 字体变量
  const typographyVars = generateTypographyVariables()

  // Z-Index 变量
  const zindexVars = generateZindexVariables(zindexValues)

  // 圆角变量
  const radiusVars = generateRadiusVariables(radiusValues)

  return [
    baseVars,
    breakpointVars,
    "  /* Color Variables - Light Theme */",
    lightColorVars,
    "  /* Shadow Variables - Light Theme */",
    lightShadowVars,
    "  /* Typography Variables */",
    typographyVars,
    "  /* Z-Index Variables */",
    zindexVars,
    "  /* Radius Variables */",
    radiusVars,
  ].join("\n\n")
}

/// 生成暗色主题的 CSS 变量
/// @returns CSS 字符串
export function generateDarkThemeCssVariables(): string {
  const darkColorVars = generateColorVariables(
    baseColorsDark,
    paleColors,
    semanticColorsDark,
    extendedSemanticColors,
  )

  // 阴影变量 - Dark Theme
  const darkShadowVars = generateShadowVariables(shadowsDark, semanticShadows, hardShadows)

  return [
    "  /* Color Variables - Dark Theme */",
    darkColorVars,
    "  /* Shadow Variables - Dark Theme */",
    darkShadowVars,
  ].join("\n\n")
}

/// 生成完整的 CSS 变量定义（包含主题切换）
/// @param theme - 主题名称，默认为 'default'
/// @returns 完整的 CSS 字符串
export function generateFullCssVariables(theme: string = "default"): string {
  const rootVars = generateCssVariables(theme)
  const darkVars = generateDarkThemeCssVariables()

  return `
:root {
${rootVars}
}

.dark,
[data-theme="dark"] {
${darkVars}
}
`.trim()
}

/// 主题切换支持
/// @param theme - 主题名称
/// @param selector - 主题选择器，默认为 data 属性
/// @param customVars - 自定义变量
/// @returns CSS 字符串
export function generateThemeVariables(
  theme: string,
  selector: string = `[data-theme="${theme}"]`,
  customVars: Record<string, string> = {},
): string {
  const customVarsStr = Object.entries(customVars)
    .map(([name, value]) => `  ${cssVar(name)}: ${value};`)
    .join("\n")

  return `
${selector} {
${customVarsStr}
}
`.trim()
}

// 导出配置
export { baseSpacing, cssVar, cssVarRef } from "./config"
