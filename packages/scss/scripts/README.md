# 设计令牌提取系统

这个系统解决了 VSCode 扩展中硬编码设计令牌的问题，通过自动从 SCSS 文件中提取令牌数据。

## 🚀 使用方法

### 1. 提取令牌数据

```bash
cd packages/tokens
pnpm extract-tokens
```

这将会：

- 从 `src/tokens/*.scss` 文件中提取所有设计令牌
- 生成 `generated/` 目录下的 JSON 文件
- 创建 VSCode 扩展可使用的 `tokens-data.json`

### 2. 生成的文件

```
packages/tokens/generated/
├── color.json        # 295 颜色令牌 (RGB + Hex + 类别)
├── spacing.json      # 35 间距令牌 (数值 + 像素值)
├── radius.json       # 14 圆角令牌
├── shadows.json      # 33 阴影令牌 (语义层级)
├── zindex.json       # 19 Z-index 令牌
└── tokens-data.json  # VSCode 扩展专用统一文件
```

### 3. VSCode 扩展集成

VSCode 扩展现在会自动读取生成的 `tokens-data.json` 文件，提供：

- ✅ **自动完成**: 输入设计令牌时的智能建议
- ✅ **颜色预览**: 颜色令牌的实时颜色显示
- ✅ **悬停信息**: 令牌的详细信息（像素值、描述等）
- ✅ **错误检查**: 无效令牌名称的警告
- ✅ **分类支持**: 基础、语义、别名令牌的分类显示

## 📊 提取统计

- **295 颜色令牌**: 包含 light/dark 主题，RGB 和 Hex 值
- **35 间距令牌**: 基于 4px 基础单位的间距系统
- **14 圆角令牌**: 基础、语义和别名圆角值
- **33 阴影令牌**: 包含 light/dark 主题的复杂阴影定义
- **19 Z-index 令牌**: 分层系统的 Z-index 值

## 🔄 工作流程

1. **修改 SCSS 令牌** → 编辑 `src/tokens/*.scss` 文件
2. **提取更新数据** → 运行 `pnpm extract-tokens`
3. **VSCode 扩展自动更新** → 扩展检测到新数据并自动刷新

## 🎯 解决的问题

- ❌ **之前**: VSCode 扩展使用 37KB 硬编码令牌数据，需要手动维护
- ✅ **现在**: 自动从源 SCSS 文件提取，始终保持同步

## 🛠 技术细节

### 正则表达式支持

支持两种 SCSS Map 格式：

- `$map-name: (...) !default;` (带默认值)
- `$map-name: (...);` (标准格式)

### 颜色处理

- RGB 元组 → Hex 值自动转换
- 支持语义颜色引用
- Light/Dark 主题分别处理

### 间距计算

- 数值 × 4px = 实际像素值
- 特殊值（如 "px", "0.5"）特殊处理

## 📝 注意事项

- 阴影提取会显示解析警告，但语义层级正常提取
- 复杂的多行阴影定义暂时跳过详细解析
- 扩展加载时会检查 `tokens-data.json` 是否存在
