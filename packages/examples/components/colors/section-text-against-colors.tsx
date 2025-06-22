import {
  color,
  ColorPath,
  spacing,
  typographyStyles,
} from "@choiceform/design-tokens";
import { css } from "@linaria/core";
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
import { textAgainstGroups } from "./contents";

export const SectionTextAgainstColors = memo(
  function SectionTextAgainstColors() {
    const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION);

    return (
      <Section
        title="High-Contrast Text Colors"
        content={
          <>
            <p>
              <b>fg.on-accent</b>
            </p>
            <p>
              Optimized text color for high-contrast readability when placed on
              colored backgrounds like buttons, badges, and call-to-action
              elements.
            </p>

            <p>
              These colors ensure accessibility compliance by providing
              appropriate contrast ratios against various background colors,
              automatically adjusting for optimal legibility.
            </p>
          </>
        }
      >
        <PanelHeader>
          <ColorTypesSelect colorType={colorType} setColorType={setColorType} />
        </PanelHeader>

        {["light", "dark"].map((theme) => (
          <Panel theme={theme as "light" | "dark"} key={theme}>
            {textAgainstGroups.map((colorData) => {
              const colorKey = color(colorData.colorKey as ColorPath);
              const alpha = colorData.alpha;

              return (
                <div
                  key={colorData.name}
                  style={
                    {
                      "--color": colorKey,
                    } as React.CSSProperties
                  }
                >
                  <ColorField
                    colorValue={colorKey}
                    colorString={
                      <ColorValue
                        selectedColor={colorData.name}
                        colorType={colorType}
                        shade={{
                          key: colorData.colorKey,
                          opacity: alpha,
                        }}
                        theme={"light"}
                      />
                    }
                  />
                  <h3
                    className={css`
                      margin-top: ${spacing(4)};
                      padding: ${spacing(4)} ${spacing(2)};
                      background-color: ${color("background.accent")};
                      color: var(--color);
                      ${typographyStyles("heading.medium")};
                    `}
                  >
                    The quick brown fox
                  </h3>
                </div>
              );
            })}
          </Panel>
        ))}
      </Section>
    );
  }
);

SectionTextAgainstColors.displayName = "SectionTextAgainstColors";
