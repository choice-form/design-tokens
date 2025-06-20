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
exports.TokenLoader = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
class TokenLoader {
    constructor() {
        this.tokensData = null;
        this.tokensPath = null;
        this.watcher = null;
    }
    static getInstance() {
        if (!TokenLoader.instance) {
            TokenLoader.instance = new TokenLoader();
        }
        return TokenLoader.instance;
    }
    /**
     * 初始化令牌加载器
     */
    async initialize(context) {
        await this.loadTokensData();
        this.setupFileWatcher(context);
    }
    /**
     * 获取令牌数据
     */
    getTokensData() {
        return this.tokensData;
    }
    /**
     * 重新加载令牌数据
     */
    async reloadTokensData() {
        await this.loadTokensData();
    }
    /**
     * 加载令牌数据
     */
    async loadTokensData() {
        try {
            const config = vscode.workspace.getConfiguration("designTokens");
            const tokensPath = config.get("tokensPath");
            if (!tokensPath) {
                console.warn("⚠️ 令牌路径未配置");
                return;
            }
            // 解析相对路径
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                console.warn("⚠️ 未找到工作区文件夹");
                return;
            }
            const absolutePath = path.resolve(workspaceFolder.uri.fsPath, tokensPath);
            this.tokensPath = absolutePath;
            if (!fs.existsSync(absolutePath)) {
                console.warn(`⚠️ 令牌数据文件不存在: ${absolutePath}`);
                return;
            }
            const fileContent = await fs.promises.readFile(absolutePath, "utf8");
            this.tokensData = JSON.parse(fileContent);
            const stats = this.getTokensStats();
            console.log(`✅ 已加载令牌数据: ${stats.colors} 颜色, ${stats.spacing} 间距, ${stats.radius} 圆角, ${stats.shadows} 阴影, ${stats.zindex} 层级`);
        }
        catch (error) {
            console.error(`❌ 加载令牌数据失败: ${error}`);
            this.tokensData = null;
        }
    }
    /**
     * 设置文件监听器
     */
    setupFileWatcher(context) {
        if (this.watcher) {
            this.watcher.dispose();
        }
        if (!this.tokensPath) {
            return;
        }
        this.watcher = vscode.workspace.createFileSystemWatcher(this.tokensPath);
        this.watcher.onDidChange(async () => {
            console.log("📁 令牌文件已更改，正在重新加载...");
            await this.reloadTokensData();
        });
        context.subscriptions.push(this.watcher);
    }
    /**
     * 获取令牌统计信息
     */
    getTokensStats() {
        if (!this.tokensData) {
            return { colors: 0, spacing: 0, radius: 0, shadows: 0, zindex: 0 };
        }
        return {
            colors: this.tokensData.data.colors.length,
            spacing: this.tokensData.data.spacing.length,
            radius: this.tokensData.data.radius.length,
            shadows: this.tokensData.data.shadows.length,
            zindex: this.tokensData.data.zindex.length,
        };
    }
    /**
     * 获取指定类型的令牌
     */
    getTokensByType(type) {
        if (!this.tokensData) {
            return [];
        }
        return this.tokensData.data[type] || [];
    }
    /**
     * 查找令牌
     */
    findToken(type, key) {
        const tokens = this.getTokensByType(type);
        return (tokens.find((token) => token.key === key || token.key === `"${key}"` || token.key.replace(/"/g, "") === key) || null);
    }
    /**
     * 检查令牌是否存在
     */
    hasToken(type, key) {
        return this.findToken(type, key) !== null;
    }
    /**
     * 销毁资源
     */
    dispose() {
        if (this.watcher) {
            this.watcher.dispose();
            this.watcher = null;
        }
    }
}
exports.TokenLoader = TokenLoader;
//# sourceMappingURL=token-loader.js.map