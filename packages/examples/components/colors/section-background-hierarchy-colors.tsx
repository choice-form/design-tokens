import {
  color,
  spacing,
  typographyStyles,
} from "@choiceform/design-tokens/helpers";
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
import { backgroundHierarchyGroups } from "./contents";

export const SectionBackgroundHierarchyColors = memo(
  function SectionBackgroundHierarchyColors() {
    const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION);

    return (
      <Section
        title="Background Hierarchy"
        content={
          <>
            <p>
              <b>bg.default</b>
            </p>
            <p>Primary background color for the main application surface</p>

            <p>
              <b>bg.secondary</b>
            </p>
            <p>Elevated background for cards, panels, and content containers</p>

            <p>
              <b>bg.tertiary</b>
            </p>
            <p>
              Subtle background for nested components and elements within
              secondary containers
            </p>
          </>
        }
      >
        <PanelHeader>
          <ColorTypesSelect colorType={colorType} setColorType={setColorType} />
        </PanelHeader>

        {["light", "dark"].map((theme) => (
          <Panel theme={theme as "light" | "dark"} key={theme}>
            {backgroundHierarchyGroups.map((colorData) => {
              const colorInfo = getRealColorValue(
                colorData.colorKey,
                1,
                "semantic",
                theme as "light" | "dark"
              );

              return (
                <div
                  key={colorData.name}
                  style={
                    {
                      "--color": color(colorData.colorKey),
                      "--color-secondary": color(colorData.colorKey),
                      "--color-hover": color(colorData.colorKey),
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
                          opacity: 1,
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
                        border: 1px solid ${color("bd.default")};
                        background-color: var(--color);
                        ${typographyStyles("body.large")};
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

SectionBackgroundHierarchyColors.displayName =
  "SectionBackgroundHierarchyColors";
