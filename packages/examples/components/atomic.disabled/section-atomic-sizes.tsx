import { color } from "@choiceform/design-tokens/helpers";
import { css, cx } from "@linaria/core";
import { memo } from "react";
import { CodeBlock, Section } from "..";
import { width, height } from "../../../css-in-js/src/atomic";

const sizeCode = `
<div
  className={\`
    \${width.full}
    \${height[10]}
    \${width["1_2"]}
  \`}
>
  Flexible sizing with numeric and semantic values
</div>
`;

export const SectionAtomicSizes = memo(function SectionAtomicSizes() {
  const customHighlight = (content: string) => {
    if (
      [
        "width",
        "height",
        "full",
        "auto",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "min",
        "max",
        "fit",
        "screen",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "14",
        "16",
        "20",
        "24",
        "28",
        "32",
        "36",
        "40",
        "44",
        "48",
        "52",
        "56",
        "60",
        "64",
        "72",
        "80",
        "96",
        "1_2",
        "1_3",
        "2_3",
        "1_4",
        "3_4",
        "&quot;",
      ].includes(content) ||
      content.match(/^\d+$/) ||
      content.match(/^&quot;\d+_\d+&quot;$/)
    ) {
      return (
        <span
          className={css`
            color: ${color("fg-component")};
            font-weight: 600;
          `}
        >
          {content}
        </span>
      );
    }
    return null;
  };

  return (
    <Section
      title="Size Atoms"
      content={
        <p>
          Size atomic styles provide comprehensive control over element
          dimensions. Use numeric values for precise spacing (e.g., width[10],
          height[24]), semantic aliases for common sizes (width.full,
          height.auto), or fraction values for proportional sizing
          (width[&quot;&quot;], height[&quot;3_4&quot;]).
        </p>
      }
    >
      <div
        className={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          <h4
            className={css`
              font-size: 14px;
              font-weight: 600;
              margin: 0;
            `}
          >
            Width Examples
          </h4>
          <div
            className={css`
              display: flex;
              flex-direction: column;
              gap: 4px;
            `}
          >
            <div
              className={cx(
                width[10],
                css`
                  height: 24px;
                  background: ${color("bg-accent")};
                  border-radius: 4px;
                  display: flex;
                  align-items: center;
                  padding: 0 8px;
                  font-size: 12px;
                  color: white;
                `
              )}
            >
              width[10]
            </div>
            <div
              className={cx(
                width[20],
                css`
                  height: 24px;
                  background: ${color("bg-success")};
                  border-radius: 4px;
                  display: flex;
                  align-items: center;
                  padding: 0 8px;
                  font-size: 12px;
                  color: white;
                `
              )}
            >
              width[20]
            </div>
            <div
              className={cx(
                width["1_2"],
                css`
                  height: 24px;
                  background: ${color("bg-warning")};
                  border-radius: 4px;
                  display: flex;
                  align-items: center;
                  padding: 0 8px;
                  font-size: 12px;
                  color: white;
                `
              )}
            >
              width[&quot;1_2&quot;]
            </div>
          </div>
        </div>

        <div
          className={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          <h4
            className={css`
              font-size: 14px;
              font-weight: 600;
              margin: 0;
            `}
          >
            Height Examples
          </h4>
          <div
            className={css`
              display: flex;
              gap: 8px;
            `}
          >
            <div
              className={cx(
                height[6],
                css`
                  width: 60px;
                  background: ${color("bg-accent")};
                  border-radius: 4px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 10px;
                  color: white;
                `
              )}
            >
              h[6]
            </div>
            <div
              className={cx(
                height[12],
                css`
                  width: 60px;
                  background: ${color("bg-success")};
                  border-radius: 4px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 10px;
                  color: white;
                `
              )}
            >
              h[12]
            </div>
            <div
              className={cx(
                height[20],
                css`
                  width: 60px;
                  background: ${color("bg-warning")};
                  border-radius: 4px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 10px;
                  color: white;
                `
              )}
            >
              h[20]
            </div>
          </div>
        </div>
      </div>

      <CodeBlock
        code={sizeCode}
        language="tsx"
        customHighlight={customHighlight}
      />
    </Section>
  );
});

SectionAtomicSizes.displayName = "SectionAtomicSizes";
