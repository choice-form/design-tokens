import { color, spacing } from "@choiceform/design-tokens";
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

const usageCode = `// Recommended
const Button = styled.button\`
  padding: \${spacingList(2, 4)};
  margin: \${spacing(3)};
\`

// Not recommended
const Button = styled.button\`
  padding: \${spacing(2)} \${spacing(4)};
\`

// Dynamic spacing
const Card = styled.div<{ compact?: boolean }>\`
  padding: \${props => props.compact ? spacing(2) : spacing(4)};
\``;

export const SectionUsageSpacing = memo(function SectionUsageSpacing() {
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

    if (["spacingList", "spacing"].includes(content)) {
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
            <b>Basic principles</b>
          </p>
          <ul
            className={css`
              list-style: disc;
              padding-left: ${spacing(4)};
              display: flex;
              flex-direction: column;
              gap: ${spacing(2)};
            `}
          >
            <li>Use preset values (0, 1, 2, 3, 4, 6, 8, 12, 16, 20)</li>
            <li>Use any value when needed (2.5, 7.5, 15, etc.)</li>
            <li>
              Use breakpoint aliases for container width (sm, md, lg, xl, 2xl)
            </li>
            <li>Use spacingList() function for multiple values</li>
          </ul>
        </>
      }
    >
      <Container>
        <Wrapper>
          <CodeBlock
            code={usageCode}
            language="tsx"
            customHighlight={customHighlight}
          />
        </Wrapper>
      </Container>
    </Section>
  );
});
