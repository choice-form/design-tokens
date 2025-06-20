"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorDecorator = void 0;
const vscode = __importStar(require("vscode"));
const token_loader_1 = require("../utils/token-loader");
const parser_1 = require("../utils/parser");
class ColorDecorator {
    constructor() {
        this.decorationTypes = new Map();
        this.tokenLoader = token_loader_1.TokenLoader.getInstance();
    }
    /**
     * 更新编辑器中的颜色装饰
     */
    updateDecorations(editor) {
        const config = vscode.workspace.getConfiguration("designTokens");
        const prefix = config.get("prefix", "dt");
        const enableColorPreview = config.get("enableColorPreview", true);
        if (!enableColorPreview) {
            this.clearDecorations(editor);
            return;
        }
        const document = editor.document;
        const colorDecorations = new Map();
        // 解析文档中的设计令牌
        const tokens = parser_1.ScssParser.parseDocument(document, prefix);
        for (const token of tokens) {
            // 只处理颜色令牌
            if (token.functionName !== "color" && token.functionName !== "colors") {
                continue;
            }
            if (!token.isValid) {
                continue;
            }
            // 获取颜色令牌数据
            const colorToken = this.tokenLoader.findToken("colors", token.tokenKey);
            if (!colorToken || !colorToken.value) {
                continue;
            }
            // 验证颜色值是否有效
            const colorValue = this.normalizeColorValue(colorToken.value);
            if (!colorValue) {
                continue;
            }
            // 获取令牌参数的范围（不包括引号）
            const paramRange = parser_1.ScssParser.getTokenParameterRange(document, token);
            if (!paramRange) {
                continue;
            }
            // 按颜色值分组ranges
            if (!colorDecorations.has(colorValue)) {
                colorDecorations.set(colorValue, []);
            }
            colorDecorations.get(colorValue).push(paramRange);
        }
        // 清理旧的装饰
        this.clearDecorations(editor);
        // 应用新的装饰
        for (const [colorValue, ranges] of colorDecorations) {
            const decorationType = this.getOrCreateDecorationType(colorValue);
            editor.setDecorations(decorationType, ranges);
        }
    }
    /**
     * 清理编辑器中的所有颜色装饰
     */
    clearDecorations(editor) {
        for (const decorationType of this.decorationTypes.values()) {
            editor.setDecorations(decorationType, []);
        }
    }
    /**
     * 获取或创建装饰类型
     */
    getOrCreateDecorationType(colorValue) {
        if (this.decorationTypes.has(colorValue)) {
            return this.decorationTypes.get(colorValue);
        }
        // 计算文字颜色（根据背景色的亮度选择黑色或白色）
        const textColor = this.getContrastColor(colorValue);
        const decorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: colorValue,
            color: textColor,
            borderRadius: "3px",
            rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        });
        this.decorationTypes.set(colorValue, decorationType);
        return decorationType;
    }
    /**
     * 标准化颜色值
     */
    normalizeColorValue(value) {
        // 移除CSS变量语法
        if (value.startsWith("var(")) {
            return null;
        }
        // 支持的颜色格式：hex, rgb, rgba, hsl, hsla, 命名颜色
        const colorRegex = /^(?:#[0-9a-fA-F]{3,8}|rgb\s*\([^)]+\)|rgba\s*\([^)]+\)|hsl\s*\([^)]+\)|hsla\s*\([^)]+\)|[a-zA-Z]+)$/;
        if (colorRegex.test(value.trim())) {
            return value.trim();
        }
        return null;
    }
    /**
     * 根据背景色计算对比度较好的文字颜色
     */
    getContrastColor(backgroundColor) {
        // 简单的亮度计算，实际应用中可以使用更精确的算法
        // 如果是命名颜色，使用预设的对比色
        const namedColors = {
            white: "#000000",
            black: "#ffffff",
            yellow: "#000000",
            lime: "#000000",
            cyan: "#000000",
            silver: "#000000",
            gray: "#ffffff",
            red: "#ffffff",
            blue: "#ffffff",
            green: "#ffffff",
            purple: "#ffffff",
            maroon: "#ffffff",
            navy: "#ffffff",
        };
        const lowerColor = backgroundColor.toLowerCase();
        if (namedColors[lowerColor]) {
            return namedColors[lowerColor];
        }
        // 对于hex颜色，计算亮度
        if (backgroundColor.startsWith("#")) {
            const hex = backgroundColor.slice(1);
            let r = 0, g = 0, b = 0;
            if (hex.length === 3) {
                r = parseInt(hex[0] + hex[0], 16);
                g = parseInt(hex[1] + hex[1], 16);
                b = parseInt(hex[2] + hex[2], 16);
            }
            else if (hex.length === 6) {
                r = parseInt(hex.slice(0, 2), 16);
                g = parseInt(hex.slice(2, 4), 16);
                b = parseInt(hex.slice(4, 6), 16);
            }
            // 计算相对亮度（简化版本）
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness > 128 ? "#000000" : "#ffffff";
        }
        // 默认使用黑色文字
        return "#000000";
    }
    /**
     * 清理所有装饰类型
     */
    dispose() {
        for (const decorationType of this.decorationTypes.values()) {
            decorationType.dispose();
        }
        this.decorationTypes.clear();
    }
}
exports.ColorDecorator = ColorDecorator;
//# sourceMappingURL=color-decorator.js.map