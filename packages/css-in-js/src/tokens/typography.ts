// ============================================================================
// 原子级字体族定义
// ============================================================================
export const fontFamilies = {
  default: [
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "SFProLocalRange",
  ],
  display: [
    "Whyte",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
  ],
  mono: [
    "Roboto Mono",
    "Monaco",
    "Courier New",
    "SFMono-Regular",
    "Menlo",
    "Consolas",
    "monospace",
  ],
} as const

// ============================================================================
// 原子级字体重量定义
// ============================================================================
export const fontWeights = {
  light: 400, // Figma display字体使用
  default: 450,
  medium: 450,
  semibold: 500, // Figma body-small-strong特殊情况使用
  strong: 550,
  heavy: 550,
} as const

// ============================================================================
// 原子级字体大小定义 (语义化命名)
// ============================================================================
export const fontSizes = {
  xs: "0.5625rem", // 9px
  sm: "0.6875rem", // 11px
  md: "0.8125rem", // 13px
  lg: "0.9375rem", // 15px
  xl: "1.5rem", // 24px
  "2xl": "3rem", // 48px
} as const

// ============================================================================
// 原子级行高定义 (语义化命名)
// ============================================================================
export const lineHeights = {
  tight: "0.875rem", // 14px
  snug: "1rem", // 16px
  normal: "1.375rem", // 22px
  relaxed: "1.5625rem", // 25px
  loose: "2rem", // 32px
  "extra-loose": "3.5rem", // 56px
} as const

// ============================================================================
// 原子级字符间距定义 (基于Figma精确值)
// ============================================================================
export const letterSpacings = {
  "body-large": "-0.002rem",
  "body-medium": "0.00344rem",
  "body-small": "0.00281rem",
  "body-small-strong": "0.016875rem",
  "heading-large": "-0.0255rem",
  "heading-medium": "-0.00469rem",
  "heading-small": "-0.002rem",
  display: "-0.09rem",
} as const

// ============================================================================
// 语义级 Typography Presets - Body Text
// ============================================================================
export const bodyTypography = {
  "body-large": {
    fontFamily: "default",
    fontSize: "md",
    fontWeight: "default",
    lineHeight: "normal",
    letterSpacing: "body-large",
  },
  "body-large-strong": {
    fontFamily: "default",
    fontSize: "md",
    fontWeight: "strong",
    lineHeight: "normal",
    letterSpacing: "body-large",
  },
  "body-medium": {
    fontFamily: "default",
    fontSize: "sm",
    fontWeight: "medium",
    lineHeight: "snug",
    letterSpacing: "body-medium",
  },
  "body-medium-strong": {
    fontFamily: "default",
    fontSize: "sm",
    fontWeight: "heavy",
    lineHeight: "snug",
    letterSpacing: "body-medium",
  },
  "body-small": {
    fontFamily: "default",
    fontSize: "xs",
    fontWeight: "default",
    lineHeight: "tight",
    letterSpacing: "body-small",
  },
  "body-small-strong": {
    fontFamily: "default",
    fontSize: "xs",
    fontWeight: "strong",
    lineHeight: "tight",
    letterSpacing: "body-small-strong",
  },
} as const

// ============================================================================
// 语义级 Typography Presets - Headings
// ============================================================================
export const headingTypography = {
  "heading-display": {
    fontFamily: "display",
    fontSize: "2xl",
    fontWeight: "light",
    lineHeight: "extra-loose",
    letterSpacing: "display",
  },
  "heading-large": {
    fontFamily: "default",
    fontSize: "xl",
    fontWeight: "heavy",
    lineHeight: "loose",
    letterSpacing: "heading-large",
  },
  "heading-medium": {
    fontFamily: "default",
    fontSize: "lg",
    fontWeight: "heavy",
    lineHeight: "relaxed",
    letterSpacing: "heading-medium",
  },
  "heading-small": {
    fontFamily: "default",
    fontSize: "md",
    fontWeight: "heavy",
    lineHeight: "normal",
    letterSpacing: "heading-small",
  },
} as const

// ============================================================================
// 组合所有 Typography Presets
// ============================================================================
export const typographyPresets = {
  ...headingTypography,
  ...bodyTypography,
} as const

// ============================================================================
// 类型定义
// ============================================================================
export type FontFamilyKey = keyof typeof fontFamilies
export type FontWeightKey = keyof typeof fontWeights
export type FontSizeKey = keyof typeof fontSizes
export type LineHeightKey = keyof typeof lineHeights
export type LetterSpacingKey = keyof typeof letterSpacings
export type BodyTypographyKey = keyof typeof bodyTypography
export type HeadingTypographyKey = keyof typeof headingTypography
export type TypographyPresetKey = keyof typeof typographyPresets
// 组合类型
export type TypographyKey =
  | FontFamilyKey
  | FontWeightKey
  | FontSizeKey
  | LineHeightKey
  | LetterSpacingKey
  | TypographyPresetKey

// Typography preset 接口
export interface TypographyPreset {
  fontFamily: FontFamilyKey
  fontSize: FontSizeKey
  fontWeight: FontWeightKey
  letterSpacing: LetterSpacingKey
  lineHeight: LineHeightKey
}
