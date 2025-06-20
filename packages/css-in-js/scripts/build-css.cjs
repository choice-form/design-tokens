const fs = require("fs")
const path = require("path")

// 读取所有 token 文件
function loadTokens() {
  const tokensDir = path.resolve(__dirname, "../../../tokens")
  const tokens = {}

  const files = fs.readdirSync(tokensDir)
  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const name = path.basename(file, ".json")
      const content = JSON.parse(fs.readFileSync(path.join(tokensDir, file), "utf8"))
      tokens[name] = content
    }
  })

  return tokens
}

// 解析引用
function resolveReferences(value, tokens) {
  if (typeof value === "string" && value.startsWith("{") && value.endsWith("}")) {
    const refPath = value.slice(1, -1).split(".")
    let resolved = tokens
    for (const segment of refPath) {
      if (resolved && resolved[segment]) {
        resolved = resolved[segment]
      } else {
        return value // 无法解析，返回原值
      }
    }
    return resolved.value || resolved
  }
  return value
}

// 生成 CSS 变量
function generateCSS(tokens) {
  let css = ":root {\n"
  css += "  --cdt-spacing: 0.25rem;\n"

  // 断点
  if (tokens.breakpoints) {
    Object.entries(tokens.breakpoints).forEach(([key, token]) => {
      if (token.value) {
        const value = token.value.replace("px", "")
        const remValue = parseFloat(value) / 16
        css += `  --cdt-breakpoint-${key}: ${remValue}rem;\n`
      }
    })

    // 容器断点
    Object.entries(tokens.breakpoints).forEach(([key, token]) => {
      if (token.value) {
        if (key === "xs") {
          css += `  --cdt-container-${key}: none;\n`
        } else {
          const value = token.value.replace("px", "")
          const remValue = parseFloat(value) / 16
          css += `  --cdt-container-${key}: ${remValue}rem;\n`
        }
      }
    })
  }

  // 颜色 - 基础色
  if (tokens.colors && tokens.colors.base) {
    Object.entries(tokens.colors.base).forEach(([theme, colors]) => {
      Object.entries(colors).forEach(([colorName, shades]) => {
        if (typeof shades === "object" && shades.value) {
          // 单一颜色
          css += `  --cdt-${colorName}: ${shades.value};\n`
        } else if (typeof shades === "object") {
          // 色阶
          Object.entries(shades).forEach(([shade, token]) => {
            if (token.value) {
              css += `  --cdt-${colorName}-${shade}: ${token.value};\n`
            }
          })
        }
      })
    })
  }

  // 颜色 - pale 色
  if (tokens.colors && tokens.colors.pale) {
    Object.entries(tokens.colors.pale).forEach(([theme, colors]) => {
      Object.entries(colors).forEach(([colorName, shades]) => {
        Object.entries(shades).forEach(([shade, token]) => {
          if (token.value) {
            css += `  --cdt-${colorName}-pale-${shade}: ${token.value};\n`
          }
        })
      })
    })
  }

  // 语义色 - 前景色
  if (
    tokens.colors &&
    tokens.colors.semantic &&
    tokens.colors.semantic.light &&
    tokens.colors.semantic.light.foreground
  ) {
    Object.entries(tokens.colors.semantic.light.foreground).forEach(([key, token]) => {
      const value = resolveReferences(token.value, tokens.colors)
      css += `  --cdt-foreground-${key}: ${value};\n`
    })
  }

  // 语义色 - 背景色
  if (
    tokens.colors &&
    tokens.colors.semantic &&
    tokens.colors.semantic.light &&
    tokens.colors.semantic.light.background
  ) {
    Object.entries(tokens.colors.semantic.light.background).forEach(([key, token]) => {
      const value = resolveReferences(token.value, tokens.colors)
      css += `  --cdt-background-${key}: ${value};\n`
    })
  }

  // 语义色 - 图标色
  if (
    tokens.colors &&
    tokens.colors.semantic &&
    tokens.colors.semantic.light &&
    tokens.colors.semantic.light.icon
  ) {
    Object.entries(tokens.colors.semantic.light.icon).forEach(([key, token]) => {
      const value = resolveReferences(token.value, tokens.colors)
      css += `  --cdt-icon-${key}: ${value};\n`
    })
  }

  // 语义色 - 边框色
  if (
    tokens.colors &&
    tokens.colors.semantic &&
    tokens.colors.semantic.light &&
    tokens.colors.semantic.light.boundary
  ) {
    Object.entries(tokens.colors.semantic.light.boundary).forEach(([key, token]) => {
      const value = resolveReferences(token.value, tokens.colors)
      css += `  --cdt-boundary-${key}: ${value};\n`
    })
  }

  // 组合色
  if (tokens.colors && tokens.colors.combination && tokens.colors.combination.light) {
    Object.entries(tokens.colors.combination.light).forEach(([key, token]) => {
      const value = resolveReferences(token.value, tokens.colors)
      css += `  --cdt-${key}: ${value};\n`
    })
  }

  // 阴影
  if (tokens.shadows && tokens.shadows.light) {
    Object.entries(tokens.shadows.light).forEach(([key, token]) => {
      if (Array.isArray(token.value)) {
        css += `  --cdt-shadow-${key}:\n    ${token.value.join(",\n    ")};\n`
      } else {
        css += `  --cdt-shadow-${key}: ${token.value};\n`
      }
    })
  }

  // 字体
  if (tokens.typography) {
    // 处理 fontFamily
    if (tokens.typography.fontFamily) {
      Object.entries(tokens.typography.fontFamily).forEach(([key, token]) => {
        if (token.value && Array.isArray(token.value)) {
          css += `  --cdt-font-family-${key}:\n    ${token.value.join(", ")};\n`
        }
      })
    }

    // 处理 fontWeight
    if (tokens.typography.fontWeight) {
      Object.entries(tokens.typography.fontWeight).forEach(([key, token]) => {
        if (token.value) {
          css += `  --cdt-font-weight-${key}: ${token.value};\n`
        }
      })
    }

    // 处理 fontSize
    if (tokens.typography.fontSize) {
      Object.entries(tokens.typography.fontSize).forEach(([key, token]) => {
        if (token.value) {
          css += `  --cdt-font-size-${key}: ${token.value};\n`
        }
      })
    }

    // 处理 lineHeight
    if (tokens.typography.lineHeight) {
      Object.entries(tokens.typography.lineHeight).forEach(([key, token]) => {
        if (token.value) {
          css += `  --cdt-line-height-${key.replace("-", "-")}: ${token.value};\n`
        }
      })
    }

    // 处理 letterSpacing
    if (tokens.typography.letterSpacing) {
      Object.entries(tokens.typography.letterSpacing).forEach(([key, token]) => {
        if (token.value) {
          css += `  --cdt-letter-spacing-${key.replace("-", "-")}: ${token.value};\n`
        }
      })
    }
  }

  // z-index
  if (tokens.zindex) {
    Object.entries(tokens.zindex).forEach(([key, token]) => {
      if (token.value) {
        css += `  --cdt-z-${key}: ${token.value};\n`
      }
    })
  }

  // 圆角
  if (tokens.radius) {
    Object.entries(tokens.radius).forEach(([key, token]) => {
      if (token.value) {
        css += `  --cdt-radius-${key}: ${token.value};\n`
      }
    })
  }

  css += "}\n"

  // 暗色主题
  css += '.dark,\n[data-theme="dark"] {\n'

  // 暗色基础色
  if (tokens.colors && tokens.colors.base && tokens.colors.base.dark) {
    Object.entries(tokens.colors.base.dark).forEach(([colorName, shades]) => {
      if (typeof shades === "object" && shades.value) {
        // 单一颜色
        css += `  --cdt-${colorName}: ${shades.value};\n`
      } else if (typeof shades === "object") {
        // 色阶
        Object.entries(shades).forEach(([shade, token]) => {
          if (token.value) {
            css += `  --cdt-${colorName}-${shade}: ${token.value};\n`
          }
        })
      }
    })
  }

  // 暗色 pale 色
  if (tokens.colors && tokens.colors.pale && tokens.colors.pale.dark) {
    Object.entries(tokens.colors.pale.dark).forEach(([colorName, shades]) => {
      Object.entries(shades).forEach(([shade, token]) => {
        if (token.value) {
          css += `  --cdt-${colorName}-pale-${shade}: ${token.value};\n`
        }
      })
    })
  }

  // 暗色语义色
  if (tokens.colors && tokens.colors.semantic && tokens.colors.semantic.dark) {
    ;["foreground", "background", "icon", "boundary"].forEach((category) => {
      if (tokens.colors.semantic.dark[category]) {
        Object.entries(tokens.colors.semantic.dark[category]).forEach(([key, token]) => {
          const value = resolveReferences(token.value, tokens.colors)
          css += `  --cdt-${category}-${key}: ${value};\n`
        })
      }
    })
  }

  // 暗色组合色
  if (tokens.colors && tokens.colors.combination && tokens.colors.combination.dark) {
    Object.entries(tokens.colors.combination.dark).forEach(([key, token]) => {
      const value = resolveReferences(token.value, tokens.colors)
      css += `  --cdt-${key}: ${value};\n`
    })
  }

  // 暗色阴影
  if (tokens.shadows && tokens.shadows.dark) {
    Object.entries(tokens.shadows.dark).forEach(([key, token]) => {
      if (Array.isArray(token.value)) {
        css += `  --cdt-shadow-${key}:\n    ${token.value.join(",\n    ")};\n`
      } else {
        css += `  --cdt-shadow-${key}: ${token.value};\n`
      }
    })
  }

  css += "}\n"

  return css
}

// 主函数
function main() {
  try {
    const tokens = loadTokens()
    const css = generateCSS(tokens)

    const outputPath = path.resolve(__dirname, "../dist/design-tokens.css")
    fs.writeFileSync(outputPath, css, "utf8")

    console.log("✅ CSS tokens generated successfully!")
    console.log(`📁 Output: ${outputPath}`)
  } catch (error) {
    console.error("❌ Error generating CSS tokens:", error)
    process.exit(1)
  }
}

main()
