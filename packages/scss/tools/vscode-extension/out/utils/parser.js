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
exports.ScssParser = void 0;
const vscode = __importStar(require("vscode"));
const tokens_1 = require("../types/tokens");
class ScssParser {
    /**
     * 解析文档中的设计令牌
     */
    static parseDocument(document, prefix) {
        const tokens = [];
        const text = document.getText();
        // 创建正则表达式匹配 prefix.function("token") 或 prefix.function(token) 模式
        const regex = new RegExp(`\\b${this.escapeRegex(prefix)}\\.(\\w+)\\(\\s*(?:["']([^"']+)["']|(\\d+(?:\\.\\d+)?|\\w+))\\s*\\)`, "g");
        let match;
        while ((match = regex.exec(text)) !== null) {
            const [fullMatch, functionName, quotedToken, unquotedToken] = match;
            const tokenKey = quotedToken || unquotedToken;
            const startPos = match.index;
            const endPos = startPos + fullMatch.length;
            // 检查是否在注释中
            if (this.isInComment(text, startPos)) {
                continue;
            }
            // 检查是否在函数定义内部
            if (this.isInFunctionDefinition(text, startPos)) {
                continue;
            }
            // 验证函数名是否有效
            const tokenFunction = tokens_1.TOKEN_FUNCTIONS.find((fn) => fn.name === functionName);
            const isValid = tokenFunction !== undefined;
            tokens.push({
                functionName,
                tokenKey,
                range: { start: startPos, end: endPos },
                isValid,
                error: isValid ? undefined : `未知的令牌函数: ${functionName}`,
            });
        }
        return tokens;
    }
    /**
     * 获取指定位置的令牌信息
     */
    static getTokenAtPosition(document, position, prefix) {
        const tokens = this.parseDocument(document, prefix);
        const offset = document.offsetAt(position);
        return tokens.find((token) => offset >= token.range.start && offset <= token.range.end) || null;
    }
    /**
     * 获取当前光标位置的上下文信息
     */
    static getCompletionContext(document, position, prefix) {
        const line = document.lineAt(position);
        const lineText = line.text.substring(0, position.character);
        // 检查是否在注释中
        if (this.isInComment(lineText, lineText.length)) {
            return { type: "none" };
        }
        // 检查是否在输入函数名（包括只输入了前缀+点的情况）
        const functionPattern = new RegExp(`\\b${this.escapeRegex(prefix)}\\.(\\w*)$`);
        const functionMatch = functionPattern.exec(lineText);
        if (functionMatch) {
            return {
                type: "function",
                partialText: functionMatch[1] || "", // 如果没有输入函数名，返回空字符串
            };
        }
        // 检查是否在函数参数中（支持带引号和不带引号的参数）
        const paramPattern = new RegExp(`\\b${this.escapeRegex(prefix)}\\.(\\w+)\\(\\s*(?:["']([^"'()]*)$|([^"'()\\s]*)$)`);
        const paramMatch = paramPattern.exec(lineText);
        if (paramMatch) {
            return {
                type: "parameter",
                functionName: paramMatch[1],
                partialText: paramMatch[2] || paramMatch[3] || "",
            };
        }
        return { type: "none" };
    }
    /**
     * 检查位置是否在注释中
     */
    static isInComment(text, position) {
        // 找到该位置所在的行
        const lineStart = text.lastIndexOf("\n", position - 1) + 1;
        const lineEnd = text.indexOf("\n", position);
        const line = text.slice(lineStart, lineEnd === -1 ? text.length : lineEnd);
        // 检查该行是否包含 //，且 // 在当前位置之前
        const commentStart = line.indexOf("//");
        if (commentStart !== -1) {
            const positionInLine = position - lineStart;
            if (positionInLine >= commentStart) {
                return true;
            }
        }
        // 检查是否在多行注释中
        const beforeText = text.slice(0, position);
        const multiCommentStart = beforeText.lastIndexOf("/*");
        const multiCommentEnd = beforeText.lastIndexOf("*/");
        return multiCommentStart > multiCommentEnd;
    }
    /**
     * 检查位置是否在函数定义内部
     */
    static isInFunctionDefinition(text, position) {
        // 向前查找最近的 @function 或 @mixin
        const beforeText = text.slice(0, position);
        const functionDefMatches = [...beforeText.matchAll(/@(?:function|mixin)\s+[\w-]+\s*\(/g)];
        if (functionDefMatches.length === 0) {
            return false;
        }
        // 找到最后一个函数定义的位置
        const lastFunctionDef = functionDefMatches[functionDefMatches.length - 1];
        const functionStart = lastFunctionDef.index;
        // 从函数定义开始查找对应的 { 和 }
        let braceCount = 0;
        let foundOpenBrace = false;
        for (let i = functionStart; i < position; i++) {
            const char = text[i];
            if (char === "{") {
                braceCount++;
                foundOpenBrace = true;
            }
            else if (char === "}") {
                braceCount--;
                if (braceCount === 0 && foundOpenBrace) {
                    // 函数定义已结束
                    return false;
                }
            }
        }
        // 如果还有未匹配的 {，说明在函数内部
        return foundOpenBrace && braceCount > 0;
    }
    /**
     * 转义正则表达式特殊字符
     */
    static escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    /**
     * 获取令牌的完整范围（包括引号）
     */
    static getTokenRange(document, token) {
        const startPos = document.positionAt(token.range.start);
        const endPos = document.positionAt(token.range.end);
        return new vscode.Range(startPos, endPos);
    }
    /**
     * 获取令牌参数的范围（不包括引号）
     */
    static getTokenParameterRange(document, token) {
        const text = document.getText();
        const tokenText = text.slice(token.range.start, token.range.end);
        // 匹配参数部分（支持带引号和不带引号的内容）
        const quotedParamMatch = /\(\s*["']([^"']+)["']\s*\)/.exec(tokenText);
        const unquotedParamMatch = /\(\s*(\d+(?:\.\d+)?|\w+)\s*\)/.exec(tokenText);
        const paramMatch = quotedParamMatch || unquotedParamMatch;
        if (!paramMatch) {
            return null;
        }
        const paramStart = token.range.start + tokenText.indexOf(paramMatch[1]);
        const paramEnd = paramStart + paramMatch[1].length;
        return new vscode.Range(document.positionAt(paramStart), document.positionAt(paramEnd));
    }
}
exports.ScssParser = ScssParser;
//# sourceMappingURL=parser.js.map