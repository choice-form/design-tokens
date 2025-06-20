import { color, radius, spacing } from "@choiceform/design-tokens/helpers";
import { ToolbarFrame } from "@choiceform/icons-react";
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
import {
  defaultBorderGroups,
  menuBorderStrongGroups,
  selectionBorderGroups,
} from "./contents";

export const SectionBorderColors = memo(function SectionBorderColors() {
  const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION);

  return (
    <>
      <Section
        title="Standard Border Colors"
        content={
          <>
            <p>
              Border colors provide visual separation and structure throughout
              the interface.
            </p>

            <p>
              <b>bd.default</b>
            </p>
            <p>
              Primary border color for separating content areas, form inputs,
              and component boundaries.
            </p>
          </>
        }
      >
        <PanelHeader>
          <ColorTypesSelect colorType={colorType} setColorType={setColorType} />
        </PanelHeader>

        {["light", "dark"].map((theme) => (
          <Panel theme={theme as "light" | "dark"} key={theme}>
            {defaultBorderGroups.map((colorData) => {
              const colorKey = color(
                colorData.colorKey as any,
                1,
                theme === "light" ? "." : "dark"
              );
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
                          opacity: 1,
                        }}
                        theme={theme as "light" | "dark"}
                      />
                    }
                  />
                  <div
                    className={css`
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      margin-top: ${spacing(4)};
                      padding: ${spacing(4)};
                    `}
                  >
                    <div
                      className={css`
                        border-top: 1px solid var(--color);
                        width: 100%;
                      `}
                    />
                  </div>
                </div>
              );
            })}
          </Panel>
        ))}
      </Section>

      <Section
        title="Focus & Selection Borders"
        content={
          <div
            className={css`
              display: flex;
              flex-direction: column;
              gap: ${spacing(2)};
            `}
          >
            <p>
              <b>bd.selected</b>
            </p>
            <p>
              Primary selection color for focused inputs, active controls, and
              interactive states.
            </p>

            <p>
              <b>bd.selected-strong</b>
            </p>
            <p>
              Enhanced selection color for high-contrast situations where
              standard selection borders need stronger visual emphasis.
            </p>
          </div>
        }
      >
        <PanelHeader>
          <ColorTypesSelect colorType={colorType} setColorType={setColorType} />
        </PanelHeader>

        {["light", "dark"].map((theme) => (
          <Panel theme={theme as "light" | "dark"} key={theme}>
            {selectionBorderGroups.map((colorData) => {
              const colorKey = color(
                colorData.colorKey as any,
                1,
                theme === "light" ? "." : "dark"
              );
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
                          opacity: 1,
                        }}
                        theme={theme as "light" | "dark"}
                      />
                    }
                  />
                  <div
                    className={css`
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      margin-top: ${spacing(4)};
                      padding: 0 ${spacing(4)};
                    `}
                  >
                    <div
                      data-strong={colorData.name === "bd.selected-strong"}
                      className={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: ${spacing(6)};
                        height: ${spacing(6)};
                        border: 1px solid var(--color);
                        border-radius: ${radius("md")};

                        &[data-strong="true"] {
                          background-color: ${color(
                            "background.accent" as any
                          )};
                          color: ${color("foreground.on-accent" as any)};
                        }
                      `}
                    >
                      <ToolbarFrame />
                    </div>
                  </div>
                </div>
              );
            })}
          </Panel>
        ))}
      </Section>

      <Section
        title="Specialized Interface Borders"
        content={
          <div
            className={css`
              display: flex;
              flex-direction: column;
              gap: ${spacing(2)};
            `}
          >
            <p>
              Specialized border colors for specific interface contexts like
              toolbars and menus that require unique visual treatment.
            </p>

            <p>
              <b>bd.menu</b>
            </p>
            <p>Border color optimized for menu and dropdown contexts.</p>

            <p>
              <b>bd.toolbar</b>
            </p>
            <p>
              Border color designed for toolbar interfaces and control panels.
            </p>
          </div>
        }
      >
        <PanelHeader>
          <ColorTypesSelect colorType={colorType} setColorType={setColorType} />
        </PanelHeader>

        {["light", "dark"].map((theme) => (
          <Panel theme={theme as "light" | "dark"} key={theme}>
            {menuBorderStrongGroups.map((colorData) => {
              const colorKey = color(
                colorData.colorKey as any,
                1,
                theme === "light" ? "." : "dark"
              );
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
                          opacity: 1,
                        }}
                        theme={theme as "light" | "dark"}
                      />
                    }
                  />
                  <div
                    data-type={colorData.name.replace("bd.", "")}
                    className={css`
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      margin-top: ${spacing(4)};
                      padding: ${spacing(4)};

                      &[data-type="menu"] {
                        background-color: ${color("bg.menu" as any)};
                      }

                      &[data-type="toolbar"] {
                        background-color: ${color("gray.800")};
                      }
                    `}
                  >
                    <div
                      className={css`
                        border-top: 1px solid var(--color);
                        width: 100%;
                      `}
                    />
                  </div>
                </div>
              );
            })}
          </Panel>
        ))}
      </Section>
    </>
  );
});

SectionBorderColors.displayName = "SectionBorderColors";
