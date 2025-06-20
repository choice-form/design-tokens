// ============================================================================
// Typography CSS Variables Generator
// ============================================================================

import {
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
  typographyPresets,
  type TypographyPresetKey,
} from "../tokens/typography"
import { cssVar } from "./config"

/// Generate typography CSS variables
/// @returns CSS variables string for typography tokens
export function generateTypographyVariables(): string {
  const sections: string[] = []

  // 原子级 CSS 变量

  // Font families
  const familyVars = Object.entries(fontFamilies)
    .map(([name, family]) => `  ${cssVar(`font-family-${name}`)}: ${family.join(", ")};`)
    .join("\n")

  if (familyVars) {
    sections.push(`  /* Font Families */\n${familyVars}`)
  }

  // Font weights
  const weightVars = Object.entries(fontWeights)
    .map(([name, value]) => `  ${cssVar(`font-weight-${name}`)}: ${value};`)
    .join("\n")

  if (weightVars) {
    sections.push(`  /* Font Weights */\n${weightVars}`)
  }

  // Font sizes
  const fontSizeVars = Object.entries(fontSizes)
    .map(([name, value]) => `  ${cssVar(`font-size-${name}`)}: ${value};`)
    .join("\n")

  if (fontSizeVars) {
    sections.push(`  /* Font Sizes */\n${fontSizeVars}`)
  }

  // Line heights
  const lineHeightVars = Object.entries(lineHeights)
    .map(([name, value]) => `  ${cssVar(`line-height-${name}`)}: ${value};`)
    .join("\n")

  if (lineHeightVars) {
    sections.push(`  /* Line Heights */\n${lineHeightVars}`)
  }

  // Letter spacings
  const letterSpacingVars = Object.entries(letterSpacings)
    .map(([name, value]) => `  ${cssVar(`letter-spacing-${name}`)}: ${value};`)
    .join("\n")

  if (letterSpacingVars) {
    sections.push(`  /* Letter Spacings */\n${letterSpacingVars}`)
  }

  // Typography presets 不再生成转发变量
  // typography() 函数直接引用原子级变量

  return sections.join("\n\n")
}

/// Generate typography preset as CSS class
/// @param name - Typography preset name
/// @returns CSS class string
/// @example
///   generateTypographyClass("body-large")
///   // Returns: ".text-body-large { font-family: var(--cdt-font-family-default); ... }"
export function generateTypographyClass(name: TypographyPresetKey): string {
  if (!(name in typographyPresets)) {
    throw new Error(`Typography preset '${name}' does not exist`)
  }

  const preset = typographyPresets[name]

  return `.text-${name} {
  font-family: ${cssVar(`font-family-${preset.fontFamily}`)};
  font-size: ${cssVar(`font-size-${preset.fontSize}`)};
  font-weight: ${cssVar(`font-weight-${preset.fontWeight}`)};
  line-height: ${cssVar(`line-height-${preset.lineHeight}`)};
  letter-spacing: ${cssVar(`letter-spacing-${preset.letterSpacing}`)};
}`
}

/// Generate all typography preset classes
/// @returns CSS string with all typography classes
export function generateAllTypographyClasses(): string {
  const presetNames = Object.keys(typographyPresets) as TypographyPresetKey[]

  return presetNames.map((name) => generateTypographyClass(name)).join("\n\n")
}
