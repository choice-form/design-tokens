import {
  color,
  up,
  spacing,
  typographyStyles,
  shadow,
  radius,
} from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import React, { useState } from "react";
import { Container } from "../page";

// ============================================================================
// CSS-in-JS Library Demos
// ============================================================================

interface LibraryDemo {
  name: string;
  description: string;
  installation: string;
  usage: string;
  features: string[];
}

const libraryDemos: LibraryDemo[] = [
  {
    name: "Styled Components",
    description: "The most popular CSS-in-JS library with great DX",
    installation: "npm install styled-components",
    usage: `import styled from 'styled-components';
import { color, spacing, typographyStyles } from '@choiceform/design-tokens';

 const Button = styled.button\`
   background: \${() => color("background.accent")};
   color: \${() => color("text.on-accent")};
   padding: \${() => spacing(3)} \${() => spacing(6)};
   border-radius: \${() => radius("md")};
   \${() => typographyStyles("body.medium")};
   
   &:hover {
     background: \${() => color("background.accent-hover")};
   }
   
   \${() => up("md")} {
     padding: \${() => spacing(4)} \${() => spacing(8)};
   }
 \`;`,
    features: [
      "Runtime styling",
      "Theme provider",
      "SSR support",
      "TypeScript ready",
    ],
  },
  {
    name: "Emotion",
    description: "Performant and flexible CSS-in-JS library",
    installation: "npm install @emotion/react @emotion/styled",
    usage: `import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { color, spacing, typographyStyles } from '@choiceform/design-tokens';

 const Button = styled.button\`
   background: \${color("background.accent")};
   color: \${color("text.on-accent")};
   padding: \${spacing(3)} \${spacing(6)};
   border-radius: \${radius("md")};
   \${typographyStyles("body.medium")};
   
   &:hover {
     background: \${color("background.accent-hover")};
   }
   
   \${up("md")} {
     padding: \${spacing(4)} \${spacing(8)};
   }
 \`;

 // Or with css prop
 const buttonStyles = css\`
   background: \${color("background.accent")};
   color: \${color("text.on-accent")};
 \`;`,
    features: [
      "Great performance",
      "CSS prop support",
      "Source maps",
      "Framework agnostic",
    ],
  },
  {
    name: "Stitches",
    description: "CSS-in-JS with near-zero runtime",
    installation: "npm install @stitches/react",
    usage: `import { styled } from '@stitches/react';
import { color, spacing, typographyStyles } from '@choiceform/design-tokens';

 const Button = styled('button', {
   background: color("background.accent"),
   color: color("text.on-accent"),
   padding: \`\${spacing(3)} \${spacing(6)}\`,
   borderRadius: radius("md"),
   ...typographyStyles("body.medium"),
   
   '&:hover': {
     background: color("background.accent-hover"),
   },
   
   [\`@media \${up("md")}\`]: {
     padding: \`\${spacing(4)} \${spacing(8)}\`,
   },
 });`,
    features: [
      "Near-zero runtime",
      "Variants API",
      "TypeScript first",
      "Atomic CSS",
    ],
  },
  {
    name: "Vanilla Extract",
    description: "Zero-runtime Stylesheets-in-TypeScript",
    installation: "npm install @vanilla-extract/css",
    usage: `import { style } from '@vanilla-extract/css';
import { color, spacing, typographyStyles, up } from '@choiceform/design-tokens';

 export const button = style({
   background: color("background.accent"),
   color: color("text.on-accent"),
   padding: \`\${spacing(3)} \${spacing(6)}\`,
   borderRadius: radius("md"),
   ...typographyStyles("body.medium"),
   
   ':hover': {
     background: color("background.accent-hover"),
   },
   
   [\`@media \${up("md")}\`]: {
     padding: \`\${spacing(4)} \${spacing(8)}\`,
   },
 });`,
    features: [
      "Zero runtime",
      "Type safety",
      "CSS Modules",
      "Build-time extraction",
    ],
  },
  {
    name: "Linaria",
    description: "Zero-runtime CSS in JS library",
    installation: "npm install @linaria/core @linaria/react",
    usage: `import { css } from '@linaria/core';
import { color, spacing, typographyStyles, up } from '@choiceform/design-tokens';

 const button = css\`
   background: \${color("background.accent")};
   color: \${color("text.on-accent")};
   padding: \${spacing(3)} \${spacing(6)};
   border-radius: \${radius("md")};
   \${typographyStyles("body.medium")};
   
   &:hover {
     background: \${color("background.accent-hover")};
   }
   
   \${up("md")} {
     padding: \${spacing(4)} \${spacing(8)};
   }
 \`;`,
    features: [
      "Zero runtime",
      "Atomic CSS",
      "Build-time extraction",
      "Framework agnostic",
    ],
  },
  {
    name: "Compiled",
    description: "Build time CSS-in-JS by Atlassian",
    installation: "npm install @compiled/react",
    usage: `import { styled } from '@compiled/react';
import { color, spacing, typographyStyles, up } from '@choiceform/design-tokens';

 const Button = styled.button\`
   background: \${color("background.accent")};
   color: \${color("text.on-accent")};
   padding: \${spacing(3)} \${spacing(6)};
   border-radius: \${radius("md")};
   \${typographyStyles("body.medium")};
   
   &:hover {
     background: \${color("background.accent-hover")};
   }
   
   \${up("md")} {
     padding: \${spacing(4)} \${spacing(8)};
   }
 \`;`,
    features: [
      "Build-time optimization",
      "Atomic CSS",
      "Small bundle size",
      "TypeScript support",
    ],
  },
];

