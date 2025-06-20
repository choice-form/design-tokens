import { color, spacing } from "@choiceform/design-tokens";
import { styled } from "@linaria/react";

export const Container = styled.div`
  max-width: ${spacing("lg")};
  margin: 0 auto;
`;

// Spacing

export const SpacingGrid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto auto 1fr;
  grid-column: 1 / -1;
  max-width: 100%;
  min-width: 0;
  overflow-x: auto;
`;

export const SpacingBar = styled.div`
  width: var(--width);
  height: ${spacing(4)};
  background-color: ${color("background.accent")};
`;

export const SpacingValue = styled.span`
  padding: ${spacing(2)};
  color: ${color("text.default")};
`;

export const SpacingLabel = styled.span`
  color: ${color("text.assistive")};
`;

export const SpacingDivider = styled.div`
  grid-column: 1 / -1;
  height: ${spacing("px")};
  background-color: ${color("border.default")};
`;
