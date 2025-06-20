export interface TokensData {
    data: {
        colors: ColorToken[];
        radius: RadiusToken[];
        shadows: ShadowToken[];
        spacing: SpacingToken[];
        typography: TypographyToken[];
        zindex: ZIndexToken[];
    };
    generatedAt: string;
    source: string;
}
export interface ColorToken {
    category: "base" | "semantic" | "alias" | "extended";
    description?: string;
    key: string;
    preview?: string;
    rgb?: string;
    theme?: string;
    value: string;
}
export interface SpacingToken {
    description?: string;
    key: string;
    pixelValue?: string;
    value: number | string;
}
export interface RadiusToken {
    category: string;
    description?: string;
    key: string;
    value: string;
}
export interface ShadowToken {
    category: string;
    description?: string;
    key: string;
    theme?: string;
    value: string;
}
export interface ZIndexToken {
    category: string;
    description?: string;
    key: string;
    value: number | string;
}
export interface TypographyToken {
    category: "font-size" | "font-family" | "font-weight" | "line-height" | "letter-spacing";
    description?: string;
    key: string;
    value: string | number;
}
export interface TokenFunction {
    description: string;
    name: string;
    parameters: {
        description: string;
        name: string;
        required: boolean;
        type: string;
    }[];
    tokenType: keyof TokensData["data"];
}
export interface ExtensionConfig {
    enableColorPreview: boolean;
    enableDiagnostics: boolean;
    prefix: string;
    tokensPath: string;
}
export interface ParsedToken {
    error?: string;
    functionName: string;
    isValid: boolean;
    range: {
        end: number;
        start: number;
    };
    tokenKey: string;
}
export declare const TOKEN_FUNCTIONS: TokenFunction[];
export type AnyToken = ColorToken | SpacingToken | RadiusToken | ShadowToken | ZIndexToken | TypographyToken;
//# sourceMappingURL=tokens.d.ts.map