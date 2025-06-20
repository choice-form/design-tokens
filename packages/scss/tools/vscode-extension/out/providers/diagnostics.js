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
exports.DiagnosticsProvider = void 0;
const vscode = __importStar(require("vscode"));
const token_loader_1 = require("../utils/token-loader");
const parser_1 = require("../utils/parser");
const tokens_1 = require("../types/tokens");
class DiagnosticsProvider {
    constructor(context) {
        this.tokenLoader = token_loader_1.TokenLoader.getInstance();
        this.diagnosticsCollection = vscode.languages.createDiagnosticCollection("designTokens");
        context.subscriptions.push(this.diagnosticsCollection);
    }
    /**
     * 更新文档的诊断信息
     */
    updateDiagnostics(document) {
        const config = vscode.workspace.getConfiguration("designTokens");
        const enableDiagnostics = config.get("enableDiagnostics", true);
        if (!enableDiagnostics) {
            this.diagnosticsCollection.delete(document.uri);
            return;
        }
        const prefix = config.get("prefix", "dt");
        const diagnostics = [];
        // 解析文档中的所有令牌
        const tokens = parser_1.ScssParser.parseDocument(document, prefix);
        for (const token of tokens) {
            const range = parser_1.ScssParser.getTokenRange(document, token);
            // 检查函数名是否有效
            if (!token.isValid && token.error) {
                const diagnostic = new vscode.Diagnostic(range, token.error, vscode.DiagnosticSeverity.Error);
                diagnostic.code = "invalid-function";
                diagnostic.source = "Design Tokens";
                diagnostics.push(diagnostic);
                continue;
            }
            // 检查令牌是否存在
            const tokenFunction = tokens_1.TOKEN_FUNCTIONS.find((fn) => fn.name === token.functionName);
            if (tokenFunction) {
                const tokenExists = this.tokenLoader.hasToken(tokenFunction.tokenType, token.tokenKey);
                if (!tokenExists) {
                    const parameterRange = parser_1.ScssParser.getTokenParameterRange(document, token);
                    const range = parameterRange || parser_1.ScssParser.getTokenRange(document, token);
                    const diagnostic = new vscode.Diagnostic(range, `令牌 "${token.tokenKey}" 不存在于 ${tokenFunction.tokenType} 中`, vscode.DiagnosticSeverity.Error);
                    diagnostic.code = "token-not-found";
                    diagnostic.source = "Design Tokens";
                    // 添加快速修复建议
                    this.addQuickFixSuggestions(diagnostic, tokenFunction.tokenType, token.tokenKey);
                    diagnostics.push(diagnostic);
                }
            }
        }
        this.diagnosticsCollection.set(document.uri, diagnostics);
    }
    /**
     * 添加快速修复建议
     */
    addQuickFixSuggestions(diagnostic, tokenType, invalidKey) {
        const availableTokens = this.tokenLoader.getTokensByType(tokenType);
        // 找到最相似的令牌名称
        const suggestions = this.findSimilarTokens(invalidKey, availableTokens, 3);
        if (suggestions.length > 0) {
            const suggestionText = suggestions.map((s) => `"${s}"`).join(", ");
            diagnostic.message += `\n\n建议的令牌: ${suggestionText}`;
        }
    }
    /**
     * 查找相似的令牌名称
     */
    findSimilarTokens(target, tokens, maxResults) {
        const similarities = tokens.map((token) => {
            const key = token.key.replace(/^["']|["']$/g, ""); // 移除引号
            return {
                key,
                similarity: this.calculateSimilarity(target.toLowerCase(), key.toLowerCase()),
            };
        });
        return similarities
            .filter((item) => item.similarity > 0.3) // 相似度阈值
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, maxResults)
            .map((item) => item.key);
    }
    /**
     * 计算字符串相似度
     */
    calculateSimilarity(str1, str2) {
        // 使用简单的编辑距离算法
        const matrix = [];
        const len1 = str1.length;
        const len2 = str2.length;
        // 初始化矩阵
        for (let i = 0; i <= len1; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= len2; j++) {
            matrix[0][j] = j;
        }
        // 填充矩阵
        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                }
                else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // 替换
                    matrix[i][j - 1] + 1, // 插入
                    matrix[i - 1][j] + 1);
                }
            }
        }
        const maxLength = Math.max(len1, len2);
        return maxLength === 0 ? 1 : 1 - matrix[len1][len2] / maxLength;
    }
    /**
     * 清理指定文档的诊断信息
     */
    clearDiagnostics(document) {
        this.diagnosticsCollection.delete(document.uri);
    }
    /**
     * 清理所有诊断信息
     */
    clearAllDiagnostics() {
        this.diagnosticsCollection.clear();
    }
    /**
     * 销毁资源
     */
    dispose() {
        this.diagnosticsCollection.dispose();
    }
}
exports.DiagnosticsProvider = DiagnosticsProvider;
//# sourceMappingURL=diagnostics.js.map