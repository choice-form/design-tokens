import { color, spacing, up } from "@choiceform/design-tokens";
import { styled } from "@linaria/react";
import { memo } from "react";

interface PanelHeaderProps {
  children: React.ReactNode;
}

const Header = styled.div`
  display: flex;
  gap: ${spacing(2)};
  padding: ${spacing(4)};
  border-bottom: 1px solid ${color("border.default")};
  ${up("lg")} {
    grid-column: 1 / 3;
  }
`;

export const PanelHeader = memo(function PanelHeader(props: PanelHeaderProps) {
  const { children } = props;

  return <Header>{children}</Header>;
});

PanelHeader.displayName = "PanelHeader";
