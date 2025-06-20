import * as vscode from "vscode";
export declare class CompletionProvider implements vscode.CompletionItemProvider {
    private tokenLoader;
    constructor();
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList>;
    /**
     * 提供函数名补全
     */
    private provideFunctionCompletions;
    /**
     * 提供参数补全
     */
    private provideParameterCompletions;
    /**
     * 清理令牌键名（移除引号）
     */
    private cleanTokenKey;
    /**
     * 获取令牌详细信息
     */
    private getTokenDetail;
    /**
     * 获取令牌文档
     */
    private getTokenDocumentation;
}
//# sourceMappingURL=completion.d.ts.map