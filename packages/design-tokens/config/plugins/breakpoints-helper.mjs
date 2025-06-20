import { readFileSync } from "fs";
import { join } from "path";

/**
 * Breakpoints Helper Plugin for Terrazzo
 * 生成 breakpoints 和 mediaQuery 相关的 helper 函数
 */
export default function breakpointsHelperPlugin() {
  return {
    name: "breakpoints-helper",
    transform(tokens) {
      const breakpointsHelperCode = generateBreakpointsHelperCode();

      // 初始化全局状态
      if (!global.designTokensHelpers) {
        global.designTokensHelpers = {};
      }

      // 存储 breakpoints helper 代码
      global.designTokensHelpers.breakpoints = breakpointsHelperCode;

      return tokens;
    },
  };
}

function generateBreakpointsHelperCode() {
  // 读取 breakpoints 数据
  const breakpointsData = readBreakpointsData();

  return `
// ============================================================================
// Breakpoints & Media Query Helper Functions - 断点和媒体查询辅助函数
// ============================================================================

/**
 * Breakpoints 数据 (像素值)
 */
const BREAKPOINTS_PX = ${JSON.stringify(breakpointsData, null, 2)};

/**
 * 将像素值转换为 rem (假设 16px = 1rem)
 */
function pxToRem(px) {
  return px / 16;
}

/**
 * 获取断点值
 * @param name - 断点名称
 * @param unit - 单位 ('px' | 'rem')，默认 'rem'
 * @returns 断点值
 */
export function breakpoint(name, unit = 'rem') {
  const pxValue = BREAKPOINTS_PX[name];
  
  if (pxValue === undefined) {
    const availableBreakpoints = Object.keys(BREAKPOINTS_PX);
    throw new Error(
      \`Breakpoint '\${name}' not found. Available breakpoints: \${availableBreakpoints.join(', ')}\`
    );
  }
  
  if (unit === 'px') {
    return \`\${pxValue}px\`;
  }
  
  if (unit === 'rem') {
    return \`\${pxToRem(pxValue)}rem\`;
  }
  
  // 返回纯数值
  if (unit === 'number') {
    return pxValue;
  }
  
  throw new Error(\`Invalid unit '\${unit}'. Supported units: 'px', 'rem', 'number'\`);
}

/**
 * 生成媒体查询字符串
 * @param breakpointName - 断点名称
 * @param direction - 方向 ('up' | 'down' | 'only')，默认 'up'
 * @param unit - 单位 ('px' | 'rem')，默认 'rem'
 * @returns 媒体查询字符串
 */
export function mediaQuery(breakpointName, direction = 'up', unit = 'rem') {
  const breakpointNames = Object.keys(BREAKPOINTS_PX);
  const currentIndex = breakpointNames.indexOf(breakpointName);
  
  if (currentIndex === -1) {
    throw new Error(
      \`Breakpoint '\${breakpointName}' not found. Available breakpoints: \${breakpointNames.join(', ')}\`
    );
  }
  
  const currentValue = BREAKPOINTS_PX[breakpointName];
  
  switch (direction) {
    case 'up':
      // min-width: 从该断点及以上
      if (unit === 'px') {
        return \`(min-width: \${currentValue}px)\`;
      }
      return \`(min-width: \${pxToRem(currentValue)}rem)\`;
      
    case 'down':
      // max-width: 从该断点以下 (减去 0.02px 避免重叠)
      const maxValue = currentValue - 0.02;
      if (unit === 'px') {
        return \`(max-width: \${maxValue}px)\`;
      }
      return \`(max-width: \${pxToRem(maxValue)}rem)\`;
      
    case 'only':
      // 仅在该断点范围内
      if (currentIndex === breakpointNames.length - 1) {
        // 最大断点，只设置 min-width
        if (unit === 'px') {
          return \`(min-width: \${currentValue}px)\`;
        }
        return \`(min-width: \${pxToRem(currentValue)}rem)\`;
      }
      
      const nextBreakpoint = breakpointNames[currentIndex + 1];
      const nextValue = BREAKPOINTS_PX[nextBreakpoint] - 0.02;
      
      if (unit === 'px') {
        return \`(min-width: \${currentValue}px) and (max-width: \${nextValue}px)\`;
      }
      return \`(min-width: \${pxToRem(currentValue)}rem) and (max-width: \${pxToRem(nextValue)}rem)\`;
      
    default:
      throw new Error(\`Invalid direction '\${direction}'. Supported directions: 'up', 'down', 'only'\`);
  }
}

/**
 * 生成完整的媒体查询规则 (包含 @media)
 * @param breakpointName - 断点名称
 * @param direction - 方向 ('up' | 'down' | 'only')，默认 'up'
 * @param unit - 单位 ('px' | 'rem')，默认 'rem'
 * @returns 完整的媒体查询字符串
 */
export function mediaQueryRule(breakpointName, direction = 'up', unit = 'rem') {
  return \`@media \${mediaQuery(breakpointName, direction, unit)}\`;
}

/**
 * 生成范围媒体查询
 * @param minBreakpoint - 最小断点名称
 * @param maxBreakpoint - 最大断点名称
 * @param unit - 单位 ('px' | 'rem')，默认 'rem'
 * @returns 范围媒体查询字符串
 */
export function mediaQueryBetween(minBreakpoint, maxBreakpoint, unit = 'rem') {
  const minValue = BREAKPOINTS_PX[minBreakpoint];
  const maxValue = BREAKPOINTS_PX[maxBreakpoint] - 0.02;
  
  if (minValue === undefined) {
    const availableBreakpoints = Object.keys(BREAKPOINTS_PX);
    throw new Error(
      \`Min breakpoint '\${minBreakpoint}' not found. Available breakpoints: \${availableBreakpoints.join(', ')}\`
    );
  }
  
  if (maxValue === undefined) {
    const availableBreakpoints = Object.keys(BREAKPOINTS_PX);
    throw new Error(
      \`Max breakpoint '\${maxBreakpoint}' not found. Available breakpoints: \${availableBreakpoints.join(', ')}\`
    );
  }
  
  if (minValue >= maxValue) {
    throw new Error(\`Min breakpoint '\${minBreakpoint}' must be smaller than max breakpoint '\${maxBreakpoint}'\`);
  }
  
  if (unit === 'px') {
    return \`(min-width: \${minValue}px) and (max-width: \${maxValue}px)\`;
  }
  
  return \`(min-width: \${pxToRem(minValue)}rem) and (max-width: \${pxToRem(maxValue)}rem)\`;
}

/**
 * 生成范围媒体查询规则 (包含 @media)
 * @param minBreakpoint - 最小断点名称
 * @param maxBreakpoint - 最大断点名称
 * @param unit - 单位 ('px' | 'rem')，默认 'rem'
 * @returns 完整的范围媒体查询字符串
 */
export function mediaQueryBetweenRule(minBreakpoint, maxBreakpoint, unit = 'rem') {
  return \`@media \${mediaQueryBetween(minBreakpoint, maxBreakpoint, unit)}\`;
}

/**
 * 检查断点是否存在
 * @param name - 断点名称
 * @returns 是否存在
 */
export function breakpointExists(name) {
  return name in BREAKPOINTS_PX;
}

/**
 * 列出所有可用的断点
 * @returns 断点名称数组
 */
export function listBreakpoints() {
  return Object.keys(BREAKPOINTS_PX).sort((a, b) => BREAKPOINTS_PX[a] - BREAKPOINTS_PX[b]);
}

/**
 * 获取断点信息
 * @param name - 断点名称
 * @returns 断点详细信息
 */
export function breakpointInfo(name) {
  const pxValue = BREAKPOINTS_PX[name];
  
  if (pxValue === undefined) {
    throw new Error(\`Breakpoint '\${name}' not found\`);
  }
  
  return {
    name,
    px: \`\${pxValue}px\`,
    rem: \`\${pxToRem(pxValue)}rem\`,
    value: pxValue,
    mediaQuery: {
      up: mediaQuery(name, 'up'),
      down: mediaQuery(name, 'down'),
      only: mediaQuery(name, 'only')
    }
  };
}

/**
 * 获取所有断点信息
 * @returns 所有断点的详细信息
 */
export function getAllBreakpointsInfo() {
  return Object.keys(BREAKPOINTS_PX).reduce((info, name) => {
    info[name] = breakpointInfo(name);
    return info;
  }, {});
}

/**
 * 生成响应式工具类名映射
 * @param baseClassName - 基础类名
 * @returns 响应式类名映射
 */
export function responsiveClasses(baseClassName) {
  const breakpoints = listBreakpoints();
  const classes = { default: baseClassName };
  
  breakpoints.forEach(bp => {
    classes[bp] = \`\${bp}:\${baseClassName}\`;
  });
  
  return classes;
}
`;
}

