import * as fs from "fs"
import * as path from "path"
import * as vscode from "vscode"
import { TokensData, AnyToken } from "../types/tokens"

export class TokenLoader {
  private static instance: TokenLoader
  private tokensData: TokensData | null = null
  private tokensPath: string | null = null
  private watcher: vscode.FileSystemWatcher | null = null

  private constructor() {}

  public static getInstance(): TokenLoader {
    if (!TokenLoader.instance) {
      TokenLoader.instance = new TokenLoader()
    }
    return TokenLoader.instance
  }

  /**
   * 初始化令牌加载器
   */
  public async initialize(context: vscode.ExtensionContext): Promise<void> {
    await this.loadTokensData()
    this.setupFileWatcher(context)
  }

  /**
   * 获取令牌数据
   */
  public getTokensData(): TokensData | null {
    return this.tokensData
  }

  /**
   * 重新加载令牌数据
   */
  public async reloadTokensData(): Promise<void> {
    await this.loadTokensData()
  }

  /**
   * 加载令牌数据
   */
  private async loadTokensData(): Promise<void> {
    try {
      const config = vscode.workspace.getConfiguration("designTokens")
      const tokensPath = config.get<string>("tokensPath")

      if (!tokensPath) {
        console.warn("⚠️ 令牌路径未配置")
        return
      }

      // 解析相对路径
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0]
      if (!workspaceFolder) {
        console.warn("⚠️ 未找到工作区文件夹")
        return
      }

      const absolutePath = path.resolve(workspaceFolder.uri.fsPath, tokensPath)
      this.tokensPath = absolutePath

      if (!fs.existsSync(absolutePath)) {
        console.warn(`⚠️ 令牌数据文件不存在: ${absolutePath}`)
        return
      }

      const fileContent = await fs.promises.readFile(absolutePath, "utf8")
      this.tokensData = JSON.parse(fileContent)

      const stats = this.getTokensStats()
      console.log(
        `✅ 已加载令牌数据: ${stats.colors} 颜色, ${stats.spacing} 间距, ${stats.radius} 圆角, ${stats.shadows} 阴影, ${stats.zindex} 层级`,
      )
    } catch (error) {
      console.error(`❌ 加载令牌数据失败: ${error}`)
      this.tokensData = null
    }
  }

  /**
   * 设置文件监听器
   */
  private setupFileWatcher(context: vscode.ExtensionContext): void {
    if (this.watcher) {
      this.watcher.dispose()
    }

    if (!this.tokensPath) {
      return
    }

    this.watcher = vscode.workspace.createFileSystemWatcher(this.tokensPath)

    this.watcher.onDidChange(async () => {
      console.log("📁 令牌文件已更改，正在重新加载...")
      await this.reloadTokensData()
    })

    context.subscriptions.push(this.watcher)
  }

  /**
   * 获取令牌统计信息
   */
  private getTokensStats(): {
    colors: number
    radius: number
    shadows: number
    spacing: number
    zindex: number
  } {
    if (!this.tokensData) {
      return { colors: 0, spacing: 0, radius: 0, shadows: 0, zindex: 0 }
    }

    return {
      colors: this.tokensData.data.colors.length,
      spacing: this.tokensData.data.spacing.length,
      radius: this.tokensData.data.radius.length,
      shadows: this.tokensData.data.shadows.length,
      zindex: this.tokensData.data.zindex.length,
    }
  }

  /**
   * 获取指定类型的令牌
   */
  public getTokensByType(type: keyof TokensData["data"]): AnyToken[] {
    if (!this.tokensData) {
      return []
    }
    return this.tokensData.data[type] || []
  }

  /**
   * 查找令牌
   */
  public findToken(type: keyof TokensData["data"], key: string): AnyToken | null {
    const tokens = this.getTokensByType(type)
    return (
      tokens.find(
        (token) =>
          token.key === key || token.key === `"${key}"` || token.key.replace(/"/g, "") === key,
      ) || null
    )
  }

  /**
   * 检查令牌是否存在
   */
  public hasToken(type: keyof TokensData["data"], key: string): boolean {
    return this.findToken(type, key) !== null
  }

  /**
   * 销毁资源
   */
  public dispose(): void {
    if (this.watcher) {
      this.watcher.dispose()
      this.watcher = null
    }
  }
}
