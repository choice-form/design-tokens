import * as vscode from "vscode"
import { TokenLoader } from "../utils/token-loader"
import { ScssParser } from "../utils/parser"
import { TOKEN_FUNCTIONS } from "../types/tokens"

export class DiagnosticsProvider {
  private tokenLoader: TokenLoader
  private diagnosticsCollection: vscode.DiagnosticCollection

  constructor(context: vscode.ExtensionContext) {
    this.tokenLoader = TokenLoader.getInstance()
    this.diagnosticsCollection = vscode.languages.createDiagnosticCollection("designTokens")
    context.subscriptions.push(this.diagnosticsCollection)
  }

  /**
   * 更新文档的诊断信息
   */
  public updateDiagnostics(document: vscode.TextDocument): void {
    const config = vscode.workspace.getConfiguration("designTokens")
    const enableDiagnostics = config.get<boolean>("enableDiagnostics", true)

    if (!enableDiagnostics) {
      this.diagnosticsCollection.delete(document.uri)
      return
    }

    const prefix = config.get<string>("prefix", "dt")
    const diagnostics: vscode.Diagnostic[] = []

    // 解析文档中的所有令牌
    const tokens = ScssParser.parseDocument(document, prefix)

    for (const token of tokens) {
      const range = ScssParser.getTokenRange(document, token)

      // 检查函数名是否有效
      if (!token.isValid && token.error) {
        const diagnostic = new vscode.Diagnostic(
          range,
          token.error,
          vscode.DiagnosticSeverity.Error,
        )
        diagnostic.code = "invalid-function"
        diagnostic.source = "Design Tokens"
        diagnostics.push(diagnostic)
        continue
      }

      // 检查令牌是否存在
      const tokenFunction = TOKEN_FUNCTIONS.find((fn) => fn.name === token.functionName)
      if (tokenFunction) {
        const tokenExists = this.tokenLoader.hasToken(tokenFunction.tokenType, token.tokenKey)

        if (!tokenExists) {
          const parameterRange = ScssParser.getTokenParameterRange(document, token)
          const range = parameterRange || ScssParser.getTokenRange(document, token)

          const diagnostic = new vscode.Diagnostic(
            range,
            `令牌 "${token.tokenKey}" 不存在于 ${tokenFunction.tokenType} 中`,
            vscode.DiagnosticSeverity.Error,
          )
          diagnostic.code = "token-not-found"
          diagnostic.source = "Design Tokens"

          // 添加快速修复建议
          this.addQuickFixSuggestions(diagnostic, tokenFunction.tokenType, token.tokenKey)

          diagnostics.push(diagnostic)
        }
      }
    }

    this.diagnosticsCollection.set(document.uri, diagnostics)
  }

  /**
   * 添加快速修复建议
   */
  private addQuickFixSuggestions(
    diagnostic: vscode.Diagnostic,
    tokenType: "colors" | "spacing" | "radius" | "shadows" | "zindex" | "typography",
    invalidKey: string,
  ): void {
    const availableTokens = this.tokenLoader.getTokensByType(tokenType)

    // 找到最相似的令牌名称
    const suggestions = this.findSimilarTokens(invalidKey, availableTokens, 3)

    if (suggestions.length > 0) {
      const suggestionText = suggestions.map((s) => `"${s}"`).join(", ")
      diagnostic.message += `\n\n建议的令牌: ${suggestionText}`
    }
  }

  /**
   * 查找相似的令牌名称
   */
  private findSimilarTokens(
    target: string,
    tokens: { key: string }[],
    maxResults: number,
  ): string[] {
    const similarities = tokens.map((token) => {
      const key = token.key.replace(/^["']|["']$/g, "") // 移除引号
      return {
        key,
        similarity: this.calculateSimilarity(target.toLowerCase(), key.toLowerCase()),
      }
    })

    return similarities
      .filter((item) => item.similarity > 0.3) // 相似度阈值
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, maxResults)
      .map((item) => item.key)
  }

  /**
   * 计算字符串相似度
   */
  private calculateSimilarity(str1: string, str2: string): number {
    // 使用简单的编辑距离算法
    const matrix: number[][] = []
    const len1 = str1.length
    const len2 = str2.length

    // 初始化矩阵
    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i]
    }
    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j
    }

    // 填充矩阵
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // 替换
            matrix[i][j - 1] + 1, // 插入
            matrix[i - 1][j] + 1, // 删除
          )
        }
      }
    }

    const maxLength = Math.max(len1, len2)
    return maxLength === 0 ? 1 : 1 - matrix[len1][len2] / maxLength
  }

  /**
   * 清理指定文档的诊断信息
   */
  public clearDiagnostics(document: vscode.TextDocument): void {
    this.diagnosticsCollection.delete(document.uri)
  }

  /**
   * 清理所有诊断信息
   */
  public clearAllDiagnostics(): void {
    this.diagnosticsCollection.clear()
  }

  /**
   * 销毁资源
   */
  public dispose(): void {
    this.diagnosticsCollection.dispose()
  }
}
