import { color } from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { memo } from "react";
import { CodeBlock, Section } from "..";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1 / 3;
`;

const Wrapper = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid ${color("border.default")};
  }
`;

const mediaQueryFunctionsCode = `import { up, down, between, only, media } from '@choiceform/design-js-tokens'

// "@media screen and (min-width: 768px)"
up("md")

// "@media screen and (max-width: 1023.98px)"
down("lg")

// "@media screen and (min-width: 640px) and (max-width: 1023.98px)"
between("sm", "lg")

// "@media screen and (min-width: 768px) and (max-width: 1023.98px)"
only("md") 

// "@media screen and (min-width: 768px) and (max-width: 1023.98px) and (orientation: landscape)"
media({ 
  minWidth: "md", 
  maxWidth: "lg", 
  orientation: "landscape" 
}) 
`;

const devicePresetFunctionsCode = `import { mobile, tablet, desktop } from '@choiceform/design-js-tokens'

// "@media screen and (min-width: 475px)"
mobile()

// "@media screen and (min-width: 768px) and (max-width: 1023.98px)"
tablet()

// "@media screen and (min-width: 1024px)"
desktop()
`;

export const SectionUsageBreakpoint = memo(function SectionUsageBreakpoint() {
  const customHighlight = (content: string, type: string) => {
    // 注释高亮为灰色
    if (type === "comment") {
      return (
        <span
          key={content + Math.random()}
          className={css`
            color: ${color("text.secondary")};
          `}
        >
          {content}
        </span>
      );
    }
    // 断点名高亮为辅助色
    if (/^"?(xs|sm|md|lg|xl|2xl|landscape)"?$/.test(content)) {
      return (
        <span
          key={content + Math.random()}
          className={css`
            color: ${color("text.assistive")};
          `}
        >
          {content}
        </span>
      );
    }
    if (["mobile", "tablet", "desktop"].includes(content)) {
      return (
        <span
          key={content + Math.random()}
          className={css`
            color: ${color("text.assistive")};
          `}
        >
          {content}
        </span>
      );
    }
    return undefined;
  };

  return (
    <Section
      title="Breakpoint Usage"
      content={
        <>
          <p>
            The breakpoint system provides two types of functions: media query
            functions and device preset functions.
          </p>
          <p>
            Media query functions are used to create media queries based on
            breakpoints, while device preset functions are used to create media
            queries based on device types.
          </p>
        </>
      }
    >
      <Container>
        <Wrapper>
          <CodeBlock
            code={mediaQueryFunctionsCode}
            language="tsx"
            customHighlight={customHighlight}
          />
        </Wrapper>
        <Wrapper>
          <CodeBlock
            code={devicePresetFunctionsCode}
            language="tsx"
            customHighlight={customHighlight}
          />
        </Wrapper>
      </Container>
    </Section>
  );
});
