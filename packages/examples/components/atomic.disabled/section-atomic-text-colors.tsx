import { color, spacing, typographyStyles } from "@choiceform/design-tokens/helpers";
import { css, cx } from "@linaria/core";
import { memo } from "react";
import { CodeBlock, ColorField, ColorValue, Panel, Section } from "..";
import { text } from "../../../css-in-js/src/atomic";
import { BaseColorKey } from "@choiceform/design-tokens/helpers";

const textColorCode = `
<div
  className={cx(
    \${text.accent}
    \${text.danger}
    \${text.default}
  )}
>
  Flexible text styling with any color
</div>
`;

export const SectionAtomicTextColors = memo(function SectionAtomicTextColors() {
  const customHighlight = (content: string) => {
    if (
      [
        "text",
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
      title="Text Color Atoms"
      content={
        <p>
          Text atomic styles break traditional color usage limitations. You can
          apply any color palette to text elements through flexible semantic
          structure: text.colorType.colorName. Use fg for foreground colors, bg
          for background colors, bd for border colors, and ic for icon colors on
          text elements.
        </p>
      }
    >
      {["light", "dark"].map((theme) => (
        <Panel theme={theme as "light" | "dark"} key={theme}>
          <div
            className={css`
              display: flex;
              flex-direction: column;
              gap: ${spacing(4)};
              ${typographyStyles("heading-medium")};
            `}
          >
            <ColorField
              colorString={<span className={text.assistive}>text.accent</span>}
            />
            <div className={text.accent}>The quick brown fox</div>
            <ColorField
              colorString={<span className={text.assistive}>text.danger</span>}
            />
            <div className={text.danger}>The quick brown fox</div>
            <ColorField
              colorString={<span className={text.assistive}>text.success</span>}
            />
            <div className={text.success}>The quick brown fox</div>
            <ColorField
              colorString={<span className={text.assistive}>text.warning</span>}
            />
            <div className={text.warning}>The quick brown fox</div>
            <ColorField
              colorString={<span className={text.assistive}>text.default</span>}
            />
            <div className={text.default}>The quick brown fox</div>
            <ColorField
              colorString={
                <span className={text.assistive}>text.secondary</span>
              }
            />
            <div className={text.secondary}>The quick brown fox</div>
          </div>
        </Panel>
      ))}

      <div
        className={css`
          border-top: 1px solid ${color("bd-default")};
        `}
      >
        <CodeBlock
          code={textColorCode}
          language="tsx"
          customHighlight={customHighlight}
        />
      </div>
    </Section>
  );
});

SectionAtomicTextColors.displayName = "SectionAtomicTextColors";
