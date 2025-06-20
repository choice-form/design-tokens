import * as vscode from "vscode"
import { TokenLoader } from "../utils/token-loader"
import { ScssParser } from "../utils/parser"
import { TOKEN_FUNCTIONS, ColorToken, AnyToken } from "../types/tokens"

export class CompletionProvider implements vscode.CompletionItemProvider {
  private tokenLoader: TokenLoader

  constructor() {
    this.tokenLoader = TokenLoader.getInstance()
  }

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext,
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    const config = vscode.workspace.getConfiguration("designTokens")
    const prefix = config.get<string>("prefix", "dt")

    const completionContext = ScssParser.getCompletionContext(document, position, prefix)

    switch (completionContext.type) {
      case "function":
        return this.provideFunctionCompletions(completionContext.partialText || "")

      case "parameter":
        return this.provideParameterCompletions(completionContext.functionName!)

      default:
        return []
    }
  }

  /**
   * 提供函数名补全
   */
  private provideFunctionCompletions(partialText: string): vscode.CompletionItem[] {
    return TOKEN_FUNCTIONS.filter((fn) =>
      fn.name.toLowerCase().includes(partialText.toLowerCase()),
    ).map((fn) => {
      const item = new vscode.CompletionItem(fn.name, vscode.CompletionItemKind.Function)
      item.detail = fn.description
      item.documentation = new vscode.MarkdownString(
        `**${fn.name}**\n\n${fn.description}\n\n**参数:**\n${fn.parameters
          .map(
            (p) =>
              `- \`${p.name}\` (${p.type}${p.required ? ", 必填" : ", 可选"}): ${p.description}`,
          )
          .join("\n")}`,
      )
      item.insertText = new vscode.SnippetString(`${fn.name}("\${1}")`)
      item.sortText = fn.name
      return item
    })
  }

  /**
   * 提供参数补全
   */
  private provideParameterCompletions(functionName: string): vscode.CompletionItem[] {
    const tokenFunction = TOKEN_FUNCTIONS.find((fn) => fn.name === functionName)
    if (!tokenFunction) {
      return []
    }

    const tokens = this.tokenLoader.getTokensByType(tokenFunction.tokenType)
    const config = vscode.workspace.getConfiguration("designTokens")
    const enableColorPreview = config.get<boolean>("enableColorPreview", true)

    return tokens.map((token) => {
      const key = this.cleanTokenKey(token.key)
      const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Value)

      // 设置详细信息
      item.detail = this.getTokenDetail(token, tokenFunction.tokenType)
      item.documentation = this.getTokenDocumentation(token, tokenFunction.tokenType)
      item.insertText = key
      item.sortText = key

      // 为颜色令牌添加颜色预览
      if (tokenFunction.tokenType === "colors" && enableColorPreview) {
        const colorToken = token as ColorToken
        if (colorToken.preview) {
          item.documentation = new vscode.MarkdownString(
            `<div style="width: 20px; height: 20px; background-color: ${colorToken.preview}; display: inline-block; margin-right: 8px; border: 1px solid #ccc;"></div> ${item.documentation}`,
          )
          item.documentation.supportHtml = true
        }
      }

      return item
    })
  }

  /**
   * 清理令牌键名（移除引号）
   */
  private cleanTokenKey(key: string): string {
    return key.replace(/^["']|["']$/g, "")
  }

  /**
   * 获取令牌详细信息
   */
  private getTokenDetail(token: AnyToken, tokenType: string): string {
    switch (tokenType) {
      case "colors":
        return String(token.value)
      case "spacing":
        return "pixelValue" in token && token.pixelValue ? token.pixelValue : `${token.value}px`
      case "radius":
      case "shadows":
      case "zindex":
        return String(token.value)
      case "typography":
        return String(token.value)
      default:
        return ""
    }
  }

  /**
   * 获取令牌文档
   */
  private getTokenDocumentation(token: AnyToken, tokenType: string): string {
    const parts: string[] = []

    if (token.description) {
      parts.push(token.description)
    }

    switch (tokenType) {
      case "colors":
        if ("rgb" in token && token.rgb) {
          parts.push(`RGB: ${token.rgb}`)
        }
        if ("category" in token && token.category) {
          parts.push(`类别: ${token.category}`)
        }
        if ("theme" in token && token.theme) {
          parts.push(`主题: ${token.theme}`)
        }
        break

      case "spacing":
        if ("pixelValue" in token && token.pixelValue && token.value !== token.pixelValue) {
          parts.push(`像素值: ${token.pixelValue}`)
        }
        break

      case "radius":
      case "shadows":
      case "zindex":
        if ("category" in token && token.category) {
          parts.push(`类别: ${token.category}`)
        }
        break

      case "typography":
        if ("category" in token && token.category) {
          parts.push(`类型: ${token.category}`)
        }
        break
    }

    return parts.join("\n")
  }
}
