import { color } from "@choiceform/design-tokens/helpers";
import { css } from "@linaria/core";
import { memo, useMemo } from "react";
import { getRealColorValue } from "../../utils";
import { TokenFunctionDisplay } from "./token-function-display";
import { ColorTypes } from "./color-types-select";

interface ColorValueProps {
  colorType: ColorTypes;
  opacity?: number;
  selectedColor: string;
  shade: { key: string; opacity?: number };
  theme: "light" | "dark";
}

export const ColorValue = memo(function ColorValue({
  opacity = 1,
  selectedColor,
  colorType,
  shade,
  theme,
}: ColorValueProps) {
  const realColorValue = useMemo(() => {
    if ("opacity" in shade && shade.opacity !== undefined) {
      return getRealColorValue(shade.key, shade.opacity, "semantic", theme);
    }
    return getRealColorValue(shade.key, opacity, "semantic", theme);
  }, [shade, theme, opacity]);

  if (colorType === ColorTypes.VARIABLE) {
    return (
      <span>
        rgba(
        <span
          className={css`
            color: ${color("fg.assistive")};
          `}
        >
          var(--cdt-{selectedColor})
        </span>
        , {opacity})
      </span>
    );
  }

  if (colorType === ColorTypes.VALUE) {
    // 解析 rgba 格式：rgba(r, g, b, a)
    const rgbaMatch = realColorValue.rgbaValue?.match(
      /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/
    );
    if (rgbaMatch) {
      const [, r, g, b, a] = rgbaMatch;
      return (
        <span>
          rgba(
          <span
            className={css`
              color: ${color("fg.assistive")};
            `}
          >
            {r}, {g}, {b}, {a}
          </span>
          )
        </span>
      );
    }
    return <span>{realColorValue.hexValue || realColorValue.cssValue}</span>;
  }

  return <TokenFunctionDisplay functionName="color" value={selectedColor} />;
});

ColorValue.displayName = "ColorValue";
