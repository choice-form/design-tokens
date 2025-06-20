import { color, radius, spacing } from "@choiceform/design-tokens";
import { styled } from "@linaria/react";
import { memo } from "react";

export enum ColorTypes {
  FUNCTION = "function",
  VALUE = "value",
  VARIABLE = "variable",
}

interface ColorTypesSelectProps {
  colorType: ColorTypes;
  setColorType: (colorType: ColorTypes) => void;
}

const Select = styled.select`
  height: ${spacing(6)};
  margin-left: auto;
  padding: 0 ${spacing(1)};
  border: 1px solid ${color("border.default")};
  border-radius: ${radius("md")};
  background-color: ${color("background.default")};
  color: ${color("text.default")};
`;

export const ColorTypesSelect = memo(function ColorTypesSelect(
  props: ColorTypesSelectProps
) {
  const { colorType, setColorType } = props;
  return (
    <Select
      name="color-type"
      value={colorType}
      onChange={(e) => setColorType(e.target.value as ColorTypes)}
    >
      {Object.values(ColorTypes).map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </Select>
  );
});
