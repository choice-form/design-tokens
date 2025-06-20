import { color } from "@choiceform/design-tokens/helpers";
import { css, cx } from "@linaria/core";
import { memo } from "react";
import { CodeBlock, ColorField, Panel, Section } from "..";
import { border, text } from "../../../css-in-js/src/atomic";

const borderColorCode = `
<div
  className={cx(
    \${border.accent}
    \${border.danger}
    \${border.default}
  )}
>
  Flexible border styling with any color
</div>
`;

export const SectionAtomicBorderColors = memo(
  function SectionAtomicBorderColors() {
    const customHighlight = (content: string) => {
      if (
        [
          "border",
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
        ].includes(content)
      ) {
        return (
          <span
            key={content + Math.random()}
            className={css`
              color: ${color("fg-assistive")};
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
        title="Border Color Atoms"
        content={
          <p>
            Border atomic styles provide unprecedented flexibility in border
            coloring. You can apply any color from any palette to borders:
            foreground colors, background colors, or icon colors as border
            colors using border.colorType.colorName semantic structure.
          </p>
        }
      >
        {["light", "dark"].map((theme) => (
          <Panel theme={theme as "light" | "dark"} key={theme}>
            <ColorField
              colorClass={cx(border.DEFAULT)}
              colorString={
                <span className={text.assistive}>border.default</span>
              }
            />
            <ColorField
              colorClass={cx(border.strong, border[1])}
              colorString={
                <span className={text.assistive}>border.strong</span>
              }
            />
            <ColorField
              colorClass={cx(border.selected, border[1])}
              colorString={
                <span className={text.assistive}>border.selected</span>
              }
            />
            <ColorField
              colorClass={cx(border.selectedStrong, border[1])}
              colorString={
                <span className={text.assistive}>border.selectedStrong</span>
              }
            />
          </Panel>
        ))}

        <CodeBlock
          className={cx(border.t.DEFAULT)}
          code={borderColorCode}
          language="tsx"
          customHighlight={customHighlight}
        />
      </Section>
    );
  }
);

SectionAtomicBorderColors.displayName = "SectionAtomicBorderColors";
