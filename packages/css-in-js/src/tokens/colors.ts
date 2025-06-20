// ============================================================================
// 颜色令牌定义
// ============================================================================

type RGB = [number, number, number]

// ============================================================================
// 基础颜色调色板 - Light Theme
// ============================================================================
export const baseColorsLight = {
  // 中性色
  white: [255, 255, 255] as RGB,
  black: [0, 0, 0] as RGB,
  // 灰色系
  "gray-100": [245, 245, 245] as RGB,
  "gray-200": [230, 230, 230] as RGB,
  "gray-300": [217, 217, 217] as RGB,
  "gray-400": [179, 179, 179] as RGB,
  "gray-500": [117, 117, 117] as RGB,
  "gray-600": [68, 68, 68] as RGB,
  "gray-700": [56, 56, 56] as RGB,
  "gray-800": [44, 44, 44] as RGB,
  "gray-900": [30, 30, 30] as RGB,
  "gray-950": [17, 17, 17] as RGB,
  // 蓝色系 - Light Theme
  "blue-100": [242, 249, 255] as RGB,
  "blue-200": [229, 244, 255] as RGB,
  "blue-300": [189, 227, 255] as RGB,
  "blue-400": [128, 202, 255] as RGB,
  "blue-500": [13, 153, 255] as RGB,
  "blue-600": [0, 123, 229] as RGB,
  "blue-700": [7, 104, 207] as RGB,
  "blue-800": [3, 74, 193] as RGB,
  "blue-900": [9, 48, 119] as RGB,
  "blue-950": [13, 25, 63] as RGB,
  // 紫罗兰系 - Light Theme
  "violet-100": [245, 245, 255] as RGB,
  "violet-200": [235, 235, 255] as RGB,
  "violet-300": [211, 209, 255] as RGB,
  "violet-400": [180, 178, 255] as RGB,
  "violet-500": [77, 73, 252] as RGB,
  "violet-600": [68, 61, 235] as RGB,
  "violet-700": [61, 50, 226] as RGB,
  "violet-800": [54, 32, 223] as RGB,
  "violet-900": [47, 21, 172] as RGB,
  "violet-950": [29, 18, 84] as RGB,
  // 紫色系 - Light Theme
  "purple-100": [249, 245, 255] as RGB,
  "purple-200": [241, 229, 255] as RGB,
  "purple-300": [228, 204, 255] as RGB,
  "purple-400": [217, 184, 255] as RGB,
  "purple-500": [151, 71, 255] as RGB,
  "purple-600": [134, 56, 229] as RGB,
  "purple-700": [124, 43, 218] as RGB,
  "purple-800": [104, 26, 187] as RGB,
  "purple-900": [75, 13, 135] as RGB,
  "purple-950": [45, 15, 70] as RGB,
  // 粉色系 - Light Theme
  "pink-100": [255, 240, 254] as RGB,
  "pink-200": [255, 224, 252] as RGB,
  "pink-300": [255, 189, 242] as RGB,
  "pink-400": [255, 153, 224] as RGB,
  "pink-500": [255, 36, 189] as RGB,
  "pink-600": [234, 16, 172] as RGB,
  "pink-700": [203, 11, 150] as RGB,
  "pink-800": [151, 17, 114] as RGB,
  "pink-900": [95, 17, 76] as RGB,
  "pink-950": [69, 17, 56] as RGB,
  // 青色系 - Light Theme
  "teal-100": [235, 251, 255] as RGB,
  "teal-200": [206, 240, 248] as RGB,
  "teal-300": [182, 236, 247] as RGB,
  "teal-400": [117, 215, 240] as RGB,
  "teal-500": [0, 162, 194] as RGB,
  "teal-600": [0, 135, 168] as RGB,
  "teal-700": [4, 113, 149] as RGB,
  "teal-800": [8, 90, 120] as RGB,
  "teal-900": [9, 60, 83] as RGB,
  "teal-950": [14, 47, 67] as RGB,
  // 红色系 - Light Theme
  "red-100": [255, 245, 245] as RGB,
  "red-200": [255, 226, 224] as RGB,
  "red-300": [255, 199, 194] as RGB,
  "red-400": [255, 175, 163] as RGB,
  "red-500": [242, 72, 34] as RGB,
  "red-600": [220, 52, 18] as RGB,
  "red-700": [189, 41, 21] as RGB,
  "red-800": [159, 31, 24] as RGB,
  "red-900": [119, 18, 8] as RGB,
  "red-950": [102, 14, 11] as RGB,
  // 橙色系 - Light Theme
  "orange-100": [255, 244, 229] as RGB,
  "orange-200": [255, 224, 194] as RGB,
  "orange-300": [252, 209, 156] as RGB,
  "orange-400": [255, 196, 112] as RGB,
  "orange-500": [255, 166, 41] as RGB,
  "orange-600": [252, 158, 36] as RGB,
  "orange-700": [247, 151, 34] as RGB,
  "orange-800": [221, 124, 14] as RGB,
  "orange-900": [206, 112, 18] as RGB,
  "orange-950": [138, 72, 15] as RGB,
  // 黄色系 - Light Theme
  "yellow-100": [255, 251, 235] as RGB,
  "yellow-200": [255, 241, 194] as RGB,
  "yellow-300": [255, 232, 163] as RGB,
  "yellow-400": [255, 217, 102] as RGB,
  "yellow-500": [255, 205, 41] as RGB,
  "yellow-600": [255, 194, 26] as RGB,
  "yellow-700": [250, 184, 21] as RGB,
  "yellow-800": [235, 166, 17] as RGB,
  "yellow-900": [221, 148, 14] as RGB,
  "yellow-950": [184, 98, 0] as RGB,
  // 绿色系 - Light Theme
  "green-100": [235, 255, 238] as RGB,
  "green-200": [207, 247, 211] as RGB,
  "green-300": [175, 244, 198] as RGB,
  "green-400": [133, 224, 163] as RGB,
  "green-500": [20, 174, 92] as RGB,
  "green-600": [0, 153, 81] as RGB,
  "green-700": [0, 128, 67] as RGB,
  "green-800": [3, 104, 56] as RGB,
  "green-900": [2, 70, 38] as RGB,
  "green-950": [8, 58, 35] as RGB,
} as const

