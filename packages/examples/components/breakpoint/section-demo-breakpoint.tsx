import {
  color,
  spacing,
  typographyStyles,
  mediaQuery,
} from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { memo, useEffect, useState } from "react";
import { CodeBlock, Section } from "..";

const Container = styled.div`
  padding: ${spacing(4)};
  background-color: ${color("background.secondary")};

  /* 响应式样式演示 */
  ${mediaQuery("sm")} {
    padding: ${spacing(6)};
    background-color: ${color("background.accent", 0.1)};
  }

  ${mediaQuery("md")} {
    padding: ${spacing(8)};
    background-color: ${color("background.accent", 0.2)};
  }

  ${mediaQuery("lg")} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${spacing(6)};
    padding: ${spacing(10)};
    background-color: ${color("background.accent", 0.3)};
  }
`;

const Content = styled.div`
  h3 {
    margin: 0 0 ${spacing(3)};
    ${typographyStyles("body.large-strong")};
  }

  p {
    margin: 0 0 ${spacing(2)};
  }
`;

const Code = styled.div`
  background: ${color("background.default")};
`;

const demoCode = `const ResponsiveDemo = styled.div\`
  \${mediaQuery("sm")} {
    ...
  }

  \${mediaQuery("md")} {
    ...
  }

  \${mediaQuery("lg")} {
    ...
  }
\``;

export const SectionDemoBreakpoint = memo(function SectionDemoBreakpoint() {
  const [viewportWidth, setViewportWidth] = useState(0);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("");

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      setViewportWidth(width);

      // 根据宽度确定当前断点
      if (width >= 1536) setCurrentBreakpoint("2xl");
      else if (width >= 1280) setCurrentBreakpoint("xl");
      else if (width >= 1024) setCurrentBreakpoint("lg");
      else if (width >= 768) setCurrentBreakpoint("md");
      else if (width >= 640) setCurrentBreakpoint("sm");
      else if (width >= 475) setCurrentBreakpoint("xs");
      else setCurrentBreakpoint("< xs");
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const customHighlight = (content: string, type: string) => {
    // 匹配带引号的断点名
    if (/^"(xs|sm|md|lg|xl|2xl)"$/.test(content)) {
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
      orientation="vertical"
      title="Breakpoint Demo"
      content={
        <>
          <p>Adjust the browser window size to observe responsive changes:</p>
          <p>
            The container will change styles based on different breakpoints:
          </p>
          <ul>
            <li>xs: base style, light gray background</li>
            <li>sm+: increased padding, light blue background </li>
            <li>md+: more padding, deeper blue background</li>
            <li>lg+: grid layout, deep blue background</li>
          </ul>
        </>
      }
    >
      <Container>
        <Content>
          <h3>Breakpoint Information</h3>
          <p>
            Current viewport width:{" "}
            <span
              className={css`
                color: ${color("text.assistive")};
              `}
            >
              {viewportWidth}px
            </span>
          </p>
          <p>
            Current breakpoint:{" "}
            <span
              className={css`
                color: ${color("text.assistive")};
              `}
            >
              {currentBreakpoint}
            </span>
          </p>
          <p>
            This area will display as a two-column layout above the lg
            breakpoint.
          </p>
        </Content>

        <Code>
          <CodeBlock
            code={demoCode}
            language="tsx"
            customHighlight={customHighlight}
          />
        </Code>
      </Container>
    </Section>
  );
});
