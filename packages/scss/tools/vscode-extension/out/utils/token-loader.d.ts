import * as vscode from "vscode";
import { TokensData, AnyToken } from "../types/tokens";
export declare class TokenLoader {
    private static instance;
    private tokensData;
    private tokensPath;
    private watcher;
    private constructor();
    static getInstance(): TokenLoader;
    /**
     * 初始化令牌加载器
     */
    initialize(context: vscode.ExtensionContext): Promise<void>;
    /**
     * 获取令牌数据
     */
    getTokensData(): TokensData | null;
    /**
     * 重新加载令牌数据
     */
    reloadTokensData(): Promise<void>;
    /**
     * 加载令牌数据
     */
    private loadTokensData;
    /**
     * 设置文件监听器
     */
    private setupFileWatcher;
    /**
     * 获取令牌统计信息
     */
    private getTokensStats;
    /**
     * 获取指定类型的令牌
     */
    getTokensByType(type: keyof TokensData["data"]): AnyToken[];
    /**
     * 查找令牌
     */
    findToken(type: keyof TokensData["data"], key: string): AnyToken | null;
    /**
     * 检查令牌是否存在
     */
    hasToken(type: keyof TokensData["data"], key: string): boolean;
    /**
     * 销毁资源
     */
    dispose(): void;
}
//# sourceMappingURL=token-loader.d.ts.map