// ============================================================================
// 基础颜色调色板 - Dark Theme
// ============================================================================
export const baseColorsDark = {
  // 中性色
  white: [255, 255, 255] as RGB,
  black: [0, 0, 0] as RGB,
  // 灰色系
  "gray-100": [245, 245, 245] as RGB,
  "gray-200": [230, 230, 230] as RGB,
  "gray-300": [217, 217, 217] as RGB,
  "gray-400": [179, 179, 179] as RGB,
  "gray-500": [117, 117, 117] as RGB,
  "gray-600": [68, 68, 68] as RGB,
  "gray-700": [56, 56, 56] as RGB,
  "gray-800": [44, 44, 44] as RGB,
  "gray-900": [30, 30, 30] as RGB,
  "gray-950": [17, 17, 17] as RGB,
  // 蓝色系 - Dark Theme
  "blue-100": [226, 241, 253] as RGB,
  "blue-200": [207, 233, 252] as RGB,
  "blue-300": [168, 215, 250] as RGB,
  "blue-400": [124, 196, 248] as RGB,
  "blue-500": [12, 140, 233] as RGB,
  "blue-600": [10, 109, 194] as RGB,
  "blue-700": [16, 92, 173] as RGB,
  "blue-800": [24, 69, 145] as RGB,
  "blue-900": [27, 51, 95] as RGB,
  "blue-950": [22, 30, 54] as RGB,
  // 紫罗兰系 - Dark Theme
  "violet-100": [245, 245, 255] as RGB,
  "violet-200": [230, 229, 255] as RGB,
  "violet-300": [206, 204, 255] as RGB,
  "violet-400": [185, 184, 255] as RGB,
  "violet-500": [61, 56, 245] as RGB,
  "violet-600": [59, 52, 213] as RGB,
  "violet-700": [55, 44, 201] as RGB,
  "violet-800": [57, 39, 190] as RGB,
  "violet-900": [48, 37, 121] as RGB,
  "violet-950": [29, 24, 53] as RGB,
  // 紫色系 - Dark Theme
  "purple-100": [241, 231, 254] as RGB,
  "purple-200": [227, 207, 252] as RGB,
  "purple-300": [214, 182, 251] as RGB,
  "purple-400": [209, 168, 255] as RGB,
  "purple-500": [138, 56, 245] as RGB,
  "purple-600": [122, 46, 214] as RGB,
  "purple-700": [101, 44, 168] as RGB,
  "purple-800": [80, 41, 122] as RGB,
  "purple-900": [62, 38, 84] as RGB,
  "purple-950": [31, 25, 36] as RGB,
  // 粉色系 - Dark Theme
  "pink-100": [253, 226, 251] as RGB,
  "pink-200": [252, 202, 248] as RGB,
  "pink-300": [251, 177, 237] as RGB,
  "pink-400": [252, 156, 224] as RGB,
  "pink-500": [243, 22, 176] as RGB,
  "pink-600": [208, 27, 156] as RGB,
  "pink-700": [150, 32, 122] as RGB,
  "pink-800": [104, 39, 94] as RGB,
  "pink-900": [70, 37, 62] as RGB,
  "pink-950": [35, 26, 33] as RGB,
  // 青色系 - Dark Theme
  "teal-100": [221, 247, 253] as RGB,
  "teal-200": [188, 230, 241] as RGB,
  "teal-300": [164, 226, 239] as RGB,
  "teal-400": [103, 203, 228] as RGB,
  "teal-500": [8, 135, 160] as RGB,
  "teal-600": [8, 118, 145] as RGB,
  "teal-700": [10, 91, 118] as RGB,
  "teal-800": [12, 69, 90] as RGB,
  "teal-900": [12, 41, 55] as RGB,
  "teal-950": [14, 31, 42] as RGB,
  // 红色系 - Dark Theme
  "red-100": [254, 231, 231] as RGB,
  "red-200": [252, 205, 202] as RGB,
  "red-300": [251, 188, 182] as RGB,
  "red-400": [252, 163, 151] as RGB,
  "red-500": [224, 62, 26] as RGB,
  "red-600": [196, 56, 28] as RGB,
  "red-700": [150, 51, 35] as RGB,
  "red-800": [124, 38, 34] as RGB,
  "red-900": [84, 33, 28] as RGB,
  "red-950": [49, 24, 23] as RGB,
  // 橙色系 - Dark Theme
  "orange-100": [255, 237, 215] as RGB,
  "orange-200": [253, 217, 180] as RGB,
  "orange-300": [252, 198, 127] as RGB,
  "orange-400": [252, 179, 74] as RGB,
  "orange-500": [222, 125, 2] as RGB,
  "orange-600": [200, 111, 4] as RGB,
  "orange-700": [173, 95, 5] as RGB,
  "orange-800": [152, 83, 6] as RGB,
  "orange-900": [103, 56, 6] as RGB,
  "orange-950": [55, 29, 6] as RGB,
  // 黄色系 - Dark Theme
  "yellow-100": [253, 247, 221] as RGB,
  "yellow-200": [251, 232, 173] as RGB,
  "yellow-300": [249, 223, 144] as RGB,
  "yellow-400": [247, 209, 95] as RGB,
  "yellow-500": [243, 193, 27] as RGB,
  "yellow-600": [242, 181, 13] as RGB,
  "yellow-700": [228, 167, 17] as RGB,
  "yellow-800": [197, 128, 17] as RGB,
  "yellow-900": [146, 87, 17] as RGB,
  "yellow-950": [113, 68, 15] as RGB,
  // 绿色系 - Dark Theme
  "green-100": [221, 253, 226] as RGB,
  "green-200": [190, 239, 194] as RGB,
  "green-300": [161, 232, 185] as RGB,
  "green-400": [121, 210, 151] as RGB,
  "green-500": [25, 143, 81] as RGB,
  "green-600": [7, 131, 72] as RGB,
  "green-700": [10, 92, 53] as RGB,
  "green-800": [10, 76, 45] as RGB,
  "green-900": [8, 38, 24] as RGB,
  "green-950": [11, 30, 21] as RGB,
} as const

