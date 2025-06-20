// ============================================================================
// CSS 变量配置
// ============================================================================

/// 基础间距单位值 (对应 0.25rem = 4px)
export const baseSpacing = "0.25rem";

/// CSS 变量前缀，避免与其他库冲突
export const cssVarPrefix = "cdt-";

/// 生成带前缀的 CSS 变量名
export const cssVar = (name: string): string => `--${cssVarPrefix}${name}`;

/// 生成 CSS 变量引用
export const cssVarRef = (name: string): string => `var(${cssVar(name)})`;
