import { color } from "@choiceform/design-tokens";
import { css, cx } from "@linaria/core";
import { memo } from "react";
import { CodeBlock, Section } from "..";
import { padding } from "../../../css-in-js/src/atomic";

const paddingCode = `
<div
  className={\`
    \${padding[4]}
    \${padding.x[8]}
    \${padding.t[2]}
    \${padding.b[6]}
  \`}
>
  Flexible padding with directional control
</div>
`;

export const SectionAtomicPadding = memo(function SectionAtomicPadding() {
  const customHighlight = (content: string) => {
    if (
      [
        "padding",
        "x",
        "y",
        "t",
        "b",
        "l",
        "r",
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
      ].includes(content) ||
      content.match(/^\d+$/)
    ) {
      return (
        <span
          className={css`
            color: ${color("fg-assistive")};
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
      title="Padding Atoms"
      content={
        <p>
          Padding atomic styles offer precise control over internal spacing.
          Apply padding to all sides (padding[4]), specific directions
          (padding.x[8], padding.y[6]), or individual sides (padding.t[2],
          padding.b[4], padding.l[3], padding.r[5]) using numeric values based
          on our 4px spacing scale.
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
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
          `}
        >
          <div
            className={cx(
              padding[4],
              css`
                background: ${color("bg-accent")};
                border-radius: 4px;
                color: white;
                font-size: 12px;
                border: 2px dashed rgba(255, 255, 255, 0.5);
              `
            )}
          >
            padding[4] - All sides
          </div>

          <div
            className={cx(
              padding.x[6],
              css`
                background: ${color("bg-success")};
                border-radius: 4px;
                color: white;
                font-size: 12px;
                border-left: 2px dashed rgba(255, 255, 255, 0.5);
                border-right: 2px dashed rgba(255, 255, 255, 0.5);
              `
            )}
          >
            padding.x[6] - Horizontal
          </div>

          <div
            className={cx(
              padding.y[8],
              css`
                background: ${color("bg-warning")};
                border-radius: 4px;
                color: white;
                font-size: 12px;
                border-top: 2px dashed rgba(255, 255, 255, 0.5);
                border-bottom: 2px dashed rgba(255, 255, 255, 0.5);
              `
            )}
          >
            padding.y[8] - Vertical
          </div>
        </div>

        <div
          className={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
          `}
        >
          <div
            className={cx(
              padding.t[6],
              css`
                background: ${color("bg-component")};
                border-radius: 4px;
                color: white;
                font-size: 12px;
                border-top: 2px dashed rgba(255, 255, 255, 0.5);
              `
            )}
          >
            padding.t[6]
          </div>

          <div
            className={cx(
              padding.b[6],
              css`
                background: ${color("bg-component")};
                border-radius: 4px;
                color: white;
                font-size: 12px;
                border-bottom: 2px dashed rgba(255, 255, 255, 0.5);
              `
            )}
          >
            padding.b[6]
          </div>

          <div
            className={cx(
              padding.l[6],
              css`
                background: ${color("bg-component")};
                border-radius: 4px;
                color: white;
                font-size: 12px;
                border-left: 2px dashed rgba(255, 255, 255, 0.5);
              `
            )}
          >
            padding.l[6]
          </div>

          <div
            className={cx(
              padding.r[6],
              css`
                background: ${color("bg-component")};
                border-radius: 4px;
                color: white;
                font-size: 12px;
                border-right: 2px dashed rgba(255, 255, 255, 0.5);
              `
            )}
          >
            padding.r[6]
          </div>
        </div>
      </div>

      <CodeBlock
        code={paddingCode}
        language="tsx"
        customHighlight={customHighlight}
      />
    </Section>
  );
});

SectionAtomicPadding.displayName = "SectionAtomicPadding";
