import {
  color,
  ColorPath,
  spacing,
  typographyStyles,
} from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import { memo, useState } from "react";
import tinycolor from "tinycolor2";
import {
  ColorField,
  ColorTypes,
  ColorTypesSelect,
  ColorValue,
  Panel,
  PanelHeader,
  Section,
} from "..";
import { getRealColorValue } from "../../utils";
import { backgroundInteractionGroups } from "./contents";

export const SectionBackgroundInteractionColors = memo(
  function SectionBackgroundInteractionColors() {
    const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION);

    return (
      <Section
        title="Interactive Background States"
        content={
          <>
            <p>
              <b>bg.selected</b>
            </p>
            <p>
              Highlighted background for active selections and current states.
            </p>
            <p>
              <b>bg.disabled</b>
            </p>
            <p>
              Neutral background for non-interactive elements that cannot be
              engaged with by users. Commonly paired with disabled text and icon
              colors for consistent inactive states.
            </p>
          </>
        }
      >
        <PanelHeader>
          <ColorTypesSelect colorType={colorType} setColorType={setColorType} />
        </PanelHeader>

        {["light", "dark"].map((theme) => (
          <Panel theme={theme as "light" | "dark"} key={theme}>
            {backgroundInteractionGroups.map((colorData) => {
              const colorInfo = getRealColorValue(colorData.colorKey);

              return (
                <div
                  key={colorData.name}
                  style={
                    {
                      "--color": color(colorData.colorKey as ColorPath),
                      "--color-secondary": color(
                        colorData.colorKey as ColorPath
                      ),
                      "--color-hover": color(colorData.colorKey as ColorPath),
                      "--color-text": tinycolor(colorInfo.hexValue).isDark()
                        ? "white"
                        : "black",
                    } as React.CSSProperties
                  }
                >
                  <ColorField
                    key={colorData.name}
                    colorValue={`var(--color)`}
                    colorString={
                      <ColorValue
                        selectedColor={colorData.name}
                        colorType={colorType}
                        shade={{
                          key: colorData.colorKey,
                        }}
                        theme={theme as "light" | "dark"}
                      />
                    }
                  />
                  <div
                    className={css`
                      display: grid;
                      grid-template-columns: auto 1fr;
                      grid-template-rows: repeat(2, ${spacing(8)});
                      margin-top: ${spacing(4)};
                      color: var(--color-text);
                    `}
                  >
                    <div
                      className={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        grid-row: 1 / 3;
                        width: ${spacing(16)};
                        height: ${spacing(16)};
                        border: 1px solid ${color("border.default")};
                        background-color: var(--color);
                        ${typographyStyles("heading.medium")};
                      `}
                    >
                      Aa
                    </div>
                  </div>
                </div>
              );
            })}
          </Panel>
        ))}
      </Section>
    );
  }
);

SectionBackgroundInteractionColors.displayName =
  "SectionBackgroundInteractionColors";
