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
exports.ColorDecorationProvider = void 0;
const vscode = __importStar(require("vscode"));
const token_loader_1 = require("../utils/token-loader");
const parser_1 = require("../utils/parser");
class ColorDecorationProvider {
    constructor() {
        this.tokenLoader = token_loader_1.TokenLoader.getInstance();
        // 创建装饰器类型
        this.decorationType = vscode.window.createTextEditorDecorationType({
            before: {
                width: "1em",
                height: "1em",
                margin: "0 0.2em 0 0",
            },
        });
    }
    /**
     * 更新颜色装饰
     */
    updateDecorations(editor) {
        const config = vscode.workspace.getConfiguration("designTokens");
        const prefix = config.get("prefix", "dt");
        const enableColorPreview = config.get("enableColorPreview", true);
        if (!enableColorPreview) {
            editor.setDecorations(this.decorationType, []);
            return;
        }
        const document = editor.document;
        const tokens = parser_1.ScssParser.parseDocument(document, prefix);
        const decorations = [];
        for (const token of tokens) {
            // 只处理颜色函数
            if (token.functionName !== "color" && token.functionName !== "colors") {
                continue;
            }
            // 查找颜色令牌
            const colorToken = this.tokenLoader.findToken("colors", token.tokenKey);
            if (!colorToken || !colorToken.preview) {
                continue;
            }
            const range = new vscode.Range(document.positionAt(token.range.start), document.positionAt(token.range.end));
            const decoration = {
                range,
                renderOptions: {
                    before: {
                        backgroundColor: colorToken.preview,
                        border: "1px solid rgba(128, 128, 128, 0.5)",
                    },
                },
            };
            decorations.push(decoration);
        }
        editor.setDecorations(this.decorationType, decorations);
    }
    /**
     * 清理装饰器
     */
    dispose() {
        this.decorationType.dispose();
    }
}
exports.ColorDecorationProvider = ColorDecorationProvider;
//# sourceMappingURL=color-decoration.js.map