/**
 * 读取 breakpoints 数据
 */
function readBreakpointsData() {
  try {
    // 尝试当前目录路径（在 packages/design-tokens 中运行）
    const filePath = join(process.cwd(), "tokens/primitives/breakpoints.ts");
    const data = readFileSync(filePath, "utf8");

    // 解析 module.exports 格式
    const exportMatch = data.match(/module\.exports\s*=\s*({[\s\S]*?});/);
    if (exportMatch) {
      // 使用 Function 构造函数安全地执行代码
      const moduleExports = {};
      const moduleCode = `
         const breakpoints = ${exportMatch[1].match(/breakpoints:\s*({[^}]*})/)?.[1] || exportMatch[1].match(/{([^}]*})/)[1]};
         return { breakpoints };
       `;
      const result = new Function(moduleCode)();
      return result.breakpoints;
    }

    // 尝试直接解析 breakpoints 对象
    const breakpointsMatch = data.match(
      /const breakpoints\s*=\s*({[\s\S]*?});/
    );
    if (breakpointsMatch) {
      return JSON.parse(
        breakpointsMatch[1].replace(/(\w+):/g, '"$1":').replace(/,\s*}/g, "}")
      );
    }

    throw new Error("Could not parse breakpoints from file");
  } catch (error) {
    try {
      // 尝试从项目根目录
      const fallbackPath = join(
        process.cwd(),
        "packages/design-tokens/tokens/primitives/breakpoints.ts"
      );
      const data = readFileSync(fallbackPath, "utf8");

      // 同样的解析逻辑
      const breakpointsMatch = data.match(
        /const breakpoints\s*=\s*({[\s\S]*?});/
      );
      if (breakpointsMatch) {
        return JSON.parse(
          breakpointsMatch[1].replace(/(\w+):/g, '"$1":').replace(/,\s*}/g, "}")
        );
      }

      throw new Error("Could not parse breakpoints from fallback file");
    } catch (fallbackError) {
      console.warn(
        "Could not load breakpoints data from either path:",
        error.message,
        fallbackError.message
      );
      // 返回默认断点
      return {
        xs: 475,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      };
    }
  }
}
