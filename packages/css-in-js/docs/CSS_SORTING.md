# CSS-in-JS 属性自动排序

本项目配置了 `stylelint` 来自动排序 CSS-in-JS 中的属性，确保代码一致性和可读性。

## 排序规则

CSS 属性按以下顺序排列：

1. **定位** - `position`, `top`, `right`, `bottom`, `left`, `z-index`
2. **显示模式** - `display`, `flex`, `grid` 等布局属性
3. **盒模型** - `width`, `height`, `margin`, `padding`
4. **边框** - `border`, `border-radius`
5. **背景** - `background`, `background-color`
6. **文字** - `color`, `font`, `text-align`
7. **其他** - `opacity`, `transform`, `transition`

## 使用方法

### 自动修复

```bash
# 修复单个文件
pnpm lint:css:fix src/components/Button.tsx

# 修复所有文件
pnpm lint:css:fix
```

### 检查错误

```bash
# 检查单个文件
pnpm lint:css src/components/Button.tsx

# 检查所有文件
pnpm lint:css
```

### VS Code 集成

安装 Stylelint 插件后，属性会在保存时自动排序：

1. 安装 [Stylelint Extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
2. 重启 VS Code
3. 保存 TypeScript/React 文件时自动排序

## 示例

### 修复前

```typescript
const buttonClass = css\`
  padding: \${spacing(4)};
  border-radius: \${radius('md')};
  display: flex;
  background-color: \${color('bg-accent')};
  align-items: center;
  color: \${color('fg-on-accent')};
\`
```

### 修复后

```typescript
const buttonClass = css\`
  display: flex;
  align-items: center;
  padding: \${spacing(4)};
  border-radius: \${radius('md')};
  background-color: \${color('bg-accent')};
  color: \${color('fg-on-accent')};
\`
```

## 支持的文件类型

- `.css`
- `.tsx` (TypeScript React)
- `.ts` (TypeScript)

## 配置文件

- `.stylelintrc.json` - Stylelint 主配置
- `.vscode/settings.json` - VS Code 编辑器配置
