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
exports.CompletionProvider = void 0;
const vscode = __importStar(require("vscode"));
const token_loader_1 = require("../utils/token-loader");
const parser_1 = require("../utils/parser");
const tokens_1 = require("../types/tokens");
class CompletionProvider {
    constructor() {
        this.tokenLoader = token_loader_1.TokenLoader.getInstance();
    }
    provideCompletionItems(document, position, token, context) {
        const config = vscode.workspace.getConfiguration("designTokens");
        const prefix = config.get("prefix", "dt");
        const completionContext = parser_1.ScssParser.getCompletionContext(document, position, prefix);
        switch (completionContext.type) {
            case "function":
                return this.provideFunctionCompletions(completionContext.partialText || "");
            case "parameter":
                return this.provideParameterCompletions(completionContext.functionName);
            default:
                return [];
        }
    }
    /**
     * 提供函数名补全
     */
    provideFunctionCompletions(partialText) {
        return tokens_1.TOKEN_FUNCTIONS.filter((fn) => fn.name.toLowerCase().includes(partialText.toLowerCase())).map((fn) => {
            const item = new vscode.CompletionItem(fn.name, vscode.CompletionItemKind.Function);
            item.detail = fn.description;
            item.documentation = new vscode.MarkdownString(`**${fn.name}**\n\n${fn.description}\n\n**参数:**\n${fn.parameters
                .map((p) => `- \`${p.name}\` (${p.type}${p.required ? ", 必填" : ", 可选"}): ${p.description}`)
                .join("\n")}`);
            item.insertText = new vscode.SnippetString(`${fn.name}("\${1}")`);
            item.sortText = fn.name;
            return item;
        });
    }
    /**
     * 提供参数补全
     */
    provideParameterCompletions(functionName) {
        const tokenFunction = tokens_1.TOKEN_FUNCTIONS.find((fn) => fn.name === functionName);
        if (!tokenFunction) {
            return [];
        }
        const tokens = this.tokenLoader.getTokensByType(tokenFunction.tokenType);
        return tokens.map((token) => {
            const key = this.cleanTokenKey(token.key);
            const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Value);
            // 设置详细信息
            item.detail = this.getTokenDetail(token, tokenFunction.tokenType);
            item.documentation = this.getTokenDocumentation(token, tokenFunction.tokenType);
            item.insertText = key;
            item.sortText = key;
            return item;
        });
    }
    /**
     * 清理令牌键名（移除引号）
     */
    cleanTokenKey(key) {
        return key.replace(/^["']|["']$/g, "");
    }
    /**
     * 获取令牌详细信息
     */
    getTokenDetail(token, tokenType) {
        switch (tokenType) {
            case "colors":
                return String(token.value);
            case "spacing":
                return "pixelValue" in token && token.pixelValue ? token.pixelValue : `${token.value}px`;
            case "radius":
            case "shadows":
            case "zindex":
                return String(token.value);
            case "typography":
                return String(token.value);
            default:
                return "";
        }
    }
    /**
     * 获取令牌文档
     */
    getTokenDocumentation(token, tokenType) {
        const parts = [];
        if (token.description) {
            parts.push(token.description);
        }
        switch (tokenType) {
            case "colors":
                if ("rgb" in token && token.rgb) {
                    parts.push(`RGB: ${token.rgb}`);
                }
                if ("category" in token && token.category) {
                    parts.push(`类别: ${token.category}`);
                }
                if ("theme" in token && token.theme) {
                    parts.push(`主题: ${token.theme}`);
                }
                break;
            case "spacing":
                if ("pixelValue" in token && token.pixelValue && token.value !== token.pixelValue) {
                    parts.push(`像素值: ${token.pixelValue}`);
                }
                break;
            case "radius":
            case "shadows":
            case "zindex":
                if ("category" in token && token.category) {
                    parts.push(`类别: ${token.category}`);
                }
                break;
            case "typography":
                if ("category" in token && token.category) {
                    parts.push(`类型: ${token.category}`);
                }
                break;
        }
        return parts.join("\n");
    }
}
exports.CompletionProvider = CompletionProvider;
//# sourceMappingURL=completion.js.map