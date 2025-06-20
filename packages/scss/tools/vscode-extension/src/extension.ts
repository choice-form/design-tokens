import * as vscode from "vscode"
import { TokenLoader } from "./utils/token-loader"
import { CompletionProvider } from "./providers/completion"
import { HoverProvider } from "./providers/hover"
import { DiagnosticsProvider } from "./providers/diagnostics"

let diagnosticsProvider: DiagnosticsProvider

export async function activate(context: vscode.ExtensionContext) {
  console.log("🎨 Design Tokens IntelliSense 扩展已激活")

  try {
    // 初始化令牌加载器
    const tokenLoader = TokenLoader.getInstance()
    await tokenLoader.initialize(context)

    // 注册完成提供者
    const completionProvider = new CompletionProvider()
    const completionDisposable = vscode.languages.registerCompletionItemProvider(
      ["scss", "sass"],
      completionProvider,
      ".",
      '"',
      "'",
    )
    context.subscriptions.push(completionDisposable)

    // 注册悬停提供者
    const hoverProvider = new HoverProvider()
    const hoverDisposable = vscode.languages.registerHoverProvider(["scss", "sass"], hoverProvider)
    context.subscriptions.push(hoverDisposable)

    // 注册诊断提供者
    diagnosticsProvider = new DiagnosticsProvider(context)

    // 监听文档变化，更新诊断信息
    const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument((event) => {
      if (event.document.languageId === "scss" || event.document.languageId === "sass") {
        // 延迟更新诊断，避免频繁更新
        setTimeout(() => {
          diagnosticsProvider.updateDiagnostics(event.document)
        }, 500)
      }
    })
    context.subscriptions.push(onDidChangeTextDocument)

    // 监听文档打开，初始化诊断信息
    const onDidOpenTextDocument = vscode.workspace.onDidOpenTextDocument((document) => {
      if (document.languageId === "scss" || document.languageId === "sass") {
        diagnosticsProvider.updateDiagnostics(document)
      }
    })
    context.subscriptions.push(onDidOpenTextDocument)

    // 监听文档关闭，清理诊断信息
    const onDidCloseTextDocument = vscode.workspace.onDidCloseTextDocument((document) => {
      diagnosticsProvider.clearDiagnostics(document)
    })
    context.subscriptions.push(onDidCloseTextDocument)

    // 为已打开的文档初始化诊断
    vscode.workspace.textDocuments.forEach((document) => {
      if (document.languageId === "scss" || document.languageId === "sass") {
        diagnosticsProvider.updateDiagnostics(document)
      }
    })

    // 注册刷新令牌命令
    const refreshCommand = vscode.commands.registerCommand(
      "designTokens.refreshTokens",
      async () => {
        try {
          await tokenLoader.reloadTokensData()
          vscode.window.showInformationMessage("✅ 设计令牌已刷新")

          // 重新验证所有打开的文档
          vscode.workspace.textDocuments.forEach((document) => {
            if (document.languageId === "scss" || document.languageId === "sass") {
              diagnosticsProvider.updateDiagnostics(document)
            }
          })
        } catch (error) {
          vscode.window.showErrorMessage(`❌ 刷新设计令牌失败: ${error}`)
        }
      },
    )
    context.subscriptions.push(refreshCommand)

    // 监听配置变化
    const onDidChangeConfiguration = vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration("designTokens")) {
        // 配置变化时重新加载令牌并更新诊断
        tokenLoader.reloadTokensData().then(() => {
          vscode.workspace.textDocuments.forEach((document) => {
            if (document.languageId === "scss" || document.languageId === "sass") {
              diagnosticsProvider.updateDiagnostics(document)
            }
          })
        })
      }
    })
    context.subscriptions.push(onDidChangeConfiguration)

    console.log("✅ Design Tokens IntelliSense 扩展初始化完成")

    // 显示欢迎消息
    const config = vscode.workspace.getConfiguration("designTokens")
    const prefix = config.get<string>("prefix", "dt")

    vscode.window
      .showInformationMessage(
        `🎨 Design Tokens IntelliSense 已启用！使用 ${prefix}. 开始使用智能提示。`,
        "了解更多",
      )
      .then((selection) => {
        if (selection === "了解更多") {
          vscode.env.openExternal(vscode.Uri.parse("https://github.com/your-repo/design-system"))
        }
      })
  } catch (error) {
    console.error("❌ Design Tokens IntelliSense 扩展激活失败:", error)
    vscode.window.showErrorMessage(`❌ Design Tokens IntelliSense 激活失败: ${error}`)
  }
}

export function deactivate() {
  console.log("🎨 Design Tokens IntelliSense 扩展已停用")

  // 清理资源
  if (diagnosticsProvider) {
    diagnosticsProvider.dispose()
  }

  const tokenLoader = TokenLoader.getInstance()
  tokenLoader.dispose()
}
