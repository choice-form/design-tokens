export default function scssColorsFunctionsV2(userOptions = {}) {
  return {
    name: "scss-colors-functions-v2",
    enforce: "post",

    async build({ tokens, getTransforms, outputFile }) {
      const output = [];

      // SCSS 文件头部
      output.push('@use "sass:map";');
      output.push('@use "sass:meta";');
      output.push('@use "sass:string";');
      output.push('@use "sass:list";');
      output.push("");
      output.push(
        "// ============================================================================"
      );
      output.push("// 颜色工具函数 - 与 CSS-in-JS API 完全一致");
      output.push(
        "// ============================================================================"
      );
      output.push("");

      // 收集所有颜色 tokens
      const colorTokens = Object.keys(tokens)
        .filter((key) => key.startsWith("color."))
        .map((key) => key.replace("color.", ""));

      // 主要颜色函数 - 完全匹配 CSS-in-JS API
      output.push("/// 颜色辅助函数 - 与 CSS-in-JS color() 完全一致");
      output.push(
        "/// @param {String} $path - 颜色路径，如 'blue.500' 或 'text.secondary'"
      );
      output.push(
        "/// @param {Number} $alpha - 可选透明度值 (0-1)，会覆盖 token 自带的 alpha"
      );
      output.push(
        "/// @param {String} $mode - 可选主题模式 (SCSS 中暂不支持，保留兼容性)"
      );
      output.push(
        "/// @return {String} rgba(var(--cdt-color-xxx), alpha) 格式"
      );
      output.push("/// @example scss - 使用示例");
      output.push("///   .button {");
      output.push('///     background: color("blue.500");');
      output.push('///     color: color("text.secondary", 0.8);');
      output.push("///   }");
      output.push('@function color($path, $alpha: null, $mode: ".") {');
      output.push('  @if not $path or $path == "" {');
      output.push('    @warn "[design-tokens] Invalid color path: #{$path}";');
      output.push("    @return rgba(0, 0, 0, if($alpha != null, $alpha, 1));");
      output.push("  }");
      output.push("");

      // 自动添加 color. 前缀（如果没有的话）
      output.push(
        '  $token-path: if(str-index($path, "color.") == 1, $path, "color.#{$path}");'
      );
      output.push("  ");

      // 验证颜色是否存在
      output.push("  @if not _color-exists($path) {");
      output.push(
        "    @warn \"[design-tokens] Color token '#{$path}' (#{$token-path}:#{$mode}) not found\";"
      );
      output.push("    @return rgba(0, 0, 0, if($alpha != null, $alpha, 1));");
      output.push("  }");
      output.push("");

      // 生成 CSS 变量名
      output.push('  $css-var-name: str-replace($token-path, ".", "-");');
      output.push('  $css-var: "--cdt-#{$css-var-name}";');
      output.push("  ");

      // 确定最终的 alpha 值
      output.push(
        "  $final-alpha: if($alpha != null, clamp(0, $alpha, 1), 1);"
      );
      output.push("  ");

      output.push("  @return rgba(var(#{$css-var}), #{$final-alpha});");
      output.push("}");
      output.push("");

      // colorVar 函数 - 获取原始 CSS 变量
      output.push(
        "/// 获取原始颜色 CSS 变量（不包装 rgba）- 与 CSS-in-JS colorVar() 一致"
      );
      output.push("/// @param {String} $path - 颜色路径");
      output.push("/// @return {String} CSS 变量");
      output.push("@function color-var($path) {");
      output.push(
        '  $token-path: if(str-index($path, "color.") == 1, $path, "color.#{$path}");'
      );
      output.push('  $css-var-name: str-replace($token-path, ".", "-");');
      output.push("  @return var(--cdt-#{$css-var-name});");
      output.push("}");
      output.push("");

      // hasColor 函数 - 检查颜色是否存在
      output.push("/// 检查颜色 token 是否存在 - 与 CSS-in-JS hasColor() 一致");
      output.push("/// @param {String} $path - 颜色路径");
      output.push("/// @param {String} $mode - 主题模式（保留兼容性）");
      output.push("/// @return {Boolean} 是否存在");
      output.push('@function has-color($path, $mode: ".") {');
      output.push('  @if not $path or $path == "" {');
      output.push("    @return false;");
      output.push("  }");
      output.push("  @return _color-exists($path);");
      output.push("}");
      output.push("");

      // 辅助函数：字符串替换
      output.push(
        "// ============================================================================"
      );
      output.push("// 辅助函数");
      output.push(
        "// ============================================================================"
      );
      output.push("");
      output.push("/// 字符串替换函数");
      output.push("/// @param {String} $string - 原字符串");
      output.push("/// @param {String} $search - 搜索字符串");
      output.push("/// @param {String} $replace - 替换字符串");
      output.push("/// @return {String} 替换后的字符串");
      output.push("/// @access private");
      output.push('@function str-replace($string, $search, $replace: "") {');
      output.push("  $index: string.index($string, $search);");
      output.push("  @if $index {");
      output.push(
        "    @return string.slice($string, 1, $index - 1) + $replace + str-replace(string.slice($string, $index + string.length($search)), $search, $replace);"
      );
      output.push("  }");
      output.push("  @return $string;");
      output.push("}");
      output.push("");

      // 检查颜色是否存在（私有）
      output.push("/// 检查颜色是否存在");
      output.push("/// @param {String} $path - 颜色路径");
      output.push("/// @return {Boolean} 是否存在");
      output.push("/// @access private");
      output.push("@function _color-exists($path) {");
      output.push("  $valid-colors: (");
      colorTokens.forEach((token, index) => {
        const comma = index === colorTokens.length - 1 ? "" : ",";
        output.push(`    \"${token}\"${comma}`);
      });
      output.push("  );");
      output.push("  @return list.index($valid-colors, $path) != null;");
      output.push("}");
      output.push("");

      // 列出所有颜色（调试用）
      output.push("/// 列出所有可用颜色");
      output.push("/// @return {List} 颜色名称列表");
      output.push("/// @access private");
      output.push("@function _list-colors() {");
      output.push("  @return (");
      colorTokens.slice(0, 10).forEach((token) => {
        output.push(`    \"${token}\",`);
      });
      if (colorTokens.length > 10) {
        output.push(`    // ... 共 ${colorTokens.length} 个颜色`);
      }
      output.push("  );");
      output.push("}");

      // 存储到全局状态
      if (!global.designTokensHelpers) {
        global.designTokensHelpers = {};
      }
      if (!global.designTokensHelpers.scss) {
        global.designTokensHelpers.scss = {};
      }
      global.designTokensHelpers.scss.colors = output.join("\n");
    },
  };
}