// ============================================================================
// 语义颜色定义 - Light Theme
// ============================================================================
export const semanticColorsLight = {
  // 前景色
  "foreground-default": "black",
  "foreground-secondary": "black",
  "foreground-tertiary": "black",
  "foreground-accent": "blue-600",
  "foreground-success": "green-600",
  "foreground-warning": "yellow-950",
  "foreground-danger": "red-600",
  "foreground-assistive": "pink-600",
  "foreground-component": "purple-600",
  "foreground-inverse": "white",

  // 背景色
  "background-default": "white",
  "background-secondary": "gray-100",
  "background-tertiary": "gray-200",
  "background-selected": "blue-200",
  "background-hover": "gray-100",
  "background-disabled": "gray-300",
  "background-inverse": "gray-800",

  // 图标色
  "icon-default": [26, 26, 26] as RGB,
  "icon-secondary": [128, 128, 128] as RGB,
  "icon-tertiary": [178, 178, 178] as RGB,
  "icon-disabled": [178, 178, 178] as RGB,

  // 边框色
  "boundary-default": "gray-200",
  "boundary-strong": "gray-800",
  "boundary-selected-strong": "blue-600",
} as const

// ============================================================================
// 语义颜色定义 - Dark Theme
// ============================================================================
export const semanticColorsDark = {
  // 前景色
  "foreground-default": "white",
  "foreground-secondary": "white",
  "foreground-tertiary": "white",
  "foreground-accent": "blue-400",
  "foreground-success": "green-400",
  "foreground-warning": "yellow-400",
  "foreground-danger": "red-400",
  "foreground-assistive": "pink-400",
  "foreground-component": "purple-400",
  "foreground-inverse": "black",

  // 背景色
  "background-default": "gray-800",
  "background-secondary": "gray-700",
  "background-tertiary": "gray-600",
  "background-selected": "blue-pale-700",
  "background-hover": "gray-700",
  "background-disabled": "gray-500",
  "background-inverse": "white",

  // 图标色
  "icon-default": "white",
  "icon-secondary": [192, 192, 192] as RGB,
  "icon-tertiary": [128, 128, 128] as RGB,
  "icon-disabled": [128, 128, 128] as RGB,

  // 边框色
  "boundary-default": "gray-600",
  "boundary-strong": "white",
  "boundary-selected-strong": "blue-400",
} as const

