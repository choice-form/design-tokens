import { color, spacing, typographyStyles } from "@choiceform/design-tokens";
import FillColor from "@choiceform/icons-react/FillColor";
import { css, LinariaClassName } from "@linaria/core";
import { styled } from "@linaria/react";
import { memo } from "react";

interface ColorFieldProps {
  className?: string;
  colorClass?: LinariaClassName;
  colorString: React.ReactNode;
  colorValue?: string;
}

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing(2)};
  height: ${spacing(8)};
  padding: 0 ${spacing(2)};
  border: 1px solid ${color("border.default")};
  ${typographyStyles("body.medium")};
`;

const Swatch = styled.div<{ color: string }>`
  width: ${spacing(5)};
  height: ${spacing(5)};
  background-color: ${({ color }) => color};
`;

const SwatchAtomic = styled.div`
  width: ${spacing(5)};
  height: ${spacing(5)};
`;

export const ColorField = memo(function ColorField(props: ColorFieldProps) {
  const { colorValue, colorString, colorClass } = props;

  return (
    <Field className={props.className}>
      <FillColor
        className={css`
          color: ${color("icon.secondary")};
        `}
      />
      <span
        className={css`
          flex: 1;
        `}
      >
        {colorString}
      </span>

      {colorValue ? (
        <Swatch color={colorValue} className={colorClass} />
      ) : (
        <SwatchAtomic className={colorClass} />
      )}
    </Field>
  );
});

ColorField.displayName = "ColorField";
