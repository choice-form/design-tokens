import * as vscode from "vscode";
import { ParsedToken } from "../types/tokens";
export declare class ScssParser {
    /**
     * 解析文档中的设计令牌
     */
    static parseDocument(document: vscode.TextDocument, prefix: string): ParsedToken[];
    /**
     * 获取指定位置的令牌信息
     */
    static getTokenAtPosition(document: vscode.TextDocument, position: vscode.Position, prefix: string): ParsedToken | null;
    /**
     * 获取当前光标位置的上下文信息
     */
    static getCompletionContext(document: vscode.TextDocument, position: vscode.Position, prefix: string): {
        functionName?: string;
        partialText?: string;
        type: "function" | "parameter" | "none";
    };
    /**
     * 检查位置是否在注释中
     */
    private static isInComment;
    /**
     * 检查位置是否在函数定义内部
     */
    private static isInFunctionDefinition;
    /**
     * 转义正则表达式特殊字符
     */
    private static escapeRegex;
    /**
     * 获取令牌的完整范围（包括引号）
     */
    static getTokenRange(document: vscode.TextDocument, token: ParsedToken): vscode.Range;
    /**
     * 获取令牌参数的范围（不包括引号）
     */
    static getTokenParameterRange(document: vscode.TextDocument, token: ParsedToken): vscode.Range | null;
}
//# sourceMappingURL=parser.d.ts.map