# Design JS Tokens 使用指南

## 🚀 快速开始

### 方式一：自动导入（推荐）

**最简单的使用方式 - 导入即用，适用于任何构建工具！**

```tsx
// 在应用入口文件的最开始导入
import "@choiceform/design-js-tokens"

// 然后正常使用你的组件
import App from "./App"
```

**适用场景**：

- ✅ 任何构建工具（Vite、Webpack、Rollup、Parcel等）
- ✅ 任何框架（React、Vue、Angular、原生JS等）
- ✅ 零配置，导入即用

### 方式二：手动调用

```tsx
import { initTokens } from "@choiceform/design-js-tokens"

// 手动初始化CSS变量
initTokens()

// 然后使用你的组件
import App from "./App"
```

## 📦 在不同构建工具中使用

### Vite

```tsx
// main.tsx 或 main.js
import "@choiceform/design-js-tokens"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(<App />)
```

### Webpack

```tsx
// index.js 或 index.tsx
import "@choiceform/design-js-tokens"
import App from "./App"

ReactDOM.render(<App />, document.getElementById("root"))
```

### Next.js

```tsx
// pages/_app.tsx 或 app/layout.tsx
import "@choiceform/design-js-tokens"

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

### Nuxt.js

```js
// nuxt.config.js
export default {
  css: ["@choiceform/design-js-tokens"],
}
```

## 🎨 使用设计令牌

导入CSS变量后，就可以在Linaria中使用设计令牌了：

```tsx
import { styled } from "@linaria/react"
import { spacing, color, shadow } from "@choiceform/design-js-tokens"

const Button = styled.button`
  padding: ${spacing(3)} ${spacing(6)};
  background-color: ${color("bg-accent")};
  color: ${color("fg-on-accent")};
  box-shadow: ${shadow("md")};
  border-radius: ${spacing(2)};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${color("bg-accent-active")};
  }
`
```

## 🌗 主题切换

CSS变量会自动适配明暗主题：

```tsx
// 切换到暗色主题
document.documentElement.classList.add("dark")

// 或使用 data 属性
document.documentElement.setAttribute("data-theme", "dark")

// 切换回明亮主题
document.documentElement.classList.remove("dark")
document.documentElement.removeAttribute("data-theme")
```

## ⚡ 性能特点

- **零运行时开销**：CSS变量在构建时生成
- **自动优化**：CSS变量在文件开头，确保正确的层叠顺序
- **缓存友好**：CSS文件独立缓存
- **按需加载**：只有使用的令牌会被包含在最终bundle中

## 🔧 高级用法

### 自定义主题

```tsx
import { theme } from "@choiceform/design-js-tokens"

// 生成自定义主题的CSS
const customThemeCSS = theme("compact", ".compact-theme", {
  spacing: "0.125rem", // 更紧凑的间距
})

// 手动插入到页面
const style = document.createElement("style")
style.textContent = customThemeCSS
document.head.appendChild(style)
```

### 只使用部分功能

```tsx
// 只导入函数，不自动注入CSS变量
import { spacing, color } from "@choiceform/design-js-tokens"

// 手动管理CSS变量
import { generateFullCssVariables } from "@choiceform/design-js-tokens/css-variables"
```

## 🔗 文件名配置

生成的CSS和JS文件默认使用 `cdt-` 前缀，如：

- `cdt-[hash].css`
- `cdt-[hash].js`

这与设计令牌的命名保持一致：

- CSS变量：`--cdt-spacing`, `--cdt-color-blue-500`
- CSS类名：`.cdt_xxxx`
