import {
  color,
  spacing,
  spacingList,
  typographyStyles,
  up,
} from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import React from "react";
import { CodeBlock } from "../ui";
import { Container } from "../page";

const sectionClass = css`
  padding: ${spacingList([12, 0, 48, 0])};
  background-color: ${color("background.default")};
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

  ${up("md")} {
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

export const SectionViteConfiguration: React.FC = () => {
  const customHighlight = (content: string, type: string) => {
    const tokens = [
      "@linaria/core",
      "@linaria/react",
      "@wyw-in-js/vite",
      "wyw",
      "react",
      "defineConfig",
      "@vitejs/plugin-react",
      "@babel/preset-typescript",
      "@babel/preset-react",
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
    if (tokens.includes(content)) {
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
          <h2 className={sectionTitleClass}>Vite Setup</h2>

          <div className={stepClass}>
            <h3 className={stepTitleClass}>Install Dependencies</h3>
            <p className={stepDescClass}>
              Install Linaria dependencies for Vite integration:
            </p>
            <CodeBlock
              code={`npm install -D @linaria/core @linaria/react @wyw-in-js/vite`}
              language="bash"
              customHighlight={customHighlight}
              className={css`
                background-color: ${color("background.secondary")};
              `}
            />
          </div>

          <div className={stepClass}>
            <h3 className={stepTitleClass}>Configure Vite</h3>
            <p className={stepDescClass}>
              Add Linaria plugin to your vite.config.ts:
            </p>
            <CodeBlock
              code={`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { wyw } from '@wyw-in-js/vite'

export default defineConfig({
  plugins: [
    react(),
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react']
      },
      classNameSlug: (hash, name) => \`\${name}-\${hash}\`,
    })
  ]
})`}
              language="typescript"
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
