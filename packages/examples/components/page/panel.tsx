import {
  color,
  spacing,
  typographyStyles,
} from "@choiceform/design-tokens/helpers";
import { css, cx } from "@linaria/core";
import { memo } from "react";

interface PanelProps {
  children: React.ReactNode;
  empty?: boolean;
  placeholder?: string;
  theme: "light" | "dark";
}

const themePanelClass = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing(4)};
  padding: ${spacing(4)};
  color: ${color("fg.default")};
  min-width: 0;

  &[data-theme="dark"] {
    background-color: ${color("bg.default")};
  }
`;

const themePanelEmptyClass = css`
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${color("bg.secondary")};
  color: ${color("fg.secondary")};
  ${typographyStyles("heading.medium")};
`;

const themeTitleClass = css`
  color: ${color("fg.secondary")};
  text-transform: uppercase;
  ${typographyStyles("body.medium")};
`;

export const Panel = memo(function Panel(props: PanelProps) {
  const { theme, empty, children, placeholder } = props;

  return (
    <div
      className={cx(themePanelClass, empty && themePanelEmptyClass, theme)}
      data-theme={theme}
    >
      {empty ? (
        <span>{placeholder}</span>
      ) : (
        <div className={themeTitleClass}>{theme.toUpperCase()} MODE</div>
      )}
      {children}
    </div>
  );
});

Panel.displayName = "Panel";
