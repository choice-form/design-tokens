import { color, ColorPath, spacing } from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import { memo, useMemo } from "react";

interface ColorSwatchProps {
  shade: { key: ColorPath; opacity?: number };
}

const colorSwatchClass = css`
  width: ${spacing(5)};
  height: ${spacing(5)};
  background-color: var(--dynamic-color);
`;

export const ColorSwatch = memo(function ColorSwatch(props: ColorSwatchProps) {
  const { shade } = props;

  const colorValue = useMemo(() => {
    if ("opacity" in shade && shade.opacity !== undefined) {
      return color(shade.key, shade.opacity);
    }
    return color(shade.key);
  }, [shade]);

  return (
    <div
      className={colorSwatchClass}
      style={{ "--dynamic-color": colorValue } as React.CSSProperties}
    />
  );
});

ColorSwatch.displayName = "ColorSwatch";