// ============================================================================
// 基础颜色调色板 - Pale Theme
// ============================================================================
export const paleColors = {
  "blue-pale-100": [241, 245, 248] as RGB,
  "blue-pale-200": [227, 236, 242] as RGB,
  "blue-pale-300": [210, 218, 228] as RGB,
  "blue-pale-400": [175, 188, 207] as RGB,
  "blue-pale-500": [102, 119, 153] as RGB,
  "blue-pale-600": [83, 99, 131] as RGB,
  "blue-pale-700": [74, 88, 120] as RGB,
  "blue-pale-800": [57, 67, 96] as RGB,
  "blue-pale-900": [37, 45, 65] as RGB,
  "blue-pale-950": [18, 23, 33] as RGB,

  "violet-pale-100": [241, 241, 248] as RGB,
  "violet-pale-200": [231, 231, 243] as RGB,
  "violet-pale-300": [212, 212, 237] as RGB,
  "violet-pale-400": [179, 178, 220] as RGB,
  "violet-pale-500": [106, 105, 155] as RGB,
  "violet-pale-600": [89, 88, 132] as RGB,
  "violet-pale-700": [78, 77, 117] as RGB,
  "violet-pale-800": [57, 57, 86] as RGB,
  "violet-pale-900": [41, 41, 61] as RGB,
  "violet-pale-950": [20, 20, 31] as RGB,

  "purple-pale-100": [244, 241, 248] as RGB,
  "purple-pale-200": [237, 231, 243] as RGB,
  "purple-pale-300": [224, 212, 237] as RGB,
  "purple-pale-400": [197, 178, 220] as RGB,
  "purple-pale-500": [127, 105, 155] as RGB,
  "purple-pale-600": [107, 88, 132] as RGB,
  "purple-pale-700": [96, 77, 117] as RGB,
  "purple-pale-800": [71, 57, 86] as RGB,
  "purple-pale-900": [51, 41, 61] as RGB,
  "purple-pale-950": [26, 20, 31] as RGB,

  "pink-pale-100": [246, 238, 244] as RGB,
  "pink-pale-200": [242, 227, 238] as RGB,
  "pink-pale-300": [232, 206, 225] as RGB,
  "pink-pale-400": [218, 170, 206] as RGB,
  "pink-pale-500": [171, 89, 152] as RGB,
  "pink-pale-600": [134, 80, 122] as RGB,
  "pink-pale-700": [114, 70, 103] as RGB,
  "pink-pale-800": [81, 52, 74] as RGB,
  "pink-pale-900": [51, 37, 47] as RGB,
  "pink-pale-950": [27, 19, 24] as RGB,

  "teal-pale-100": [241, 246, 248] as RGB,
  "teal-pale-200": [227, 238, 242] as RGB,
  "teal-pale-300": [206, 222, 228] as RGB,
  "teal-pale-400": [163, 194, 204] as RGB,
  "teal-pale-500": [81, 131, 148] as RGB,
  "teal-pale-600": [67, 108, 122] as RGB,
  "teal-pale-700": [60, 96, 109] as RGB,
  "teal-pale-800": [47, 76, 86] as RGB,
  "teal-pale-900": [31, 50, 56] as RGB,
  "teal-pale-950": [16, 26, 30] as RGB,

  "red-pale-100": [250, 237, 235] as RGB,
  "red-pale-200": [248, 229, 226] as RGB,
  "red-pale-300": [243, 207, 201] as RGB,
  "red-pale-400": [235, 169, 157] as RGB,
  "red-pale-500": [212, 88, 59] as RGB,
  "red-pale-600": [165, 84, 64] as RGB,
  "red-pale-700": [134, 69, 55] as RGB,
  "red-pale-800": [96, 51, 42] as RGB,
  "red-pale-900": [65, 38, 33] as RGB,
  "red-pale-950": [31, 21, 20] as RGB,

  "orange-pale-100": [250, 239, 235] as RGB,
  "orange-pale-200": [248, 233, 226] as RGB,
  "orange-pale-300": [243, 214, 201] as RGB,
  "orange-pale-400": [235, 180, 157] as RGB,
  "orange-pale-500": [212, 105, 59] as RGB,
  "orange-pale-600": [165, 94, 64] as RGB,
  "orange-pale-700": [134, 78, 55] as RGB,
  "orange-pale-800": [96, 58, 42] as RGB,
  "orange-pale-900": [65, 43, 33] as RGB,
  "orange-pale-950": [31, 23, 20] as RGB,

  "yellow-pale-100": [255, 245, 235] as RGB,
  "yellow-pale-200": [253, 238, 206] as RGB,
  "yellow-pale-300": [245, 223, 168] as RGB,
  "yellow-pale-400": [232, 205, 125] as RGB,
  "yellow-pale-500": [173, 127, 0] as RGB,
  "yellow-pale-600": [144, 104, 0] as RGB,
  "yellow-pale-700": [122, 88, 0] as RGB,
  "yellow-pale-800": [92, 65, 0] as RGB,
  "yellow-pale-900": [58, 42, 16] as RGB,
  "yellow-pale-950": [33, 26, 18] as RGB,

  "green-pale-100": [241, 248, 242] as RGB,
  "green-pale-200": [218, 236, 223] as RGB,
  "green-pale-300": [195, 224, 204] as RGB,
  "green-pale-400": [159, 193, 170] as RGB,
  "green-pale-500": [103, 142, 121] as RGB,
  "green-pale-600": [92, 128, 109] as RGB,
  "green-pale-700": [81, 115, 97] as RGB,
  "green-pale-800": [71, 102, 86] as RGB,
  "green-pale-900": [47, 72, 60] as RGB,
  "green-pale-950": [23, 43, 34] as RGB,
} as const

