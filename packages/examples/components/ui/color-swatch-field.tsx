import { color, spacing } from "@choiceform/design-tokens";
import { css, cx } from "@linaria/core";
import { memo } from "react";
import { overviewPaleGroup, overviewRampsGroups } from "../colors/contents";
import { ColorSwatch } from "./color-swatch";

interface ColorSwatchFieldProps {
  colorData:
    | (typeof overviewRampsGroups)[number]
    | (typeof overviewPaleGroup)[number];
  theme: "light" | "dark";
}

const colorRowClass = css`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  height: ${spacing(8)};
  padding: 0 ${spacing(1)} 0 ${spacing(2)};
  border: 1px solid ${color("border.default")};
`;

const colorRowBlackClass = css`
  border-color: ${color("gray.800")};
  background-color: ${color("gray.800")};
`;

const colorSwatchesClass = css`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  overflow: hidden;
`;

export const ColorSwatchField = memo(function ColorSwatchField(
  props: ColorSwatchFieldProps
) {
  const { colorData, theme } = props;

  return (
    <div
      className={cx(
        colorRowClass,
        colorData.name === "white" && theme === "light" && colorRowBlackClass
      )}
    >
      <div
        className={css`
          color: ${color("text.assistive")};
          text-transform: capitalize;
        `}
      >
        {colorData.name}
      </div>
      <div className={colorSwatchesClass}>
        {colorData.shades.map((shade, index) => {
          const key =
            "opacity" in shade ? `${shade.key}-${shade.opacity}` : shade.key;
          return <ColorSwatch key={key} shade={shade} />;
        })}
      </div>
    </div>
  );
});

ColorSwatchField.displayName = "ColorSwatchField";
