import { color } from "@choiceform/design-tokens";
import { css, cx } from "@linaria/core";
import { memo } from "react";
import { CodeBlock, Section } from "..";
import { margin } from "../../../css-in-js/src/atomic";

const marginCode = `
<div
  className={\`
    \${margin[4]}
    \${margin.x[8]}
    \${margin.t[2]}
    \${margin.b[6]}
  \`}
>
  Flexible margins with directional control
</div>
`;

export const SectionAtomicMargins = memo(function SectionAtomicMargins() {
  const customHighlight = (content: string) => {
    if (
      [
        "margin",
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
      title="Margin Atoms"
      content={
        <p>
          Margin atomic styles provide comprehensive control over external
          spacing. Apply margins to all sides (margin[4]), specific directions
          (margin.x[8], margin.y[6]), or individual sides (margin.t[2],
          margin.b[4], margin.l[3], margin.r[5]) using our consistent 4px
          spacing scale for perfect alignment.
        </p>
      }
    >
      <div
        className={css`
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 24px;
        `}
      >
        <div
          className={css`
            background: rgba(${color("bg-accent")}, 0.1);
            padding: 16px;
            border-radius: 8px;
            border: 1px dashed ${color("bd-selected")};
          `}
        >
          <div
            className={css`
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            `}
          >
            <div
              className={cx(
                margin[4],
                css`
                  background: ${color("bg-accent")};
                  color: white;
                  padding: 8px 12px;
                  border-radius: 4px;
                  font-size: 12px;
                `
              )}
            >
              margin[4]
            </div>

            <div
              className={cx(
                margin.x[8],
                css`
                  background: ${color("bg-success")};
                  color: white;
                  padding: 8px 12px;
                  border-radius: 4px;
                  font-size: 12px;
                `
              )}
            >
              margin.x[8]
            </div>

            <div
              className={cx(
                margin.y[6],
                css`
                  background: ${color("bg-warning")};
                  color: white;
                  padding: 8px 12px;
                  border-radius: 4px;
                  font-size: 12px;
                `
              )}
            >
              margin.y[6]
            </div>
          </div>
        </div>

        <div
          className={css`
            background: rgba(${color("bg-component")}, 0.1);
            padding: 16px;
            border-radius: 8px;
            border: 1px dashed ${color("bd-selected")};
          `}
        >
          <div
            className={css`
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            `}
          >
            <div
              className={cx(
                margin.t[8],
                css`
                  background: ${color("bg-component")};
                  color: white;
                  padding: 8px 12px;
                  border-radius: 4px;
                  font-size: 12px;
                `
              )}
            >
              margin.t[8]
            </div>

            <div
              className={cx(
                margin.b[6],
                css`
                  background: ${color("bg-component")};
                  color: white;
                  padding: 8px 12px;
                  border-radius: 4px;
                  font-size: 12px;
                `
              )}
            >
              margin.b[6]
            </div>

            <div
              className={cx(
                margin.l[4],
                css`
                  background: ${color("bg-component")};
                  color: white;
                  padding: 8px 12px;
                  border-radius: 4px;
                  font-size: 12px;
                `
              )}
            >
              margin.l[4]
            </div>

            <div
              className={cx(
                margin.r[10],
                css`
                  background: ${color("bg-component")};
                  color: white;
                  padding: 8px 12px;
                  border-radius: 4px;
                  font-size: 12px;
                `
              )}
            >
              margin.r[10]
            </div>
          </div>
        </div>
      </div>

      <CodeBlock
        code={marginCode}
        language="tsx"
        customHighlight={customHighlight}
      />
    </Section>
  );
});

SectionAtomicMargins.displayName = "SectionAtomicMargins";
