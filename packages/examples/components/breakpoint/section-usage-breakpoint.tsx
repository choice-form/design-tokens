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

const mediaQueryFunctionsCode = `import { mediaQuery, mediaQueryDown } from '@choiceform/design-tokens'

// "@media screen and (min-width: 768px)"
mediaQuery("md")

// "@media screen and (max-width: 1023.98px)"
mediaQueryDown("lg")

// For complex queries, you can use multiple breakpoints
// or combine with custom CSS media queries
`;

const devicePresetFunctionsCode = `import { mediaQuery } from '@choiceform/design-tokens'

// Mobile-first approach using named breakpoints
// "@media screen and (min-width: 640px)"  // small screens
mediaQuery("sm")

// "@media screen and (min-width: 768px)"  // tablets
mediaQuery("md") 

// "@media screen and (min-width: 1024px)" // desktop
mediaQuery("lg")
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
    if (["mediaQuery", "mediaQueryDown"].includes(content)) {
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
