export interface TokensData {
  data: {
    colors: ColorToken[]
    radius: RadiusToken[]
    shadows: ShadowToken[]
    spacing: SpacingToken[]
    typography: TypographyToken[]
    zindex: ZIndexToken[]
  }
  generatedAt: string
  source: string
}

export interface ColorToken {
  category: "base" | "semantic" | "alias" | "extended"
  description?: string
  key: string
  preview?: string
  rgb?: string
  theme?: string
  value: string
}

export interface SpacingToken {
  description?: string
  key: string
  pixelValue?: string
  value: number | string
}

export interface RadiusToken {
  category: string
  description?: string
  key: string
  value: string
}

export interface ShadowToken {
  category: string
  description?: string
  key: string
  theme?: string
  value: string
}

export interface ZIndexToken {
  category: string
  description?: string
  key: string
  value: number | string
}

export interface TypographyToken {
  category: "font-size" | "font-family" | "font-weight" | "line-height" | "letter-spacing"
  description?: string
  key: string
  value: string | number
}

export interface TokenFunction {
  description: string
  name: string
  parameters: {
    description: string
    name: string
    required: boolean
    type: string
  }[]
  tokenType: keyof TokensData["data"]
}

export interface ExtensionConfig {
  enableColorPreview: boolean
  enableDiagnostics: boolean
  prefix: string
  tokensPath: string
}

export interface ParsedToken {
  error?: string
  functionName: string
  isValid: boolean
  range: {
    end: number
    start: number
  }
  tokenKey: string
}

export const TOKEN_FUNCTIONS: TokenFunction[] = [
  {
    name: "color",
    description: "获取颜色令牌值",
    tokenType: "colors",
    parameters: [
      {
        name: "token",
        type: "string",
        description: "颜色令牌名称",
        required: true,
      },
    ],
  },
  {
    name: "spacing",
    description: "获取间距令牌值",
    tokenType: "spacing",
    parameters: [
      {
        name: "token",
        type: "string",
        description: "间距令牌名称",
        required: true,
      },
    ],
  },
  {
    name: "radius",
    description: "获取圆角令牌值",
    tokenType: "radius",
    parameters: [
      {
        name: "token",
        type: "string",
        description: "圆角令牌名称",
        required: true,
      },
    ],
  },
  {
    name: "shadows",
    description: "获取阴影令牌值",
    tokenType: "shadows",
    parameters: [
      {
        name: "token",
        type: "string",
        description: "阴影令牌名称",
        required: true,
      },
    ],
  },
  {
    name: "zindex",
    description: "获取层级令牌值",
    tokenType: "zindex",
    parameters: [
      {
        name: "token",
        type: "string",
        description: "层级令牌名称",
        required: true,
      },
    ],
  },
  {
    name: "font-size",
    description: "获取字体大小令牌值",
    tokenType: "typography",
    parameters: [
      {
        name: "token",
        type: "string",
        description: "字体大小令牌名称",
        required: true,
      },
    ],
  },
  {
    name: "font-family",
    description: "获取字体族令牌值",
    tokenType: "typography",
    parameters: [
      {
        name: "token",
        type: "string",
        description: "字体族令牌名称",
        required: true,
      },
    ],
  },
  {
    name: "font-weight",
    description: "获取字体重量令牌值",
    tokenType: "typography",
    parameters: [
      {
        name: "token",
        type: "string",
        description: "字体重量令牌名称",
        required: true,
      },
    ],
  },
  {
    name: "line-height",
    description: "获取行高令牌值",
    tokenType: "typography",
    parameters: [
      {
        name: "token",
        type: "string",
        description: "行高令牌名称",
        required: true,
      },
    ],
  },
  {
    name: "letter-spacing",
    description: "获取字符间距令牌值",
    tokenType: "typography",
    parameters: [
      {
        name: "token",
        type: "string",
        description: "字符间距令牌名称",
        required: true,
      },
    ],
  },
]

// 所有令牌类型的联合类型
export type AnyToken =
  | ColorToken
  | SpacingToken
  | RadiusToken
  | ShadowToken
  | ZIndexToken
  | TypographyToken
