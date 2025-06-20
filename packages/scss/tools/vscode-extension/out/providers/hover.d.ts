import * as vscode from "vscode";
export declare class HoverProvider implements vscode.HoverProvider {
    private tokenLoader;
    constructor();
    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover>;
    /**
     * 生成悬停内容
     */
    private generateHoverContent;
    /**
     * 添加颜色信息
     */
    private appendColorInfo;
    /**
     * 添加间距信息
     */
    private appendSpacingInfo;
    /**
     * 添加通用令牌信息
     */
    private appendGenericTokenInfo;
}
//# sourceMappingURL=hover.d.ts.map