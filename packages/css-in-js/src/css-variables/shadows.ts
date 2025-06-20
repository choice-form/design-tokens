// ============================================================================
// Shadows CSS 变量生成器
// ============================================================================

import { cssVar } from './config'

/// 生成基础阴影 CSS 变量的字符串
/// @param shadows - 阴影对象
/// @returns CSS 变量字符串
function generateBaseShadowVariables(shadows: Record<string, readonly string[]>): string {
  return Object.entries(shadows)
    .map(([name, shadowList]) => `  ${cssVar(`shadow-${name}`)}: ${shadowList.join(', ')};`)
    .join('\n')
}

/// 生成语义阴影 CSS 变量的字符串
/// @param semantics - 语义阴影对象
/// @param specials - 特殊阴影对象
/// @returns CSS 变量字符串
function generateSemanticShadowVariables(
  semantics: Record<string, string>,
  specials: Record<string, readonly string[]>
): string {
  return Object.entries(semantics)
    .map(([name, baseName]) => {
      if (baseName in specials) {
        // 特殊阴影直接使用其值
        const specialShadow = specials[baseName]
        return `  ${cssVar(`shadow-${name}`)}: ${specialShadow.join(', ')};`
      } else {
        // 引用其他阴影变量
        return `  ${cssVar(`shadow-${name}`)}: var(${cssVar(`shadow-${baseName}`)});`
      }
    })
    .join('\n')
}

/// 生成完整的阴影 CSS 变量
/// @param baseShads - 基础阴影
/// @param semantics - 语义阴影
/// @param specials - 特殊阴影
/// @returns CSS 变量字符串
export function generateShadowVariables(
  baseShads: Record<string, readonly string[]>,
  semantics: Record<string, string>,
  specials: Record<string, readonly string[]>
): string {
  const baseVars = generateBaseShadowVariables(baseShads)
  const semanticVars = generateSemanticShadowVariables(semantics, specials)

  return [baseVars, semanticVars].filter(Boolean).join('\n')
}
