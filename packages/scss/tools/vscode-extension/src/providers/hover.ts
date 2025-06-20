import * as vscode from "vscode"
import { TokenLoader } from "../utils/token-loader"
import { ScssParser } from "../utils/parser"
import { TOKEN_FUNCTIONS, ColorToken, SpacingToken, AnyToken } from "../types/tokens"

export class HoverProvider implements vscode.HoverProvider {
  private tokenLoader: TokenLoader

  constructor() {
    this.tokenLoader = TokenLoader.getInstance()
  }

  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.Hover> {
    const config = vscode.workspace.getConfiguration("designTokens")
    const prefix = config.get<string>("prefix", "dt")

    const parsedToken = ScssParser.getTokenAtPosition(document, position, prefix)
    if (!parsedToken) {
      return null
    }

    const range = ScssParser.getTokenRange(document, parsedToken)

    // 如果令牌无效，显示错误信息
    if (!parsedToken.isValid) {
      return new vscode.Hover(new vscode.MarkdownString(`❌ **错误:** ${parsedToken.error}`), range)
    }

    // 获取令牌函数信息
    const tokenFunction = TOKEN_FUNCTIONS.find((fn) => fn.name === parsedToken.functionName)
    if (!tokenFunction) {
      return null
    }

    // 获取令牌数据
    const tokenData = this.tokenLoader.findToken(tokenFunction.tokenType, parsedToken.tokenKey)
    if (!tokenData) {
      return new vscode.Hover(
        new vscode.MarkdownString(`❌ **令牌不存在:** ${parsedToken.tokenKey}`),
        range,
      )
    }

    // 生成悬停内容
    const hoverContent = this.generateHoverContent(tokenData, tokenFunction.tokenType, parsedToken)

    return new vscode.Hover(hoverContent, range)
  }

  /**
   * 生成悬停内容
   */
  private generateHoverContent(
    tokenData: AnyToken,
    tokenType: string,
    parsedToken: { functionName: string; tokenKey: string },
  ): vscode.MarkdownString {
    const md = new vscode.MarkdownString()
    md.supportHtml = true

    // 标题
    md.appendMarkdown(`### 🎨 ${parsedToken.functionName}("${parsedToken.tokenKey}")\n\n`)

    // 根据不同类型显示不同内容
    switch (tokenType) {
      case "colors":
        this.appendColorInfo(md, tokenData as ColorToken)
        break
      case "spacing":
        this.appendSpacingInfo(md, tokenData as SpacingToken)
        break
      case "radius":
      case "shadows":
      case "zindex":
        this.appendGenericTokenInfo(md, tokenData, tokenType)
        break
    }

    // 添加描述
    if (tokenData.description) {
      md.appendMarkdown(`\n**描述:** ${tokenData.description}\n`)
    }

    return md
  }

  /**
   * 添加颜色信息
   */
  private appendColorInfo(md: vscode.MarkdownString, colorToken: ColorToken): void {
    // 颜色预览
    if (colorToken.preview) {
      md.appendMarkdown(
        `<div style="width: 40px; height: 40px; background-color: ${colorToken.preview}; border: 1px solid #ccc; border-radius: 4px; display: inline-block; margin-bottom: 8px;"></div>\n\n`,
      )
    }

    // 颜色值
    md.appendMarkdown(`**颜色值:** \`${colorToken.value}\`\n`)

    // RGB 值
    if (colorToken.rgb) {
      md.appendMarkdown(`**RGB:** \`rgb(${colorToken.rgb})\`\n`)
    }

    // 类别和主题
    if (colorToken.category) {
      md.appendMarkdown(`**类别:** ${colorToken.category}\n`)
    }
    if (colorToken.theme) {
      md.appendMarkdown(`**主题:** ${colorToken.theme}\n`)
    }
  }

  /**
   * 添加间距信息
   */
  private appendSpacingInfo(md: vscode.MarkdownString, spacingToken: SpacingToken): void {
    // 间距值
    md.appendMarkdown(`**间距值:** \`${spacingToken.value}\`\n`)

    // 像素值
    if (spacingToken.pixelValue) {
      md.appendMarkdown(`**像素值:** \`${spacingToken.pixelValue}\`\n`)
    }

    // 可视化间距
    if (spacingToken.pixelValue) {
      const pixels = parseInt(spacingToken.pixelValue.replace("px", ""))
      if (pixels <= 100) {
        md.appendMarkdown(
          `\n**可视化预览:**\n<div style="width: ${pixels}px; height: 20px; background-color: #007acc; margin: 4px 0;"></div>\n`,
        )
      }
    }
  }

  /**
   * 添加通用令牌信息
   */
  private appendGenericTokenInfo(
    md: vscode.MarkdownString,
    tokenData: AnyToken,
    tokenType: string,
  ): void {
    const typeLabels: Record<string, string> = {
      radius: "圆角值",
      shadows: "阴影值",
      zindex: "层级值",
    }

    const label = typeLabels[tokenType] || "值"
    md.appendMarkdown(`**${label}:** \`${tokenData.value}\`\n`)

    if ("category" in tokenData && tokenData.category) {
      md.appendMarkdown(`**类别:** ${tokenData.category}\n`)
    }

    if ("theme" in tokenData && tokenData.theme) {
      md.appendMarkdown(`**主题:** ${tokenData.theme}\n`)
    }
  }
}
