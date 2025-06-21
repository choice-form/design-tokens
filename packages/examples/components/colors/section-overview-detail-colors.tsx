import { color, radius, spacing } from "@choiceform/design-tokens";
import { styled } from "@linaria/react";
import { memo, useState } from "react";
import {
  ColorField,
  ColorTypes,
  ColorTypesSelect,
  ColorValue,
  Panel,
  PanelHeader,
  Section,
} from "..";
import { overviewRampsGroups } from "./contents";

const ColorRadioButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${spacing(2)};
  height: ${spacing(6)};
  padding: 0 ${spacing(2)};
  border: 1px solid currentcolor;
  border-radius: ${radius("md")};
  color: rgb(var(--color, 0, 0, 0), 1);
  text-transform: capitalize;
  cursor: default;
  user-select: none;

  &[data-selected="true"] {
    border-color: rgb(var(--color, 0, 0, 0), 1);
    background-color: rgb(var(--color, 0, 0, 0), 1);
    color: ${color("text.on-accent")};
  }

  &[data-selected="false"]:hover {
    background-color: rgb(var(--color), 0.2);
  }
`;

export const SectionOverviewDetailColor = memo(
  function SectionOverviewDetailColor() {
    const [selectedColor, setSelectedColor] = useState<string | null>("blue");

    const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION);

    return (
      <Section
        title="Adaptive Color Precision"
        content={
          <>
            <p>
              Our color scales include theme-specific optimizations that ensure
              colors maintain their intended visual impact across different
              background contexts and lighting conditions.
            </p>

            <p>
              Each color is carefully calibrated for its context, with subtle
              adjustments between light and dark themes to compensate for how
              human color perception changes against different backgrounds.
            </p>
            <p>
              When using semantic color tokens, these contextual adaptations
              happen automatically, ensuring consistent visual hierarchy and
              accessibility across all interface states.
            </p>
          </>
        }
      >
        <PanelHeader>
          {overviewRampsGroups.slice(2, -1).map((colorData) => (
            <ColorRadioButton
              key={colorData.name}
              onClick={() => setSelectedColor(colorData.name)}
              data-selected={selectedColor === colorData.name}
              style={
                {
                  "--color": `var(--cdt-color-${colorData.shades[4].key.replace(".", "-")})`,
                } as React.CSSProperties
              }
            >
              <span>{colorData.shades[3].key.replace(".400", "")}</span>
            </ColorRadioButton>
          ))}

          <ColorTypesSelect colorType={colorType} setColorType={setColorType} />
        </PanelHeader>

        {["light", "dark"].map((theme) => (
          <Panel theme={theme as "light" | "dark"} key={theme}>
            {overviewRampsGroups
              .filter((colorData) => colorData.name === selectedColor)
              .map((shadeGroup) =>
                shadeGroup.shades.map((shade) => (
                  <ColorField
                    key={shade.key}
                    colorValue={`rgba(var(--cdt-color-${shade.key.replace(".", "-")}), 1)`}
                    colorString={
                      <ColorValue
                        selectedColor={shade.key}
                        colorType={colorType}
                        shade={shade}
                        theme={theme as "light" | "dark"}
                      />
                    }
                  />
                ))
              )}
          </Panel>
        ))}
      </Section>
    );
  }
);

SectionOverviewDetailColor.displayName = "SectionOverviewDetailColor";
