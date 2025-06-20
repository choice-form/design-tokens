# 🚀 现代化设计令牌库使用指南

## 📋 概述

重构后的设计令牌库现在完全符合 W3C Design Tokens 标准，使用 Style Dictionary 构建，支持多种使用方式。

## 🏗️ 构建令牌

```bash
# 只构建设计令牌
pnpm build:tokens

# 完整构建（包括 TypeScript、CSS 变量等）
pnpm build
```

## 💡 使用方式

### **方式一：直接导入 CSS 变量（推荐）**

```typescript
// 在你的主 CSS/JS 文件中导入
import '@choiceform/design-js-tokens/design-tokens.css'
import '@choiceform/design-js-tokens/preflight.css' // 可选：基础样式重置

// 然后在 CSS 中使用
.button {
  padding: var(--spacing-4); /* 1rem */
  background-color: rgba(var(--color-primary), 1); /* 使用 RGB 值 */
}
```

### **方式二：使用 JavaScript 函数（兼容现有代码）**

```typescript
import { spacing, color } from "@choiceform/design-js-tokens";

// CSS-in-JS 中使用
const Button = styled.button`
  padding: ${spacing(4)}; /* 等同于 var(--spacing-4) */
  background-color: rgba(${color("primary")}, 1);
`;

// 在 Panda CSS 中使用
const buttonStyles = css({
  padding: spacing(4),
  backgroundColor: `rgba(${color("primary")}, 1)`,
});
```

### **方式三：在 CSS 文件中直接使用**

```css
/* 导入设计令牌 */
@import "@choiceform/design-js-tokens/design-tokens.css";
@import "@choiceform/design-js-tokens/preflight.css";

/* 使用令牌 */
.card {
  padding: var(--spacing-4);
  background-color: rgba(var(--color-primary), 0.1);
  border-radius: var(--border-radius-md);
}

/* 使用透明度的灵活性 */
.button {
  background-color: rgba(var(--color-primary), 1);
}

.button:hover {
  background-color: rgba(var(--color-primary), 0.8);
}
```

## 🎨 令牌结构

### **间距 (Spacing)**

```css
var(--spacing-1)   /* 0.25rem = 4px */
var(--spacing-2)   /* 0.5rem = 8px */
var(--spacing-4)   /* 1rem = 16px */
var(--spacing-8)   /* 2rem = 32px */
```

### **颜色 (Colors)**

```css
/* RGB 值，不包含 rgba() 前缀 */
var(--color-primary)  /* 13, 153, 255 */
var(--color-white)    /* 255, 255, 255 */
var(--color-black)    /* 0, 0, 0 */

/* 使用时需要包装 */
rgba(var(--color-primary), 1)     /* 完全不透明 */
rgba(var(--color-primary), 0.5)   /* 50% 透明度 */
```

## 🔧 添加新令牌

### **1. 编辑 JSON 文件**

```json
// tokens/colors.json
{
  "color": {
    "brand": {
      "primary": {
        "value": "13, 153, 255",
        "type": "color",
        "description": "主品牌色"
      },
      "secondary": {
        "value": "255, 107, 107",
        "type": "color",
        "description": "次要品牌色"
      }
    }
  }
}
```

### **2. 重新构建**

```bash
pnpm build:tokens
```

### **3. 使用新令牌**

```css
.brand-button {
  background-color: rgba(var(--color-brand-primary), 1);
  border: 1px solid rgba(var(--color-brand-secondary), 0.3);
}
```

## 🌗 主题支持

设计令牌库支持主题切换：

```json
// 在令牌中定义不同主题
{
  "color": {
    "theme": {
      "light": {
        "background": {
          "value": "255, 255, 255",
          "type": "color"
        }
      },
      "dark": {
        "background": {
          "value": "18, 18, 18",
          "type": "color"
        }
      }
    }
  }
}
```

## 📦 与不同框架集成

### **React + Styled Components**

```typescript
import { spacing, color } from "@choiceform/design-js-tokens";

const Button = styled.button`
  padding: ${spacing(4)};
  background-color: rgba(${color("primary")}, 1);
`;
```

### **Vue + CSS Modules**

```vue
<style module>
.button {
  padding: var(--spacing-4);
  background-color: rgba(var(--color-primary), 1);
}
</style>
```

### **Vanilla CSS**

```css
@import "@choiceform/design-js-tokens/design-tokens.css";

.button {
  padding: var(--spacing-4);
  background-color: rgba(var(--color-primary), 1);
}
```

## 🚀 优势

1. **标准化**：符合 W3C Design Tokens 标准
2. **类型安全**：自动生成 TypeScript 类型
3. **框架无关**：输出标准 CSS 变量
4. **灵活透明度**：RGB 值便于处理透明度
5. **自动化构建**：Style Dictionary 自动生成多种格式
6. **向后兼容**：保持现有函数 API

## 🔄 迁移指南

从旧版本迁移：

1. **保持现有代码不变**：函数 API 仍然可用
2. **逐步采用 CSS 变量**：在新组件中使用 `var(--spacing-4)`
3. **更新导入**：添加 `design-tokens.css` 导入
4. **享受新功能**：使用灵活的透明度和主题支持

## 📚 更多资源

- [W3C Design Tokens 规范](https://tr.designtokens.org/format/)
- [Style Dictionary 文档](https://styledictionary.com/)
- [CSS 自定义属性文档](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
