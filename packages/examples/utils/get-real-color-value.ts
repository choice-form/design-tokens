import {
  color,
  hasColor,
  colorHex,
  colorRgb,
  getAllAvailableColors,
} from "@choiceform/design-tokens";
import type { ColorPath } from "@choiceform/design-tokens";
import tinycolor from "tinycolor2";

export type ColorType =
  | "semantic"
  | "extended-semantic"
  | "base-light"
  | "base-dark";

/**
 * 获取真实的颜色值（用于文档展示）
 * @param colorKey - 颜色键名（如 "background.accent" 或 "blue.500"）
 * @param opacity - 不透明度
 * @param colorType - 颜色类型
 * @param mode - 主题模式
 * @returns 颜色值信息
 */
export function getRealColorValue(
  colorKey: string,
  opacity: number = 1,
  colorType: ColorType = "semantic",
  mode: "light" | "dark" = "light"
) {
  try {
    // 修复：将主题模式参数转换为正确格式
    const themeMode = mode === "light" ? "." : "dark";

    // 使用新的 color 函数获取 CSS 变量（类型断言以避免严格类型检查）
    const cssValue =
      opacity < 1
        ? color(colorKey as ColorPath, opacity, themeMode)
        : color(colorKey as ColorPath, 1, themeMode);

    // 直接从 Terrazzo tokens 获取颜色值
    let hexValue = "#000000";
    let rgbValue = "rgb(0, 0, 0)";
    let isValid = true;

    try {
      // 修复：调整 colorHex 和 colorRgb 的参数顺序
      hexValue = colorHex(colorKey as ColorPath, themeMode);
      const [r, g, b] = colorRgb(colorKey as ColorPath, themeMode);
      rgbValue = `rgb(${r}, ${g}, ${b})`;
    } catch (error) {
      // 如果找不到颜色，标记为无效
      console.warn(
        `Color "${colorKey}" not found in tokens for mode "${mode}"`
      );
      isValid = false;

      // 仅在确实找不到时使用极简的 fallback
      if (colorKey.includes("white") || colorKey.includes("default")) {
        hexValue = "#ffffff";
        rgbValue = "rgb(255, 255, 255)";
      } else if (colorKey.includes("black") || colorKey.includes("inverse")) {
        hexValue = "#000000";
        rgbValue = "rgb(0, 0, 0)";
      } else {
        // 其他情况使用中性灰色作为 fallback
        hexValue = "#6c757d";
        rgbValue = "rgb(108, 117, 125)";
      }
    }

    // 带透明度的值
    const rgbaValue =
      opacity < 1
        ? tinycolor(hexValue).setAlpha(opacity).toRgbString()
        : rgbValue;

    return {
      key: colorKey,
      opacity,
      colorType,
      mode,
      hexValue,
      rgbValue,
      rgbaValue,
      cssValue, // 这是CSS变量，是实际使用的值
      isValid,
    };
  } catch (error) {
    console.warn(`Failed to get color value for ${colorKey}:`, error);
    return {
      key: colorKey,
      opacity,
      colorType,
      mode,
      hexValue: "#000000",
      rgbValue: "rgb(0, 0, 0)",
      rgbaValue: "rgba(0, 0, 0, 0)",
      cssValue: "transparent",
      isValid: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * 获取可用的颜色别名（新的实现）
 */
export function getAvailableColorAliases(): string[] {
  try {
    return getAllAvailableColors();
  } catch (error) {
    console.warn("Failed to get available colors:", error);
    return [];
  }
}

/**
 * 按类别获取颜色
 */
export function getColorsByType(
  category: "background" | "foreground" | "boundary" | "icon"
): string[] {
  try {
    return getAllAvailableColors();
  } catch (error) {
    console.warn(`Failed to get colors for category ${category}:`, error);
    return [];
  }
}

/**
 * 检查颜色键是否有效
 */
export function isValidColorKey(colorKey: string): boolean {
  // 修复：为 hasColor 函数提供正确的参数
  return hasColor(colorKey as ColorPath, ".");
}

/**
 * 获取颜色数据的辅助信息
 */
export function getColorInfo(colorKey: string) {
  // 检查是否为语义颜色
  const isSemanticColor =
    colorKey.startsWith("background.") ||
    colorKey.startsWith("foreground.") ||
    colorKey.startsWith("boundary.") ||
    colorKey.startsWith("icon.");

  // 检查是否为标准色阶
  const isStandardColor = [
    "blue",
    "green",
    "red",
    "yellow",
    "purple",
    "pink",
    "teal",
    "orange",
    "violet",
    "gray",
  ].some((c) => colorKey.startsWith(`${c}.`));

  // 检查是否为 pale 颜色
  const isPaleColor = colorKey.includes("-pale.");

  // 大多数颜色都支持主题模式
  const hasThemeSupport = isSemanticColor || isStandardColor || isPaleColor;

  return {
    tokenKey: colorKey,
    hasLightMode: hasThemeSupport,
    hasDarkMode: hasThemeSupport,
    isThemed: hasThemeSupport,
    isSemanticColor,
    isStandardColor,
    isPaleColor,
  };
}

/**
 * 颜色路径映射 - 帮助从旧格式迁移到新格式
 */
export const COLOR_PATH_MIGRATION_MAP: Record<string, string> = {
  // 背景颜色
  "bg.default": "background.default",
  "bg.secondary": "background.secondary",
  "bg.tertiary": "background.tertiary",
  "bg.hover": "background.hover",
  "bg.selected": "background.selected",
  "bg.disabled": "background.disabled",
  "bg.inverse": "background.inverse",
  "bg.accent": "background.accent",
  "bg.accent-hover": "background.accent-hover",
  "bg.success": "background.success",
  "bg.warning": "background.warning",
  "bg.danger": "background.danger",

  // 前景颜色
  "fg.default": "foreground.default",
  "fg.secondary": "foreground.secondary",
  "fg.tertiary": "foreground.tertiary",
  "fg.disabled": "foreground.disabled",
  "fg.inverse": "foreground.inverse",
  "fg.accent": "foreground.accent",
  "fg.on-accent": "foreground.on-accent",
  "fg.success": "foreground.success",
  "fg.warning": "foreground.warning",
  "fg.danger": "foreground.danger",

  // 边框颜色
  "bd.default": "boundary.default",
  "bd.strong": "boundary.strong",
  "bd.selected": "boundary.selected",
  "bd.selected-strong": "boundary.selected-strong",

  // 图标颜色
  "ic.default": "icon.default",
  "ic.secondary": "icon.secondary",
  "ic.tertiary": "icon.tertiary",
  "ic.disabled": "icon.disabled",
};

/**
 * 迁移颜色路径 - 将旧格式转换为新格式
 */
export function migrateColorPath(oldPath: string): string {
  return COLOR_PATH_MIGRATION_MAP[oldPath] || oldPath;
}
