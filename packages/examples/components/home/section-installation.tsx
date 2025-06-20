import {
  color,
  spacing,
  typographyStyles,
  mediaQuery,
} from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import React from "react";
import { Container } from "../page";
import { CodeBlock } from "../ui";

const sectionClass = css`
  padding: ${spacing(12)} 0;
`;

const contentClass = css`
  max-width: 56rem;
  margin: 0 auto;
`;

const sectionTitleClass = css`
  margin-bottom: ${spacing(8)};
  ${typographyStyles("heading.large")};
  color: ${color("text.default")};
  text-align: center;

  ${mediaQuery("md")} {
    text-align: left;
  }
`;

const stepClass = css`
  margin-bottom: ${spacing(8)};

  &:last-child {
    margin-bottom: 0;
  }
`;

const stepTitleClass = css`
  margin-bottom: ${spacing(3)};
  ${typographyStyles("heading.medium")};
  color: ${color("text.default")};
`;

const stepDescClass = css`
  margin-bottom: ${spacing(4)};
  ${typographyStyles("body.medium")};
  color: ${color("text.secondary")};
`;

export const SectionInstallation: React.FC = () => {
  const customHighlight = (content: string, type: string) => {
    // 去除引号来匹配内容
    const cleanContent = content.replace(/['"]/g, "");

    const tokens = [
      "@choiceform/design-tokens",
      "initTokens",
      "spacing",
      "spacingList",
      "color",
      "bg-accent",
      "fg-on-accent",
      "React",
      "ReactDOM",
      "App",
    ];

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

    // 检查清理后的内容或原始内容
    if (tokens.includes(cleanContent) || tokens.includes(content)) {
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
    <section className={sectionClass}>
      <Container>
        <div className={contentClass}>
          <h2 className={sectionTitleClass}>Installation</h2>

          <div className={stepClass}>
            <h3 className={stepTitleClass}>Install Package</h3>
            <p className={stepDescClass}>
              Add the design token library to your project using your preferred
              package manager:
            </p>
            <CodeBlock
              code="npm install @choiceform/design-tokens"
              language="bash"
              customHighlight={customHighlight}
              className={css`
                background-color: ${color("background.secondary")};
              `}
            />
          </div>

          <div className={stepClass}>
            <h3 className={stepTitleClass}>Initialize Tokens</h3>
            <p className={stepDescClass}>
              Import the library to automatically initialize CSS variables.
              <strong>
                {" "}
                Important: Must be imported before any components render, such
                as above the App import.
              </strong>
            </p>
            <CodeBlock
              code={`// Import to initialize CSS variables
import '@choiceform/design-tokens'

// Or initialize manually
import { initTokens } from '@choiceform/design-tokens'
initTokens()`}
              language="tsx"
              customHighlight={customHighlight}
              className={css`
                background-color: ${color("background.secondary")};
              `}
            />
          </div>

          <div className={stepClass}>
            <h3 className={stepTitleClass}>Basic Usage</h3>
            <p className={stepDescClass}>
              Import design token functions and start building. Here&apos;s the
              correct import order in your main.tsx:
            </p>
            <CodeBlock
              code={`// main.tsx - Correct import order
import "" // Must be first
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`}
              language="tsx"
              customHighlight={customHighlight}
              className={css`
                background-color: ${color("background.secondary")};
                margin-bottom: ${spacing(4)};
              `}
            />
            <p className={stepDescClass}>
              Then use design tokens in your components:
            </p>
            <CodeBlock
              code={`import { spacingList, color } from '@choiceform/design-tokens'
import { styled } from '@linaria/react'

const Button = styled.button\`
  padding: \${spacingList(4, 8)};
  background-color: \${color('bg-accent')};
  color: \${color('fg-on-accent')};
\``}
              language="tsx"
              customHighlight={customHighlight}
              className={css`
                background-color: ${color("background.secondary")};
              `}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