// ============================================================================
// 扩展语义颜色定义 - 不区分主题
// ============================================================================
export const extendedSemanticColors = {
  // 前景色扩展
  "foreground-disabled": "foreground-tertiary",
  "foreground-on-accent": "white",
  "foreground-on-accent-secondary": "white",
  "foreground-on-accent-tertiary": "white",
  // 背景色扩展
  "background-accent": "blue-500",
  "background-accent-hover": "blue-600",
  "background-accent-secondary": "blue-700",
  "background-success": "green-500",
  "background-success-hover": "green-600",
  "background-success-secondary": "green-700",
  "background-warning": "yellow-500",
  "background-warning-hover": "yellow-600",
  "background-warning-secondary": "yellow-700",
  "background-danger": "red-500",
  "background-danger-hover": "red-600",
  "background-danger-secondary": "red-700",
  "background-assistive": "pink-500",
  "background-assistive-hover": "pink-600",
  "background-assistive-secondary": "pink-700",
  "background-component": "purple-500",
  "background-component-hover": "purple-600",
  "background-component-secondary": "purple-700",
  "background-menu": "gray-900",
  "background-toolbar": "gray-800",

  // 边框色扩展
  "boundary-selected": "blue-500",
  "boundary-menu": "gray-700",
  "boundary-toolbar": "gray-600",
} as const

