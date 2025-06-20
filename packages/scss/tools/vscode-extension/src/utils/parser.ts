import * as vscode from "vscode"
import { ParsedToken, TOKEN_FUNCTIONS } from "../types/tokens"

export class ScssParser {
  /**
   * 解析文档中的设计令牌
   */
  public static parseDocument(document: vscode.TextDocument, prefix: string): ParsedToken[] {
    const tokens: ParsedToken[] = []
    const text = document.getText()

    // 创建正则表达式匹配 prefix.function("token") 或 prefix.function(token) 模式
    const regex = new RegExp(
      `\\b${this.escapeRegex(prefix)}\\.(\\w+)\\(\\s*(?:["']([^"']+)["']|(\\d+(?:\\.\\d+)?|\\w+))\\s*\\)`,
      "g",
    )

    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, functionName, quotedToken, unquotedToken] = match
      const tokenKey = quotedToken || unquotedToken
      const startPos = match.index
      const endPos = startPos + fullMatch.length

      // 检查是否在注释中
      if (this.isInComment(text, startPos)) {
        continue
      }

      // 检查是否在函数定义内部
      if (this.isInFunctionDefinition(text, startPos)) {
        continue
      }

      // 验证函数名是否有效
      const tokenFunction = TOKEN_FUNCTIONS.find((fn) => fn.name === functionName)
      const isValid = tokenFunction !== undefined

      tokens.push({
        functionName,
        tokenKey,
        range: { start: startPos, end: endPos },
        isValid,
        error: isValid ? undefined : `未知的令牌函数: ${functionName}`,
      })
    }

    return tokens
  }

  /**
   * 获取指定位置的令牌信息
   */
  public static getTokenAtPosition(
    document: vscode.TextDocument,
    position: vscode.Position,
    prefix: string,
  ): ParsedToken | null {
    const tokens = this.parseDocument(document, prefix)
    const offset = document.offsetAt(position)

    return tokens.find((token) => offset >= token.range.start && offset <= token.range.end) || null
  }

  /**
   * 获取当前光标位置的上下文信息
   */
  public static getCompletionContext(
    document: vscode.TextDocument,
    position: vscode.Position,
    prefix: string,
  ): {
    functionName?: string
    partialText?: string
    type: "function" | "parameter" | "none"
  } {
    const line = document.lineAt(position)
    const lineText = line.text.substr(0, position.character)

    // 检查是否在输入函数名
    const functionMatch = new RegExp(`\\b${this.escapeRegex(prefix)}\\.(\\w*)$`).exec(lineText)
    if (functionMatch) {
      return {
        type: "function",
        partialText: functionMatch[1],
      }
    }

    // 检查是否在函数参数中（支持带引号和不带引号的参数）
    const paramMatch = new RegExp(
      `\\b${this.escapeRegex(prefix)}\\.(\\w+)\\(\\s*(?:["']([^"'()]*)$|([^"'()\\s]*)$)`,
    ).exec(lineText)

    if (paramMatch) {
      return {
        type: "parameter",
        functionName: paramMatch[1],
        partialText: paramMatch[2] || paramMatch[3] || "",
      }
    }

    return { type: "none" }
  }

  /**
   * 检查位置是否在注释中
   */
  private static isInComment(text: string, position: number): boolean {
    // 找到该位置所在的行
    const lineStart = text.lastIndexOf("\n", position - 1) + 1
    const lineEnd = text.indexOf("\n", position)
    const line = text.slice(lineStart, lineEnd === -1 ? text.length : lineEnd)

    // 检查该行是否包含 //，且 // 在当前位置之前
    const commentStart = line.indexOf("//")
    if (commentStart !== -1) {
      const positionInLine = position - lineStart
      if (positionInLine >= commentStart) {
        return true
      }
    }

    // 检查是否在多行注释中
    const beforeText = text.slice(0, position)
    const multiCommentStart = beforeText.lastIndexOf("/*")
    const multiCommentEnd = beforeText.lastIndexOf("*/")

    return multiCommentStart > multiCommentEnd
  }

  /**
   * 检查位置是否在函数定义内部
   */
  private static isInFunctionDefinition(text: string, position: number): boolean {
    // 向前查找最近的 @function 或 @mixin
    const beforeText = text.slice(0, position)
    const functionDefMatches = [...beforeText.matchAll(/@(?:function|mixin)\s+[\w-]+\s*\(/g)]

    if (functionDefMatches.length === 0) {
      return false
    }

    // 找到最后一个函数定义的位置
    const lastFunctionDef = functionDefMatches[functionDefMatches.length - 1]
    const functionStart = lastFunctionDef.index!

    // 从函数定义开始查找对应的 { 和 }
    let braceCount = 0
    let foundOpenBrace = false

    for (let i = functionStart; i < position; i++) {
      const char = text[i]
      if (char === "{") {
        braceCount++
        foundOpenBrace = true
      } else if (char === "}") {
        braceCount--
        if (braceCount === 0 && foundOpenBrace) {
          // 函数定义已结束
          return false
        }
      }
    }

    // 如果还有未匹配的 {，说明在函数内部
    return foundOpenBrace && braceCount > 0
  }

  /**
   * 转义正则表达式特殊字符
   */
  private static escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }

  /**
   * 获取令牌的完整范围（包括引号）
   */
  public static getTokenRange(document: vscode.TextDocument, token: ParsedToken): vscode.Range {
    const startPos = document.positionAt(token.range.start)
    const endPos = document.positionAt(token.range.end)
    return new vscode.Range(startPos, endPos)
  }

  /**
   * 获取令牌参数的范围（不包括引号）
   */
  public static getTokenParameterRange(
    document: vscode.TextDocument,
    token: ParsedToken,
  ): vscode.Range | null {
    const text = document.getText()
    const tokenText = text.slice(token.range.start, token.range.end)

    // 匹配参数部分（支持带引号和不带引号的内容）
    const quotedParamMatch = /\(\s*["']([^"']+)["']\s*\)/.exec(tokenText)
    const unquotedParamMatch = /\(\s*(\d+(?:\.\d+)?|\w+)\s*\)/.exec(tokenText)

    const paramMatch = quotedParamMatch || unquotedParamMatch
    if (!paramMatch) {
      return null
    }

    const paramStart = token.range.start + tokenText.indexOf(paramMatch[1])
    const paramEnd = paramStart + paramMatch[1].length

    return new vscode.Range(document.positionAt(paramStart), document.positionAt(paramEnd))
  }
}
