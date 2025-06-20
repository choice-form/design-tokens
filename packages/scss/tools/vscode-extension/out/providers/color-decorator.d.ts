import * as vscode from "vscode";
export declare class ColorDecorator {
    private tokenLoader;
    private decorationTypes;
    constructor();
    /**
     * 更新编辑器中的颜色装饰
     */
    updateDecorations(editor: vscode.TextEditor): void;
    /**
     * 清理编辑器中的所有颜色装饰
     */
    clearDecorations(editor: vscode.TextEditor): void;
    /**
     * 获取或创建装饰类型
     */
    private getOrCreateDecorationType;
    /**
     * 标准化颜色值
     */
    private normalizeColorValue;
    /**
     * 根据背景色计算对比度较好的文字颜色
     */
    private getContrastColor;
    /**
     * 清理所有装饰类型
     */
    dispose(): void;
}
//# sourceMappingURL=color-decorator.d.ts.map