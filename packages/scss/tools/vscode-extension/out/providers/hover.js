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
exports.HoverProvider = void 0;
const vscode = __importStar(require("vscode"));
const token_loader_1 = require("../utils/token-loader");
const parser_1 = require("../utils/parser");
const tokens_1 = require("../types/tokens");
class HoverProvider {
    constructor() {
        this.tokenLoader = token_loader_1.TokenLoader.getInstance();
    }
    provideHover(document, position, token) {
        const config = vscode.workspace.getConfiguration("designTokens");
        const prefix = config.get("prefix", "dt");
        const parsedToken = parser_1.ScssParser.getTokenAtPosition(document, position, prefix);
        if (!parsedToken) {
            return null;
        }
        const range = parser_1.ScssParser.getTokenRange(document, parsedToken);
        // 如果令牌无效，显示错误信息
        if (!parsedToken.isValid) {
            return new vscode.Hover(new vscode.MarkdownString(`❌ **错误:** ${parsedToken.error}`), range);
        }
        // 获取令牌函数信息
        const tokenFunction = tokens_1.TOKEN_FUNCTIONS.find((fn) => fn.name === parsedToken.functionName);
        if (!tokenFunction) {
            return null;
        }
        // 获取令牌数据
        const tokenData = this.tokenLoader.findToken(tokenFunction.tokenType, parsedToken.tokenKey);
        if (!tokenData) {
            return new vscode.Hover(new vscode.MarkdownString(`❌ **令牌不存在:** ${parsedToken.tokenKey}`), range);
        }
        // 生成悬停内容
        const hoverContent = this.generateHoverContent(tokenData, tokenFunction.tokenType, parsedToken);
        return new vscode.Hover(hoverContent, range);
    }
    /**
     * 生成悬停内容
     */
    generateHoverContent(tokenData, tokenType, parsedToken) {
        const md = new vscode.MarkdownString();
        md.supportHtml = true;
        // 标题
        md.appendMarkdown(`### 🎨 ${parsedToken.functionName}("${parsedToken.tokenKey}")\n\n`);
        // 根据不同类型显示不同内容
        switch (tokenType) {
            case "colors":
                this.appendColorInfo(md, tokenData);
                break;
            case "spacing":
                this.appendSpacingInfo(md, tokenData);
                break;
            case "radius":
            case "shadows":
            case "zindex":
                this.appendGenericTokenInfo(md, tokenData, tokenType);
                break;
        }
        // 添加描述
        if (tokenData.description) {
            md.appendMarkdown(`\n**描述:** ${tokenData.description}\n`);
        }
        return md;
    }
    /**
     * 添加颜色信息
     */
    appendColorInfo(md, colorToken) {
        // 颜色预览
        if (colorToken.preview) {
            md.appendMarkdown(`<div style="width: 40px; height: 40px; background-color: ${colorToken.preview}; border: 1px solid #ccc; border-radius: 4px; display: inline-block; margin-bottom: 8px;"></div>\n\n`);
        }
        // 颜色值
        md.appendMarkdown(`**颜色值:** \`${colorToken.value}\`\n`);
        // RGB 值
        if (colorToken.rgb) {
            md.appendMarkdown(`**RGB:** \`rgb(${colorToken.rgb})\`\n`);
        }
        // 类别和主题
        if (colorToken.category) {
            md.appendMarkdown(`**类别:** ${colorToken.category}\n`);
        }
        if (colorToken.theme) {
            md.appendMarkdown(`**主题:** ${colorToken.theme}\n`);
        }
    }
    /**
     * 添加间距信息
     */
    appendSpacingInfo(md, spacingToken) {
        // 间距值
        md.appendMarkdown(`**间距值:** \`${spacingToken.value}\`\n`);
        // 像素值
        if (spacingToken.pixelValue) {
            md.appendMarkdown(`**像素值:** \`${spacingToken.pixelValue}\`\n`);
        }
        // 可视化间距
        if (spacingToken.pixelValue) {
            const pixels = parseInt(spacingToken.pixelValue.replace("px", ""));
            if (pixels <= 100) {
                md.appendMarkdown(`\n**可视化预览:**\n<div style="width: ${pixels}px; height: 20px; background-color: #007acc; margin: 4px 0;"></div>\n`);
            }
        }
    }
    /**
     * 添加通用令牌信息
     */
    appendGenericTokenInfo(md, tokenData, tokenType) {
        const typeLabels = {
            radius: "圆角值",
            shadows: "阴影值",
            zindex: "层级值",
        };
        const label = typeLabels[tokenType] || "值";
        md.appendMarkdown(`**${label}:** \`${tokenData.value}\`\n`);
        if ("category" in tokenData && tokenData.category) {
            md.appendMarkdown(`**类别:** ${tokenData.category}\n`);
        }
        if ("theme" in tokenData && tokenData.theme) {
            md.appendMarkdown(`**主题:** ${tokenData.theme}\n`);
        }
    }
}
exports.HoverProvider = HoverProvider;
//# sourceMappingURL=hover.js.map