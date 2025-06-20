import * as vscode from "vscode";
export declare class DiagnosticsProvider {
    private tokenLoader;
    private diagnosticsCollection;
    constructor(context: vscode.ExtensionContext);
    /**
     * 更新文档的诊断信息
     */
    updateDiagnostics(document: vscode.TextDocument): void;
    /**
     * 添加快速修复建议
     */
    private addQuickFixSuggestions;
    /**
     * 查找相似的令牌名称
     */
    private findSimilarTokens;
    /**
     * 计算字符串相似度
     */
    private calculateSimilarity;
    /**
     * 清理指定文档的诊断信息
     */
    clearDiagnostics(document: vscode.TextDocument): void;
    /**
     * 清理所有诊断信息
     */
    clearAllDiagnostics(): void;
    /**
     * 销毁资源
     */
    dispose(): void;
}
//# sourceMappingURL=diagnostics.d.ts.map