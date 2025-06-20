// ============================================================================
// 阴影令牌定义
// ============================================================================

type ShadowValue = string

// ============================================================================
// 基础阴影定义 - Light Theme
// ============================================================================
export const shadowsLight = {
  // 基础阴影
  light: [
    "0px 0px 2px 0px rgb(0 0 0 / 0.02)",
    "0px 1px 3px 0px rgb(0 0 0 / 0.1)",
    "0px 0px 0.5px 0px rgb(0 0 0 / 0.3)",
  ],
  shapes: ["0px 1px 3px 0px rgba(0 0 0 / 0.15)", "0px 0px 0.5px 0px rgba(0 0 0 / 0.3)"],
  stickies: [
    "0px 1px 3px 0px rgba(0 0 0 / 0.1)",
    "0px 3px 8px 0px rgba(0 0 0 / 0.1)",
    "0px 0px 0.5px 0px rgba(0 0 0 / 0.18)",
  ],
  tooltip: [
    "0px 1px 3px 0px rgba(0 0 0 / 0.1)",
    "0px 5px 12px 0px rgba(0 0 0 / 0.13)",
    "0px 0px 0.5px 0px rgba(0 0 0 / 0.15)",
  ],
  menu: [
    "0px 2px 5px 0px rgba(0 0 0 / 0.15)",
    "0px 10px 16px 0px rgba(0 0 0 / 0.12)",
    "0px 0px 0.5px 0px rgba(0 0 0 / 0.12)",
  ],
  modals: [
    "0px 2px 5px 0px rgba(0 0 0 / 0.15)",
    "0px 10px 24px 0px rgba(0 0 0 / 0.18)",
    "0px 0px 0.5px 0px rgba(0 0 0 / 0.08)",
  ],
} as const

// ============================================================================
// 基础阴影定义 - Dark Theme
// ============================================================================
export const shadowsDark = {
  // 基础阴影 - Dark theme 有更复杂的效果，包括 inset 高光
  light: [
    "0px 0.5px 0px 0px rgba(255 255 255 / 0.1) inset",
    "0px 0px 2px 0px rgb(0 0 0 / 0.04)",
    "0px 1px 3px 0px rgb(0 0 0 / 0.1)",
    "0px 0px 0.5px 0px rgb(0 0 0 / 0.8)",
  ],
  shapes: [
    "0px 0.5px 0px 0px rgba(255 255 255 / 0.1) inset",
    "0px 0px 0.5px 0px rgba(255 255 255 / 0.3) inset",
    "0px 0px 0.5px 0px rgba(0 0 0 / 0.5)",
    "0px 1px 3px 0px rgba(0 0 0 / 0.4)",
  ],
  stickies: [
    "0px 0.5px 0px 0px rgba(255 255 255 / 0.08) inset",
    "0px 0px 0.5px 0px rgba(255 255 255 / 0.3) inset",
    "0px 1px 3px 0px rgba(0 0 0 / 0.35)",
    "0px 3px 8px 0px rgba(0 0 0 / 0.4)",
  ],
  tooltip: [
    "0px 0.5px 0px 0px rgba(255 255 255 / 0.08) inset",
    "0px 0px 0.5px 0px rgba(255 255 255 / 0.3) inset",
    "0px 1px 3px rgba(0 0 0 / 0.5)",
    "0px 5px 12px rgba(0 0 0 / 0.35)",
  ],
  menu: [
    "0px 0.5px 0px 0px rgba(255 255 255 / 0.08) inset",
    "0px 0px 0.5px 0px rgba(255 255 255 / 0.35) inset",
    "0px 2px 5px 0px rgba(0 0 0 / 0.35)",
    "0px 10px 16px 0px rgba(0 0 0 / 0.35)",
  ],
  modals: [
    "0px 0.5px 0px 0px rgba(255 255 255 / 0.08) inset",
    "0px 0px 0.5px 0px rgba(255 255 255 / 0.35) inset",
    "0px 3px 5px 0px rgba(0 0 0 / 0.35)",
    "0px 10px 24px 0px rgba(0 0 0 / 0.45)",
  ],
} as const

// ============================================================================
// 语义阴影别名 - 不区分主题
// ============================================================================
export const semanticShadows = {
  // 基础语义阴影 - 按大小分级
  xxs: "light",
  xs: "shapes",
  sm: "stickies",
  md: "tooltip",
  lg: "menu",
  xl: "modals",
} as const

// ============================================================================
// 特殊阴影定义 - 包含颜色引用，需要动态生成
// ============================================================================
export const hardShadows = {
  focus: [
    "0px 0px 0px 1px rgb(var(--cdt-background-default))",
    "0px 0px 0px 2px rgb(var(--cdt-boundary-selected))",
  ],
  line: ["inset 0 0 0 1px rgba(var(--cdt-foreground-default), 0.1)"],
  "border-default": ["0 0 0 1px rgb(var(--cdt-boundary-default))"],
  "border-default-inset": ["0 0 0 1px rgb(var(--cdt-boundary-default)) inset"],
} as const

// 类型定义
export type ShadowLightKey = keyof typeof shadowsLight
export type ShadowDarkKey = keyof typeof shadowsDark
export type SemanticShadowKey = keyof typeof semanticShadows
export type hardShadowKey = keyof typeof hardShadows
export type ShadowKey = ShadowLightKey | SemanticShadowKey | hardShadowKey
