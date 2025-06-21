import {
  color,
  spacing,
  typographyStyles,
  up,
} from "@choiceform/design-tokens";
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
`;
const SectionContainer = styled.div`
  display: grid;
  gap: ${spacing(8)};

  &[data-orientation="horizontal"] {
    ${up("lg")} {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const SectionLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(4)};
`;

const SectionTitle = styled.h2`
  ${typographyStyles("heading.small")};
`;

const SectionChildren = styled.div`
  display: grid;
  border: 1px solid ${color("border.default")};

  &:where([data-orientation="horizontal"] *) {
    ${up("lg")} {
      grid-column: 2 / 4;
    }
    ${up("md")} {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
  ${typographyStyles("body.medium")};
  ul {
    list-style: disc;
    padding-left: ${spacing(4)};
    display: flex;
    flex-direction: column;
    gap: ${spacing(2)};
  }
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
        <SectionLeftColumn>
          <SectionTitle>{title}</SectionTitle>
          <SectionContent>{content}</SectionContent>
        </SectionLeftColumn>
        <SectionChildren>{children}</SectionChildren>
      </SectionContainer>
    </SectionRoot>
  );
});

Section.displayName = "Section";
