// ============================================================================
// Typography Utility Functions
// ============================================================================

import { cssVarRef } from "../css-variables/config"
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  typographyPresets,
  type FontSizeKey,
  type FontFamilyKey,
  type FontWeightKey,
  type LineHeightKey,
  type LetterSpacingKey,
  type TypographyPresetKey,
  type TypographyKey,
  type TypographyPreset,
} from "../tokens/typography"

// ============================================================================
// Typography Preset Functions
// ============================================================================

/// Apply complete typography preset
/// @param name - Typography preset name
/// @returns CSS properties object for the typography preset
/// @example
///   typography("body-large")
///   typography("heading-display")
export function typography(name: TypographyPresetKey): Record<string, string> {
  if (!(name in typographyPresets)) {
    throw new Error(`Typography preset '${name}' does not exist`)
  }

  const preset = typographyPresets[name]

  return {
    fontFamily: cssVarRef(`font-family-${preset.fontFamily}`),
    fontSize: cssVarRef(`font-size-${preset.fontSize}`),
    fontWeight: cssVarRef(`font-weight-${preset.fontWeight}`),
    lineHeight: cssVarRef(`line-height-${preset.lineHeight}`),
    letterSpacing: cssVarRef(`letter-spacing-${preset.letterSpacing}`),
  }
}

/// Apply typography preset as CSS string
/// @param name - Typography preset name
/// @returns CSS string ready for use
/// @example
///   typographyStyles("body-large")
export function typographyStyles(name: TypographyPresetKey): string {
  const styles = typography(name)

  return Object.entries(styles)
    .map(([property, value]) => {
      const cssProperty = property.replace(/([A-Z])/g, "-$1").toLowerCase()
      return `${cssProperty}: ${value}`
    })
    .join("; ")
}

// ============================================================================
// Individual Property Functions
// ============================================================================

/// Get font family value
/// @param name - Font family name
/// @param asVar - Whether to return CSS variable, default true
/// @returns Font family value or CSS variable
/// @example
///   fontFamily("default")        // "var(--cdt-font-family-default)"
///   fontFamily("mono", false)    // "Roboto Mono, SFMono-Regular, ..."
export function fontFamily(name: FontFamilyKey, asVar: boolean = true): string {
  if (asVar) {
    return cssVarRef(`font-family-${name}`)
  }

  if (name in fontFamilies) {
    const family = fontFamilies[name]
    return family.join(", ")
  }

  throw new Error(`Font family '${name}' does not exist`)
}

/// Get font weight value
/// @param name - Font weight name
/// @param asVar - Whether to return CSS variable, default true
/// @returns Font weight value or CSS variable
/// @example
///   fontWeight("strong")        // "var(--cdt-font-weight-strong)"
///   fontWeight("heavy", false)  // "550"
export function fontWeight(name: FontWeightKey, asVar: boolean = true): string {
  if (asVar) {
    return cssVarRef(`font-weight-${name}`)
  }

  if (name in fontWeights) {
    return String(fontWeights[name])
  }

  throw new Error(`Font weight '${name}' does not exist`)
}

/// Get font size value
/// @param name - Font size name
/// @param asVar - Whether to return CSS variable, default true
/// @returns Font size value or CSS variable
/// @example
///   fontSize("md")           // "var(--cdt-font-size-md)"
///   fontSize("lg", false)    // "0.9375rem"
export function fontSize(name: FontSizeKey, asVar: boolean = true): string {
  if (asVar) {
    return cssVarRef(`font-size-${name}`)
  }

  if (name in fontSizes) {
    return fontSizes[name]
  }

  throw new Error(`Font size '${name}' does not exist`)
}

/// Get line height value
/// @param name - Line height name
/// @param asVar - Whether to return CSS variable, default true
/// @returns Line height value or CSS variable
/// @example
///   lineHeight("normal")        // "var(--cdt-line-height-normal)"
///   lineHeight("relaxed", false) // "1.5625rem"
export function lineHeight(name: LineHeightKey, asVar: boolean = true): string {
  if (asVar) {
    return cssVarRef(`line-height-${name}`)
  }

  if (name in lineHeights) {
    const value = lineHeights[name]
    return typeof value === "number" ? String(value) : value
  }

  throw new Error(`Line height '${name}' does not exist`)
}

/// Get letter spacing value
/// @param name - Letter spacing name
/// @param asVar - Whether to return CSS variable, default true
/// @returns Letter spacing value or CSS variable
/// @example
///   letterSpacing("normal")      // "var(--cdt-letter-spacing-normal)"
///   letterSpacing("wide", false)  // "0.03125rem"
export function letterSpacing(name: LetterSpacingKey, asVar: boolean = true): string {
  if (asVar) {
    return cssVarRef(`letter-spacing-${name}`)
  }

  if (name in letterSpacings) {
    return letterSpacings[name]
  }

  throw new Error(`Letter spacing '${name}' does not exist`)
}

// ============================================================================
// Utility Functions
// ============================================================================

/// Get all available typography preset names
/// @returns Array of typography preset names
export function getTypographyPresets(): TypographyPresetKey[] {
  return Object.keys(typographyPresets) as TypographyPresetKey[]
}

/// Get typography preset definition
/// @param name - Typography preset name
/// @returns Typography preset definition
export function getTypographyPreset(name: TypographyPresetKey): TypographyPreset {
  if (!(name in typographyPresets)) {
    throw new Error(`Typography preset '${name}' does not exist`)
  }

  return typographyPresets[name]
}

/// Check if a typography key exists
/// @param name - Typography key to check
/// @returns True if key exists
export function hasTypographyKey(name: string): name is TypographyKey {
  return (
    name in fontFamilies ||
    name in fontWeights ||
    name in fontSizes ||
    name in lineHeights ||
    name in letterSpacings ||
    name in typographyPresets
  )
}
