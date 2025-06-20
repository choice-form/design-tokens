import { color } from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import { memo } from "react";
import { background, text } from "../../../css-in-js/src/atomic";
import { CodeBlock, ColorField, Panel, Section } from "..";

const backgroundColorCode = `
<div
  className={cx(
    \${background.accent}
    \${background.danger}
    \${background.warning}
  )}
>
  Flexible background styling with any color
</div>
`;

export const SectionAtomicBackgroundColors = memo(
  function SectionAtomicBackgroundColors() {
    const customHighlight = (content: string) => {
      if (
        [
          "background",
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
        title="Background Color Atoms"
        content={
          <p>
            Background atomic styles revolutionize how we apply colors to
            backgrounds. Instead of being limited to traditional background
            colors, you can use any color from any palette: foreground colors,
            border colors, or icon colors as background colors through
            background.colorType.colorName syntax.
          </p>
        }
      >
        {["light", "dark"].map((theme) => (
          <Panel theme={theme as "light" | "dark"} key={theme}>
            <ColorField
              colorClass={background.accent}
              colorString={
                <span className={text.assistive}>background.accent</span>
              }
            />
            <ColorField
              colorClass={background.danger}
              colorString={
                <span className={text.assistive}>background.danger</span>
              }
            />
            <ColorField
              colorClass={background.success}
              colorString={
                <span className={text.assistive}>background.success</span>
              }
            />
            <ColorField
              colorClass={background.warning}
              colorString={
                <span className={text.assistive}>background.warning</span>
              }
            />
            <ColorField
              colorClass={background.secondary}
              colorString={
                <span className={text.assistive}>background.secondary</span>
              }
            />
            <ColorField
              colorClass={background.tertiary}
              colorString={
                <span className={text.assistive}>background.tertiary</span>
              }
            />
          </Panel>
        ))}

        <div
          className={css`
            border-top: 1px solid ${color("bd-default")};
          `}
        >
          <CodeBlock
            code={backgroundColorCode}
            language="tsx"
            customHighlight={customHighlight}
          />
        </div>
      </Section>
    );
  }
);

SectionAtomicBackgroundColors.displayName = "SectionAtomicBackgroundColors";
