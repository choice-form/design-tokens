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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const token_loader_1 = require("./utils/token-loader");
const completion_1 = require("./providers/completion");
const hover_1 = require("./providers/hover");
const diagnostics_1 = require("./providers/diagnostics");
const color_decorator_1 = require("./providers/color-decorator");
let diagnosticsProvider;
let colorDecorator;
async function activate(context) {
    console.log("🎨 Design Tokens IntelliSense 扩展已激活");
    try {
        // 初始化令牌加载器
        const tokenLoader = token_loader_1.TokenLoader.getInstance();
        await tokenLoader.initialize(context);
        // 注册完成提供者
        const completionProvider = new completion_1.CompletionProvider();
        const completionDisposable = vscode.languages.registerCompletionItemProvider(["scss", "sass"], completionProvider, ".", '"', "'");
        context.subscriptions.push(completionDisposable);
        // 注册悬停提供者
        const hoverProvider = new hover_1.HoverProvider();
        const hoverDisposable = vscode.languages.registerHoverProvider(["scss", "sass"], hoverProvider);
        context.subscriptions.push(hoverDisposable);
        // 注册诊断提供者
        diagnosticsProvider = new diagnostics_1.DiagnosticsProvider(context);
        // 初始化颜色装饰器
        colorDecorator = new color_decorator_1.ColorDecorator();
        // 监听文档变化，更新诊断信息和颜色装饰
        const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument((event) => {
            if (event.document.languageId === "scss" || event.document.languageId === "sass") {
                // 延迟更新诊断，避免频繁更新
                setTimeout(() => {
                    diagnosticsProvider.updateDiagnostics(event.document);
                }, 500);
                // 更新颜色装饰
                const editor = vscode.window.activeTextEditor;
                if (editor && editor.document === event.document) {
                    setTimeout(() => {
                        colorDecorator.updateDecorations(editor);
                    }, 300);
                }
            }
        });
        context.subscriptions.push(onDidChangeTextDocument);
        // 监听活动编辑器变化，更新颜色装饰
        const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor((editor) => {
            if (editor &&
                (editor.document.languageId === "scss" || editor.document.languageId === "sass")) {
                colorDecorator.updateDecorations(editor);
            }
        });
        context.subscriptions.push(onDidChangeActiveTextEditor);
        // 监听文档打开，初始化诊断信息和颜色装饰
        const onDidOpenTextDocument = vscode.workspace.onDidOpenTextDocument((document) => {
            if (document.languageId === "scss" || document.languageId === "sass") {
                diagnosticsProvider.updateDiagnostics(document);
                // 更新活动编辑器的颜色装饰
                const editor = vscode.window.activeTextEditor;
                if (editor && editor.document === document) {
                    colorDecorator.updateDecorations(editor);
                }
            }
        });
        context.subscriptions.push(onDidOpenTextDocument);
        // 监听文档关闭，清理诊断信息
        const onDidCloseTextDocument = vscode.workspace.onDidCloseTextDocument((document) => {
            diagnosticsProvider.clearDiagnostics(document);
        });
        context.subscriptions.push(onDidCloseTextDocument);
        // 为已打开的文档初始化诊断
        vscode.workspace.textDocuments.forEach((document) => {
            if (document.languageId === "scss" || document.languageId === "sass") {
                diagnosticsProvider.updateDiagnostics(document);
            }
        });
        // 为当前活动编辑器初始化颜色装饰
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor &&
            (activeEditor.document.languageId === "scss" || activeEditor.document.languageId === "sass")) {
            colorDecorator.updateDecorations(activeEditor);
        }
        // 注册刷新令牌命令
        const refreshCommand = vscode.commands.registerCommand("designTokens.refreshTokens", async () => {
            try {
                await tokenLoader.reloadTokensData();
                vscode.window.showInformationMessage("✅ 设计令牌已刷新");
                // 重新验证所有打开的文档
                vscode.workspace.textDocuments.forEach((document) => {
                    if (document.languageId === "scss" || document.languageId === "sass") {
                        diagnosticsProvider.updateDiagnostics(document);
                    }
                });
                // 重新更新颜色装饰
                const activeEditor = vscode.window.activeTextEditor;
                if (activeEditor &&
                    (activeEditor.document.languageId === "scss" ||
                        activeEditor.document.languageId === "sass")) {
                    colorDecorator.updateDecorations(activeEditor);
                }
            }
            catch (error) {
                vscode.window.showErrorMessage(`❌ 刷新设计令牌失败: ${error}`);
            }
        });
        context.subscriptions.push(refreshCommand);
        // 监听配置变化
        const onDidChangeConfiguration = vscode.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration("designTokens")) {
                // 配置变化时重新加载令牌并更新诊断
                tokenLoader.reloadTokensData().then(() => {
                    vscode.workspace.textDocuments.forEach((document) => {
                        if (document.languageId === "scss" || document.languageId === "sass") {
                            diagnosticsProvider.updateDiagnostics(document);
                        }
                    });
                    // 更新颜色装饰
                    const activeEditor = vscode.window.activeTextEditor;
                    if (activeEditor &&
                        (activeEditor.document.languageId === "scss" ||
                            activeEditor.document.languageId === "sass")) {
                        colorDecorator.updateDecorations(activeEditor);
                    }
                });
            }
        });
        context.subscriptions.push(onDidChangeConfiguration);
        console.log("✅ Design Tokens IntelliSense 扩展初始化完成");
        // 显示欢迎消息
        const config = vscode.workspace.getConfiguration("designTokens");
        const prefix = config.get("prefix", "dt");
        vscode.window
            .showInformationMessage(`🎨 Design Tokens IntelliSense 已启用！使用 ${prefix}. 开始使用智能提示。`, "了解更多")
            .then((selection) => {
            if (selection === "了解更多") {
                vscode.env.openExternal(vscode.Uri.parse("https://github.com/your-repo/design-system"));
            }
        });
    }
    catch (error) {
        console.error("❌ Design Tokens IntelliSense 扩展激活失败:", error);
        vscode.window.showErrorMessage(`❌ Design Tokens IntelliSense 激活失败: ${error}`);
    }
}
function deactivate() {
    console.log("🎨 Design Tokens IntelliSense 扩展已停用");
    // 清理资源
    if (diagnosticsProvider) {
        diagnosticsProvider.dispose();
    }
    if (colorDecorator) {
        colorDecorator.dispose();
    }
    const tokenLoader = token_loader_1.TokenLoader.getInstance();
    tokenLoader.dispose();
}
//# sourceMappingURL=extension.js.map