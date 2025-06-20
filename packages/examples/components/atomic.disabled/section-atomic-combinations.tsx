import { color } from "@choiceform/design-tokens/helpers";
import { css, cx } from "@linaria/core";
import { memo } from "react";
import { CodeBlock, Section } from "..";
import {
  text,
  background,
  border,
  padding,
  width,
  height,
  flex,
  flexRow,
  gap,
} from "../../../css-in-js/src/atomic";

const combinationCode = `
<div
  className={\`
    \${background.danger}
    \${text.onAccent}
    \${border.warning}
    \${padding[3]}
    \${width.full}
    \${height[10]}
  \`}
>
  Unlimited creative combinations
</div>
`;

export const SectionAtomicCombinations = memo(
  function SectionAtomicCombinations() {
    const customHighlight = (content: string) => {
      if (
        [
          "text",
          "background",
          "border",
          "width",
          "height",
          "padding",
          "fg",
          "bg",
          "bd",
          "ic",
          "accent",
          "danger",
          "warning",
          "default",
          "secondary",
          "tertiary",
          "selected",
          "onAccent",
          "disabled",
          "hover",
          "component",
          "assistive",
          "success",
          "inverse",
          "menu",
          "toolbar",
          "strong",
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
          "1_2",
          "1_3",
          "2_3",
          "1_4",
          "3_4",
        ].includes(content) ||
        content.match(/^\d+$/) ||
        content.match(/^"\d+_\d+"$/)
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
        title="Creative Combinations"
        content={
          <p className={gap[4]}>
            The true power of atomic styles emerges when combining different
            atomic classes. Mix and match text colors, background colors, border
            colors, sizing, and spacing to create unlimited design
            possibilities. Each atomic class is independent and composable,
            enabling rapid prototyping and consistent styling.
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
            className={cx(
              background.danger,
              text.onAccent,

              padding[3],
              width.full,
              height[10],
              css`
                border-width: 2px;
                border-style: solid;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
              `
            )}
          >
            Danger background + OnAccent text + Warning border
          </div>

          <div
            className={cx(
              background.accent,
              text.default,

              padding.x[6],
              padding.y[4],
              width["1_2"],
              height[12],
              css`
                border-width: 2px;
                border-style: dashed;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
              `
            )}
          >
            Accent foreground as background + Default background as text
          </div>

          <div
            className={cx(
              background.default,
              text.default,

              padding[5],
              width[64],
              height[16],
              css`
                border-width: 3px;
                border-style: dotted;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 14px;
              `
            )}
          >
            Border color as background + Icon color as text
          </div>
        </div>

        <CodeBlock
          code={combinationCode}
          language="tsx"
          customHighlight={customHighlight}
        />
      </Section>
    );
  }
);

SectionAtomicCombinations.displayName = "SectionAtomicCombinations";
