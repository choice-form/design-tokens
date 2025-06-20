import * as vscode from "vscode";
export declare class ColorDecorationProvider {
    private tokenLoader;
    private decorationType;
    constructor();
    /**
     * 更新颜色装饰
     */
    updateDecorations(editor: vscode.TextEditor): void;
    /**
     * 清理装饰器
     */
    dispose(): void;
}
//# sourceMappingURL=color-decoration.d.ts.map