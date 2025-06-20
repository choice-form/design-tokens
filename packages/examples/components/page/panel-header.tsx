import { color, spacing, mediaQuery } from "@choiceform/design-tokens";
import { styled } from "@linaria/react";
import { memo } from "react";

interface PanelHeaderProps {
  children: React.ReactNode;
}

const Header = styled.div`
  display: flex;
  gap: ${spacing(2)};
  padding: ${spacing(4)};
  box-shadow: 0 1px 0 0 ${color("black", 0.1)};
  ${mediaQuery("lg")} {
    grid-column: 1 / 3;
  }
`;

export const PanelHeader = memo(function PanelHeader(props: PanelHeaderProps) {
  const { children } = props;

  return <Header>{children}</Header>;
});

PanelHeader.displayName = "PanelHeader";