const sectionClass = css`
  padding: ${spacing(16)} 0;
  background: linear-gradient(
    135deg,
    ${color("background.default")} 0%,
    ${color("background.secondary")} 100%
  );
`;

const headerClass = css`
  text-align: center;
  margin-bottom: ${spacing(12)};
`;

const titleClass = css`
  ${typographyStyles("heading.display")};
  color: ${color("text.default")};
  margin-bottom: ${spacing(4)};

  ${up("md")} {
    ${typographyStyles("heading.display")};
  }
`;

const subtitleClass = css`
  ${typographyStyles("body.large")};
  color: ${color("text.secondary")};
  max-width: 48rem;
  margin: 0 auto;
  line-height: 1.7;
`;

const demosListClass = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing(6)};
  max-width: 64rem;
  margin: 0 auto;
`;

const demoCardClass = css`
  background: ${color("background.default")};
  border-radius: ${radius("md")};
  padding: ${spacing(6)};
  border: 1px solid ${color("border.default")};

  &:hover {
    border-color: ${color("border.selected")};
  }
`;

const demoHeaderClass = css`
  margin-bottom: ${spacing(4)};
`;

const demoNameClass = css`
  ${typographyStyles("heading.medium")};
  color: ${color("text.default")};
  margin-bottom: ${spacing(2)};
`;

const demoDescClass = css`
  ${typographyStyles("body.medium")};
  color: ${color("text.secondary")};
  margin-bottom: ${spacing(3)};
`;

const installCommandClass = css`
  background: ${color("background.tertiary")};
  border-radius: ${radius("sm")};
  padding: ${spacing(2)} ${spacing(3)};
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 0.75rem;
  color: ${color("text.default")};
  margin-bottom: ${spacing(4)};
  overflow-x: auto;
`;

const codeBlockClass = css`
  background: ${color("background.menu")};
  border-radius: ${radius("md")};
  padding: ${spacing(4)};
  margin-bottom: ${spacing(4)};
  overflow-x: auto;

  pre {
    margin: 0;
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: 0.8rem;
    line-height: 1.5;
    color: ${color("text.inverse")};
  }
`;

const featuresListClass = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const featureItemClass = css`
  display: flex;
  align-items: center;
  gap: ${spacing(2)};
  margin-bottom: ${spacing(1.5)};

  &::before {
    content: "✓";
    color: ${color("text.success")};
    font-weight: bold;
    flex-shrink: 0;
  }
`;

const featureTextClass = css`
  ${typographyStyles("body.small")};
  color: ${color("text.secondary")};
`;

const toggleButtonClass = css`
  background: ${color("background.accent")};
  color: ${color("text.on-accent")};
  border: none;
  border-radius: ${radius("md")};
  padding: ${spacing(2)} ${spacing(4)};
  ${typographyStyles("body.small")};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: ${spacing(3)};

  &:hover {
    background: ${color("background.accent-hover")};
  }
`;

export const SectionCssInJsDemos: React.FC = () => {
  const [expandedDemo, setExpandedDemo] = useState<string | null>(null);

  const toggleDemo = (demoName: string) => {
    setExpandedDemo(expandedDemo === demoName ? null : demoName);
  };

  return (
    <section className={sectionClass}>
      <Container>
        <div className={headerClass}>
          <h2 className={titleClass}>Universal CSS-in-JS Support</h2>
          <p className={subtitleClass}>
            Our design tokens work seamlessly with every major CSS-in-JS
            library. Use the same token API across different projects and teams.
            No lock-in, maximum flexibility.
          </p>
        </div>

        <div className={demosListClass}>
          {libraryDemos.map((demo) => (
            <div key={demo.name} className={demoCardClass}>
              <div className={demoHeaderClass}>
                <h3 className={demoNameClass}>{demo.name}</h3>
                <p className={demoDescClass}>{demo.description}</p>

                <div className={installCommandClass}>{demo.installation}</div>

                <button
                  className={toggleButtonClass}
                  onClick={() => toggleDemo(demo.name)}
                >
                  {expandedDemo === demo.name
                    ? "Hide Code"
                    : "Show Code Example"}
                </button>
              </div>

              {expandedDemo === demo.name && (
                <div className={codeBlockClass}>
                  <pre>{demo.usage}</pre>
                </div>
              )}

              <ul className={featuresListClass}>
                {demo.features.map((feature, index) => (
                  <li key={index} className={featureItemClass}>
                    <span className={featureTextClass}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
