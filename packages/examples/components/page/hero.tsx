import {
  color,
  spacing,
  typographyStyles,
} from "@choiceform/design-tokens/helpers";
import { css } from "@linaria/core";
import { memo } from "react";

const heroClass = css`
  padding: ${spacing(16)} 0;
  text-align: left;
`;

const heroTitleClass = css`
  margin-bottom: ${spacing(4)};
  color: ${color("fg.default")};
  ${typographyStyles("heading.large")};
`;

const heroDescriptionClass = css`
  margin-bottom: ${spacing(6)};
  color: ${color("fg.secondary")};
`;

interface HeroProps {
  description?: string;
  title: string;
}

export const Hero = memo(function Hero(props: HeroProps) {
  const { title, description } = props;

  return (
    <div className={heroClass}>
      <h1 className={heroTitleClass}>{title}</h1>
      {description && <p className={heroDescriptionClass}>{description}</p>}
    </div>
  );
});

Hero.displayName = "Hero";
