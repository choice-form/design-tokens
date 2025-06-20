import {
  color,
  spacing,
  typographyStyles,
  mediaQuery,
} from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../page";

const heroSectionClass = css`
  padding: ${spacing(32)} 0 ${spacing(8)};
  background-color: ${color("background.default")};
`;

const heroContentClass = css`
  max-width: 56rem;
  margin: 0 auto;
`;

const heroTitleClass = css`
  margin-bottom: ${spacing(4)};
  ${typographyStyles("heading.display")};
  color: ${color("text.default")};
  font-weight: 600;
  text-align: center;

  ${mediaQuery("md")} {
    text-align: left;
  }
`;

const heroSubtitleClass = css`
  margin-bottom: ${spacing(8)};
  ${typographyStyles("body.large")};
  color: ${color("text.secondary")};
  text-align: center;

  ${mediaQuery("md")} {
    text-align: left;
  }
`;

const heroActionsClass = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing(3)};
  margin-bottom: ${spacing(12)};
  justify-content: center;

  ${mediaQuery("md")} {
    justify-content: flex-start;
  }
`;

const buttonClass = css`
  display: inline-flex;
  align-items: center;
  gap: ${spacing(2)};
  padding: ${spacing(2)} ${spacing(4)};
  border: 1px solid ${color("border.default")};
  border-radius: ${spacing(1)};
  background-color: ${color("background.default")};
  color: ${color("text.default")};
  text-decoration: none;
  ${typographyStyles("body.medium")};
  cursor: pointer;
`;

const primaryButtonClass = css`
  background-color: ${color("background.inverse")};
  color: ${color("text.inverse")};
  border-color: ${color("background.inverse")};
`;

const badgeListClass = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing(4)};
  margin-bottom: ${spacing(8)};
  justify-content: center;

  ${mediaQuery("md")} {
    justify-content: flex-start;
  }
`;

const badgeClass = css`
  padding: ${spacing(1)} ${spacing(3)};
  background-color: ${color("background.secondary")};
  ${typographyStyles("body.small")};
  color: ${color("text.secondary")};
  white-space: nowrap;
`;

export const SectionHero: React.FC = () => {
  return (
    <section className={heroSectionClass}>
      <Container>
        <div className={heroContentClass}>
          <h1 className={heroTitleClass}>@choiceform/design-tokens</h1>

          <p className={heroSubtitleClass}>
            Modern CSS-in-JS design tokens system with Linaria. Zero runtime
            overhead, full TypeScript support, and complete theme integration.
          </p>

          <div className={badgeListClass}>
            <span className={badgeClass}>Zero Runtime</span>
            <span className={badgeClass}>TypeScript</span>
            <span className={badgeClass}>Linaria</span>
            <span className={badgeClass}>Theme Support</span>
          </div>

          <div className={heroActionsClass}>
            <Link
              to="/colors"
              className={`${buttonClass} ${primaryButtonClass}`}
            >
              View Documentation
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
