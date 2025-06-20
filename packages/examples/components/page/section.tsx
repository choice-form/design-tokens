import {
  color,
  mediaQuery,
  spacing,
  typographyStyles,
} from "@choiceform/design-tokens/helpers";
import { styled } from "@linaria/react";
import { memo } from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  content?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  title: string;
}

const SectionRoot = styled.section`
  margin-bottom: ${spacing(32)};
  ${typographyStyles("body.medium")};
`;
const SectionContainer = styled.div`
  display: grid;
  gap: ${spacing(8)};

  &[data-orientation="horizontal"] {
    ${mediaQuery("lg")} {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: ${spacing(4)};
  color: ${color("fg.default")};
  ${typographyStyles("heading.small")};
`;

const SectionChildren = styled.div`
  display: grid;
  box-shadow: inset 0 0 0 1px ${color("black", 0.1)};

  &:where([data-orientation="horizontal"] *) {
    ${mediaQuery("lg")} {
      grid-column: 2 / 4;
    }
    ${mediaQuery("md")} {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
  ${typographyStyles("body.medium")};
`;

export const Section = memo(function Section(props: SectionProps) {
  const {
    title,
    children,
    content,
    className,
    orientation = "horizontal",
  } = props;

  return (
    <SectionRoot className={className}>
      <SectionContainer data-orientation={orientation}>
        <div>
          <SectionTitle>{title}</SectionTitle>
          <SectionContent>{content}</SectionContent>
        </div>
        <SectionChildren>{children}</SectionChildren>
      </SectionContainer>
    </SectionRoot>
  );
});

Section.displayName = "Section";
