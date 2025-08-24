import { color, spacing, typographyStyles } from "@choiceform/design-tokens";
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
  color: ${color("text.default")};
  min-width: 0;
  background-color: ${color("background.default")};
`;

const themePanelEmptyClass = css`
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${color("background.secondary")};
  color: ${color("text.secondary")};
  ${typographyStyles("heading.medium")};
`;

const themeTitleClass = css`
  color: ${color("text.secondary")};
  text-transform: uppercase;
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