// ============================================================================
// 透明度设置
// ============================================================================
export const defaultAlpha = {
  // Light theme 透明度
  "foreground-default": 0.9,
  "foreground-secondary": 0.5,
  "foreground-tertiary": 0.3,

  // Dark theme 透明度
  "foreground-secondary-dark": 0.7,
  "foreground-tertiary-dark": 0.4,
  "boundary-strong-dark": 0.9,

  // 扩展颜色的固定透明度
  "foreground-on-accent-secondary": 0.8,
  "foreground-on-accent-tertiary": 0.4,
} as const

// ============================================================================
// 颜色短别名映射
// ============================================================================
export const colorAliases = {
  // 前景色别名
  "fg-default": "foreground-default",
  "fg-secondary": "foreground-secondary",
  "fg-tertiary": "foreground-tertiary",
  "fg-disabled": "foreground-disabled",
  "fg-inverse": "foreground-inverse",

  //
  "fg-on-accent": "foreground-on-accent",
  "fg-on-accent-secondary": "foreground-on-accent-secondary",
  "fg-on-accent-tertiary": "foreground-on-accent-tertiary",

  "fg-accent": "foreground-accent",
  "fg-success": "foreground-success",
  "fg-warning": "foreground-warning",
  "fg-danger": "foreground-danger",
  "fg-assistive": "foreground-assistive",
  "fg-component": "foreground-component",

  // 背景色别名
  "bg-default": "background-default",
  "bg-secondary": "background-secondary",
  "bg-tertiary": "background-tertiary",
  "bg-selected": "background-selected",
  "bg-hover": "background-hover",
  "bg-disabled": "background-disabled",
  "bg-accent": "background-accent",
  "bg-accent-hover": "background-accent-hover",
  "bg-accent-secondary": "background-accent-secondary",
  "bg-success": "background-success",
  "bg-success-hover": "background-success-hover",
  "bg-success-secondary": "background-success-secondary",
  "bg-warning": "background-warning",
  "bg-warning-hover": "background-warning-hover",
  "bg-warning-secondary": "background-warning-secondary",
  "bg-danger": "background-danger",
  "bg-danger-hover": "background-danger-hover",
  "bg-danger-secondary": "background-danger-secondary",
  "bg-assistive": "background-assistive",
  "bg-assistive-hover": "background-assistive-hover",
  "bg-assistive-secondary": "background-assistive-secondary",
  "bg-component": "background-component",
  "bg-component-hover": "background-component-hover",
  "bg-component-secondary": "background-component-secondary",
  "bg-menu": "background-menu",
  "bg-toolbar": "background-toolbar",
  "bg-inverse": "background-inverse",

  // 图标色别名
  "ic-default": "icon-default",
  "ic-secondary": "icon-secondary",
  "ic-tertiary": "icon-tertiary",
  "ic-disabled": "icon-disabled",

  // 边框色别名
  "bd-default": "boundary-default",
  "bd-strong": "boundary-strong",
  "bd-selected": "boundary-selected",
  "bd-selected-strong": "boundary-selected-strong",
  "bd-menu": "boundary-menu",
  "bd-toolbar": "boundary-toolbar",
} as const

// 类型定义
export type BaseColorKey = keyof typeof baseColorsLight
export type PaleColorKey = keyof typeof paleColors
export type SemanticColorKey = keyof typeof semanticColorsLight
export type ExtendedSemanticColorKey = keyof typeof extendedSemanticColors
export type ColorAliasKey = keyof typeof colorAliases
export type ColorKey =
  | BaseColorKey
  | PaleColorKey
  | SemanticColorKey
  | ExtendedSemanticColorKey
  | ColorAliasKey
