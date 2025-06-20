import { ColorPath, tokens } from "@choiceform/design-tokens";

// 基础颜色类型定义
export type ColorShade = {
  key: string;
  opacity?: number;
};

// 从 tokens 中获取所有颜色键
const getAllColorKeys = (): string[] => {
  return Object.keys(tokens).filter((key) => key.startsWith("color."));
};

// 根据颜色组分类颜色键
const getColorsByGroup = (groupName: string): string[] => {
  return getAllColorKeys()
    .filter((key) => key.startsWith(`color.${groupName}.`))
    .map((key) => key.replace("color.", ""));
};

// 获取语义颜色（background, foreground, boundary, icon）
const getSemanticColors = (category: string): string[] => {
  return getAllColorKeys()
    .filter((key) => key.startsWith(`color.${category}.`))
    .map((key) => key.replace("color.", ""));
};

// 基础颜色色阶数据
export const overviewRampsGroups: {
  name: string;
  shades: { key: ColorPath; opacity?: number }[];
}[] = [
  {
    name: "white",
    shades: [
      { key: "white", opacity: 1.0 },
      { key: "white", opacity: 0.9 },
      { key: "white", opacity: 0.8 },
      { key: "white", opacity: 0.7 },
      { key: "white", opacity: 0.6 },
      { key: "white", opacity: 0.5 },
      { key: "white", opacity: 0.4 },
      { key: "white", opacity: 0.3 },
      { key: "white", opacity: 0.2 },
      { key: "white", opacity: 0.1 },
    ],
  },
  {
    name: "black",
    shades: [
      { key: "black", opacity: 1.0 },
      { key: "black", opacity: 0.9 },
      { key: "black", opacity: 0.8 },
      { key: "black", opacity: 0.7 },
      { key: "black", opacity: 0.6 },
      { key: "black", opacity: 0.5 },
      { key: "black", opacity: 0.4 },
      { key: "black", opacity: 0.3 },
      { key: "black", opacity: 0.2 },
      { key: "black", opacity: 0.1 },
    ],
  },
  // 动态生成标准颜色组
  ...[
    "gray",
    "blue",
    "violet",
    "purple",
    "pink",
    "teal",
    "red",
    "orange",
    "yellow",
    "green",
  ].map((colorName) => ({
    name: colorName,
    shades: getColorsByGroup(colorName).map((key) => ({
      key: key as ColorPath,
    })),
  })),
];

// Pale 颜色组
export const overviewPaleGroup: {
  name: string;
  shades: { key: ColorPath; opacity?: number }[];
}[] = [
  "blue-pale",
  "violet-pale",
  "purple-pale",
  "pink-pale",
  "teal-pale",
  "red-pale",
  "orange-pale",
  "yellow-pale",
  "green-pale",
].map((colorName) => ({
  name: colorName,
  shades: getColorsByGroup(colorName).map((key) => ({
    key: key as ColorPath,
  })),
}));

// 语义颜色数据 - 从实际 tokens 中动态生成
const allSemanticColors = [
  ...getSemanticColors("background"),
  ...getSemanticColors("text"),
  ...getSemanticColors("border"),
  ...getSemanticColors("icon"),
];

export const semanticColorGroups = allSemanticColors.map(
  (colorKey: string) => ({
    name: colorKey,
    colorKey: colorKey,
  })
);

// 背景层级颜色 - 基础背景色
const backgroundColors = getSemanticColors("background");
export const backgroundHierarchyGroups = backgroundColors
  .filter(
    (colorKey: string) =>
      colorKey === "background.default" ||
      colorKey === "background.secondary" ||
      colorKey === "background.tertiary"
  )
  .map((colorKey: string) => ({
    name: colorKey,
    colorKey: colorKey,
  }));

// 背景交互状态颜色
export const backgroundInteractionGroups = backgroundColors
  .filter(
    (colorKey: string) =>
      colorKey.includes("hover") ||
      colorKey.includes("selected") ||
      colorKey.includes("disabled")
  )
  .map((colorKey: string) => ({
    name: colorKey,
    colorKey: colorKey,
  }));

// 语义色调背景颜色
export const semanticHuesBgGroups = backgroundColors
  .filter((colorKey: string) => !colorKey.includes("secondary"))
  .filter((colorKey: string) => !colorKey.includes("hover"))
  .filter(
    (colorKey: string) =>
      colorKey.includes("accent") ||
      colorKey.includes("success") ||
      colorKey.includes("warning") ||
      colorKey.includes("danger") ||
      colorKey.includes("assistive") ||
      colorKey.includes("component")
  )
  .map((colorKey: string) => ({
    name: colorKey,
    colorKey: colorKey,
  }));

// 语义背景颜色概览
export const overviewSemanticGroups = backgroundColors
  .filter((colorKey: string) => !colorKey.includes("hover"))
  .filter((colorKey: string) => !colorKey.includes("secondary"))
  .filter((colorKey: string) => !colorKey.includes("menu"))
  .filter((colorKey: string) => !colorKey.includes("toolbar"))
  .map((colorKey: string) => ({
    name: colorKey,
    colorKey: colorKey,
  }));

// 文本基础颜色
const textColors = getSemanticColors("text");
export const textBasicGroups = textColors
  .filter(
    (colorKey: string) =>
      colorKey === "text.default" ||
      colorKey === "text.secondary" ||
      colorKey === "text.tertiary" ||
      colorKey === "text.disabled"
  )
  .map((colorKey: string) => ({
    name: colorKey,
    colorKey: colorKey,
  }));

// 文本着色颜色
export const textTintedGroups = textColors
  .filter(
    (colorKey: string) =>
      colorKey.includes("accent") ||
      colorKey.includes("success") ||
      colorKey.includes("warning") ||
      colorKey.includes("danger") ||
      colorKey.includes("assistive") ||
      colorKey.includes("component")
  )
  .filter((colorKey: string) => !colorKey.includes("on-"))
  .map((colorKey: string) => ({
    name: colorKey,
    colorKey: colorKey,
  }));

// 对比文本颜色
export const textAgainstGroups = textColors
  .filter((colorKey: string) => colorKey.includes("on-"))
  .map((colorKey: string) => ({
    name: colorKey,
    colorKey: colorKey,
  }));

// 图标颜色
const iconColors = getSemanticColors("icon");
export const iconGroups = iconColors.map((colorKey: string) => ({
  name: colorKey,
  colorKey: colorKey,
}));

// 边框颜色
const boundaryColors = getSemanticColors("border");

// 默认边框颜色
export const defaultBorderGroups = boundaryColors
  .filter((colorKey: string) => colorKey.includes("default"))
  .map((colorKey: string) => ({
    name: colorKey,
    colorKey: colorKey,
  }));

// 选择边框颜色
export const selectionBorderGroups = boundaryColors
  .filter((colorKey: string) => colorKey.includes("selected"))
  .map((colorKey: string) => ({
    name: colorKey,
    colorKey: colorKey,
  }));

// 特殊边框颜色
export const menuBorderStrongGroups = boundaryColors
  .filter(
    (colorKey: string) =>
      colorKey.includes("menu") || colorKey.includes("toolbar")
  )
  .map((colorKey: string) => ({
    name: colorKey,
    colorKey: colorKey,
  }));

// 导出一个函数来获取所有可用的颜色键（用于调试）
export const getAllAvailableColors = (): string[] => {
  return getAllColorKeys().map((key) => key.replace("color.", ""));
};

// 导出一个函数来按类别获取颜色
export const getColorsByCategory = (category: string): string[] => {
  return getSemanticColors(category);
};
