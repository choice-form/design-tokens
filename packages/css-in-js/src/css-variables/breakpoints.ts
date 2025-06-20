// ============================================================================
// Breakpoint CSS 变量生成器
// ============================================================================

import { breakpoints, containerMaxWidths } from "../tokens/breakpoints"
import { cssVar } from "./config"

/// 生成断点相关的 CSS 变量
/// @returns CSS 变量字符串
export function generateBreakpointVariables(): string {
  const breakpointVars = Object.entries(breakpoints)
    .map(([name, value]) => {
      const remValue = value / 16
      return `  ${cssVar(`breakpoint-${name}`)}: ${remValue}rem;`
    })
    .join("\n")

  const containerVars = Object.entries(containerMaxWidths)
    .map(([name, value]) => {
      if (value === "none") {
        return `  ${cssVar(`container-${name}`)}: ${value};`
      }
      const remValue = value / 16
      return `  ${cssVar(`container-${name}`)}: ${remValue}rem;`
    })
    .join("\n")

  return `
  /* Breakpoint Variables */
${breakpointVars}

  /* Container Variables */
${containerVars}`
}
