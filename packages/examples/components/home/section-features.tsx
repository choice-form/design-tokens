import {
  color,
  mediaQuery,
  spacing,
  typographyStyles,
} from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import React from "react";
import { Container } from "../page";

interface Feature {
  description: string;
  items: string[];
  title: string;
}

const featuresData: Feature[] = [
  {
    title: "Zero Runtime Overhead",
    description:
      "Built on Linaria's compile-time CSS generation for maximum performance.",
    items: [
      "Compile-time CSS extraction",
      "No runtime style injection",
      "Optimal bundle size",
      "Native CSS performance",
    ],
  },
  {
    title: "Complete Type Safety",
    description:
      "Full TypeScript integration with intelligent autocomplete and validation.",
    items: [
      "TypeScript native support",
      "Intelligent autocomplete",
      "Compile-time validation",
      "IDE integration",
    ],
  },
  {
    title: "Design Token System",
    description: "Comprehensive token system covering all design aspects.",
    items: [
      "Spacing and layout tokens",
      "Color and theme system",
      "Typography and shadows",
      "Responsive breakpoints",
    ],
  },
];

const sectionClass = css`
  padding: ${spacing(12)} 0;
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

  ${mediaQuery("md")} {
    text-align: left;
  }
`;

const featureClass = css`
  margin-bottom: ${spacing(8)};
  padding-bottom: ${spacing(6)};
  border-bottom: 1px solid ${color("border.default")};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const featureTitleClass = css`
  margin-bottom: ${spacing(3)};
  ${typographyStyles("heading.medium")};
  color: ${color("text.default")};
`;

const featureDescClass = css`
  margin-bottom: ${spacing(4)};
  ${typographyStyles("body.medium")};
  color: ${color("text.secondary")};
`;

const featureListClass = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const featureItemClass = css`
  display: flex;
  align-items: flex-start;
  gap: ${spacing(2)};
  margin-bottom: ${spacing(2)};
  padding: ${spacing(1)} 0;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: "•";
    color: ${color("text.accent")};
    font-weight: bold;
    flex-shrink: 0;
    margin-top: ${spacing(0.5)};
  }
`;

const featureItemTextClass = css`
  ${typographyStyles("body.medium")};
  color: ${color("text.default")};
`;

export const SectionFeatures: React.FC = () => {
  return (
    <section className={sectionClass}>
      <Container>
        <div className={contentClass}>
          <h2 className={sectionTitleClass}>Features</h2>

          {featuresData.map((feature, index) => (
            <div key={index} className={featureClass}>
              <h3 className={featureTitleClass}>{feature.title}</h3>
              <p className={featureDescClass}>{feature.description}</p>
              <ul className={featureListClass}>
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={featureItemClass}>
                    <span className={featureItemTextClass}>{item}</span>
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
