import {
  color,
  spacing,
  spacingList,
  typography,
  listTypographyPresets,
  typographyInfo,
  TypographyKey,
} from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import { memo } from "react";
import { Section } from "../page";
import { TokenFunctionDisplay } from "../ui";

// 简单的类型定义来匹配原有接口
type TypographyPreset = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
};

const containerClass = css`
  display: flex;
  flex-direction: column;
  grid-column: 1 / -1;
  gap: ${spacing(4)};
`;

const infoGridClass = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing(2)};
  margin: ${spacingList(["px", "px", 0, "px"])};
  padding: ${spacing(4)};
  background-color: ${color("background.secondary")};
`;

const infoGridItemClass = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
`;

const examplesClass = css`
  display: flex;
  flex-direction: column;
  gap: var(--dynamic-lineHeight);
  padding: ${spacing(4)};
  background-image: linear-gradient(
    ${color("background.danger", 0.2)} 1px,
    transparent 1px
  );
  background-position: 0 ${spacing(4)};
  background-size: var(--dynamic-lineHeight);
`;

// 定义使用CSS变量的动态字体样式类
const dynamicTypographyClass = css`
  font-family: var(--dynamic-font-family);
  font-size: var(--dynamic-font-size);
  font-weight: var(--dynamic-font-weight);
  line-height: var(--dynamic-line-height);
  letter-spacing: var(--dynamic-letter-spacing);
`;

const primaryTextClass = css`
  color: var(--cdt-color-text-primary);
`;

const secondaryTextClass = css`
  max-width: 600px;
  color: var(--cdt-color-text-secondary);
`;

const tertiaryTextClass = css`
  color: var(--cdt-color-text-tertiary);
`;

const InfoGrid = memo(function InfoGrid({
  value,
  presetKey,
}: {
  presetKey: string;
  value: TypographyPreset;
}) {
  return (
    <div className={infoGridClass}>
      <div className={infoGridItemClass}>
        <TokenFunctionDisplay
          functionName="typographyStyles"
          value={presetKey}
        />
        <p>
          The typographyStyles function returns a complete style object
          containing all typography properties: fontFamily, fontSize,
          fontWeight, lineHeight, and letterSpacing.
        </p>
      </div>
      <div className={infoGridItemClass}>
        <TokenFunctionDisplay
          functionName="fontFamily"
          value={value.fontFamily}
        />
        <TokenFunctionDisplay functionName="fontSize" value={value.fontSize} />
        <TokenFunctionDisplay
          functionName="fontWeight"
          value={value.fontWeight}
        />
        <TokenFunctionDisplay
          functionName="lineHeight"
          value={value.lineHeight}
        />
        <TokenFunctionDisplay
          functionName="letterSpacing"
          value={value.letterSpacing}
        />
      </div>
    </div>
  );
});

export const SectionTypography = memo(function SectionTypography() {
  return (
    <>
      {listTypographyPresets().map((key) => {
        const value = typographyInfo(key);
        // 使用typography函数获取完整的样式对象
        const typographyStyles = typography(key as TypographyKey);

        // 准备CSS变量值
        const cssVarStyle = {
          "--dynamic-font-family": typographyStyles.fontFamily,
          "--dynamic-font-size": typographyStyles.fontSize,
          "--dynamic-font-weight": typographyStyles.fontWeight,
          "--dynamic-line-height": typographyStyles.lineHeight,
          "--dynamic-letter-spacing": typographyStyles.letterSpacing,
        } as React.CSSProperties;

        const backgroundVarStyle = {
          "--dynamic-lineHeight": `${typographyStyles.lineHeight} ${typographyStyles.lineHeight}`,
        } as React.CSSProperties;

        return (
          <Section
            key={key}
            title={key
              .replace(/\./g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
            content={
              <>
                <p>
                  Typography preset with {value.value.fontFamily} font family,{" "}
                  {value.value.fontSize} size,
                  {value.value.fontWeight} weight, {value.value.lineHeight} line
                  height, and {value.value.letterSpacing} letter spacing.
                </p>
                <p>
                  This preset is designed for optimal readability with precise
                  letter spacing and carefully balanced proportions, ensuring
                  consistent typography across the design system.
                </p>
              </>
            }
          >
            <div className={containerClass}>
              <InfoGrid key={key} value={value.value} presetKey={key} />

              {/* 示例文本展示 - 使用Linaria CSS变量方法 */}
              <div className={examplesClass} style={backgroundVarStyle}>
                {/* 主要示例文本 */}
                <div
                  className={`${dynamicTypographyClass} ${primaryTextClass}`}
                  style={cssVarStyle}
                >
                  The quick brown fox jumps over the lazy dog
                </div>

                {key !== "heading.display" && (
                  <div
                    className={`${dynamicTypographyClass} ${secondaryTextClass}`}
                    style={cssVarStyle}
                  >
                    Typography is the art and technique of arranging type to
                    make written language legible, readable and appealing when
                    displayed. This typography system provides consistent font
                    tokens with precise letter spacing, optimized line heights,
                    and carefully selected font weights for maximum readability
                    and visual harmony.
                  </div>
                )}

                {/* 数字和特殊字符示例 */}
                <div
                  className={`${dynamicTypographyClass} ${tertiaryTextClass}`}
                  style={cssVarStyle}
                >
                  0123456789 !@#$%^&*()_+-=[]&#123;&#125;|;&apos;:&quot;,./?
                </div>
              </div>
            </div>
          </Section>
        );
      })}
    </>
  );
});

SectionTypography.displayName = "SectionTypography";
