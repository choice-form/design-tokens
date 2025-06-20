# Design JS Tokens

> 现代 CSS-in-JS 设计令牌系统，基于 Linaria，具备 TypeScript 类型安全、零运行时开销和完整主题支持

## 特性

- 🎯 **精确间距** - 基于 0.25rem 单位的间距系统
- 🔧 **灵活 API** - 支持预设值和任意数值，完整的 TypeScript 类型提示
- 🎨 **主题支持** - 自动适配明暗主题，使用 CSS 自定义属性实现主题切换
- 🚀 **零运行时** - Linaria 编译时生成 CSS，生产环境零 JavaScript 运行时开销
- 📏 **完整系统** - 间距、颜色、阴影、排版、圆角等完整设计令牌系统
- 🔀 **兼容性** - 与 SCSS 版本完全兼容，令牌名称和 CSS 变量名一致

## 安装

```bash
pnpm add @choiceform/design-js-tokens
```

## 基本使用

### 导入基础样式

```typescript
// 导入基础重置样式（可选，但推荐）
import "@choiceform/design-js-tokens/preflight.css"
```

这个文件包含了：

- 现代的 CSS 重置样式
- 基础的元素样式标准化
- 优化的表单控件样式
- 改进的可访问性支持

### 初始化 CSS 变量

```typescript
import { init } from "@choiceform/design-js-tokens"

// 在应用启动时初始化 CSS 变量
const tokensCSS = init()

// 将 CSS 插入到页面中
const style = document.createElement("style")
style.textContent = tokensCSS
document.head.appendChild(style)
```

### 使用设计令牌

#### 方式一：styled API（推荐）

```typescript
import { spacing, color, shadow } from '@choiceform/design-js-tokens'
import { styled } from '@linaria/react'

// 创建 styled 组件
const Button = styled.button`
  padding: ${spacing(3)} ${spacing(6)};
  margin: ${spacing(4)};
  background-color: ${color('bg-accent')};
  color: ${color('fg-on-accent')};
  box-shadow: ${shadow('md')};

  &:hover {
    opacity: 0.9;
  }
`

// 支持动态属性
const Card = styled.div<{ variant?: 'primary' | 'secondary' }>`
  padding: ${spacing(6)};
  background-color: ${props =>
    props.variant === 'primary'
      ? color('bg-accent')
      : color('bg-secondary')
  };
`

// 使用组件
<Button>点击按钮</Button>
<Card variant="primary">卡片内容</Card>
```

#### 方式二：css API

```typescript
import { spacing, color, shadow } from '@choiceform/design-js-tokens'
import { css } from '@linaria/core'

// 创建样式类
const buttonStyle = css`
  padding: ${spacing(3)} ${spacing(6)};
  margin: ${spacing(4)};
  background-color: ${color('bg-accent')};
  color: ${color('fg-on-accent')};
  box-shadow: ${shadow('md')};
`

// 使用样式类
<button className={buttonStyle}>点击按钮</button>
```

### 主题切换

```typescript
// HTML 元素添加 data-theme 属性或 .dark 类
document.documentElement.classList.add("dark")

// 颜色会自动适配主题
const Card = styled.div`
  background-color: ${color("bg-default")};
  color: ${color("fg-default")};
  border: 1px solid ${color("bd-default")};

  transition: all 0.3s ease;
`

// 主题切换组件示例
const ThemeToggle = styled.button`
  padding: ${spacing(2)} ${spacing(3)};
  background-color: ${color("bg-secondary")};
  color: ${color("fg-default")};
  border: 1px solid ${color("bd-default")};
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${color("bg-selected")};
  }
`
```

## API 参考

### 间距函数

```typescript
import { spacing, spacingList } from "@choiceform/design-js-tokens"

// 单个间距值
spacing(4) // "calc(var(--cdt-spacing) * 4)"
spacing(0) // "0"
spacing("px") // "1px"
spacing("md") // "var(--cdt-breakpoint-md)" (断点别名)

// 多个间距值（用于 padding, margin 简写）
spacingList(4) // "calc(var(--cdt-spacing) * 4)"
spacingList(2, 4) // "calc(var(--cdt-spacing) * 2) calc(var(--cdt-spacing) * 4)"
spacingList(1, 2, 3, 4) // "calc(...) calc(...) calc(...) calc(...)"
```

### 颜色函数

```typescript
import { color } from "@choiceform/design-js-tokens"

// 基础颜色
color("blue-500") // "rgba(var(--cdt-blue-500), 1)"
color("red-500", 0.8) // "rgba(var(--cdt-red-500), 0.8)"

// 语义颜色（自动适配主题）
color("fg-default") // "rgba(var(--cdt-foreground-default), 1)"
color("bg-accent") // "rgba(var(--cdt-accent-background), 1)"
color("bd-default") // "rgba(var(--cdt-boundary-default), 1)"
```

### 阴影函数

```typescript
import { shadow } from "@choiceform/design-js-tokens"

shadow("sm") // "var(--cdt-shadow-sm)"
shadow("md") // "var(--cdt-shadow-md)"
shadow("tooltip") // "var(--cdt-shadow-tooltip)"
```

### 其他令牌

```typescript
import { radius, fontSize, fontWeight } from "@choiceform/design-js-tokens"

radius("sm") // "var(--cdt-radius-sm)"
fontSize("lg") // "var(--cdt-font-size-lg)"
fontWeight("bold") // "var(--cdt-font-weight-bold)"
```

## 设计令牌

### 间距系统

基于 `0.25rem` (4px) 的间距系统：

- **预设值**: 0, px, 0.5, 1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96
- **任意数值**: 支持任何数值 (如 2.5, 7.5, 15 等)
- **断点别名**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

### 颜色系统

完整的颜色调色板，支持明暗主题：

- **基础色**: 包含完整的颜色阶梯 (100-950)
- **语义色**: 前景色 (fg-_), 背景色 (bg-_), 边框色 (bd-\*)
- **主题适配**: 自动根据 `.dark` 类或 `data-theme="dark"` 属性切换

### 阴影系统

- **基础阴影**: shapes, stickies, tooltip, menu, modals
- **语义大小**: xs, sm, md, lg, xl
- **特殊功能**: focus, line, border, inset-border

## 开发

### 启动开发服务器

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 类型检查

```bash
pnpm type-check
```

## 与 SCSS 版本的差异

此 Linaria 版本与 SCSS 版本完全兼容：

- ✅ 相同的设计令牌值
- ✅ 相同的 CSS 变量名 (--cdt- 前缀)
- ✅ 相同的主题切换机制
- ✅ 相同的函数名称和参数

唯一的差异是语法：

```scss
// SCSS 版本
.button {
  padding: dt.spacing(3) dt.spacing(6);
  background-color: dt.color("bg-accent");

  &:hover {
    opacity: 0.9;
  }
}
```

```typescript
// Linaria 版本 - styled API（推荐）
const Button = styled.button`
  padding: ${spacing(3)} ${spacing(6)};
  background-color: ${color("bg-accent")};

  &:hover {
    opacity: 0.9;
  }
`

// 或者使用 css API
const buttonClass = css`
  padding: ${spacing(3)} ${spacing(6)};
  background-color: ${color("bg-accent")};
`
```

## 许可证

MIT
