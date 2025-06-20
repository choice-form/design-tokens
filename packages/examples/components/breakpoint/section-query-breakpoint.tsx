import {
  color,
  mediaQuery,
  spacing,
  typographyStyles,
} from "@choiceform/design-tokens/helpers";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { memo } from "react";
import { CodeBlock, Section } from "..";

const Container = styled.div`
  display: grid;
  gap: ${spacing(4)};
  padding: ${spacing(4)};
  background-color: ${color("bg.default")};

  &::before {
    display: block;
    ${typographyStyles("body.large-strong")}
  }

  /* 移动设备 */
  ${mediaQuery("sm")} {
    background-color: ${color("bg.accent", 0.1)};

    &::before {
      color: ${color("fg.accent")};
      content: "📱 Mobile (xs+)";
    }
  }

  /* 平板设备 */
  ${mediaQuery("md")} {
    background-color: ${color("bg.success", 0.1)};

    &::before {
      color: ${color("fg.success")};
      content: "📱 Tablet (md-lg)";
    }
  }

  /* 桌面设备 */
  ${mediaQuery("lg")} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    grid-auto-flow: column;
    background-color: ${color("bg.warning", 0.1)};

    &::before {
      color: ${color("fg.warning")};
      content: "🖥️ Desktop (lg+)";
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
  ${mediaQuery("lg")} {
    grid-row: 2 / 3;
  }

  h3 {
    ${typographyStyles("body.medium-strong")};
  }
`;

const Code = styled.div`
  background: ${color("bg.default")};

  ${mediaQuery("lg")} {
    grid-row: 1 / 3;
  }
`;

const demoCode = `const ResponsiveDemo = styled.div\`
  \${mobile()} {
    ...
  }

  \${tablet()} {
    ...
  }

  \${desktop()} {
    ...
  }
\``;

export const SectionQueryBreakpoint = memo(function SectionQueryBreakpoint() {
  const customHighlight = (content: string) => {
    if (["mobile", "tablet", "desktop"].includes(content)) {
      return (
        <span
          key={content}
          className={css`
            color: ${color("fg.assistive")};
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
      title="Breakpoint Query"
      content={
        <>
          <p>
            The breakpoint system provides two types of functions: media query
            functions and device preset functions. Media query functions are
            used to create media queries based on breakpoints, while device
            preset functions are used to create media queries based on device
            types.
          </p>
        </>
      }
    >
      <Container>
        <Content>
          <h3>Media Query</h3>
          <p>This container uses responsive maximum width limits:</p>
          <ul>
            <li>sm: Max width 640px</li>
            <li>md: Max width 768px</li>
            <li>lg: Max width 1024px</li>
            <li>xl: Max width 1280px</li>
          </ul>
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
