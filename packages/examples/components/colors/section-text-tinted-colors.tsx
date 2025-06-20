import {
  color,
  spacing,
  typographyStyles,
} from "@choiceform/design-tokens/helpers";
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
import { textTintedGroups } from "./contents";

export const SectionTextTintedColors = memo(function SectionTextTintedColors() {
  const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION);

  return (
    <Section
      title="Semantic Text Colors"
      content={
        <>
          <p>
            Semantic text colors communicate specific states and meanings
            through color choices, providing visual cues that users can quickly
            understand and act upon.
          </p>

          <p>
            <b>fg.accent</b>
          </p>
          <p>
            Brand accent color for links, call-to-action text, and prominent
            interactive elements that should draw attention.
          </p>

          <p>
            <b>fg.success</b>
          </p>
          <p>
            Positive confirmation color for success messages, completion
            indicators, and approved states.
          </p>

          <p>
            <b>fg.warning</b>
          </p>
          <p>
            Caution color for warnings, alerts, and content requiring user
            attention without indicating danger.
          </p>

          <p>
            <b>fg.danger</b>
          </p>
          <p>
            Critical color for error messages, destructive actions, and urgent
            notifications requiring immediate attention.
          </p>

          <p>
            <b>fg.assistive</b>
          </p>
          <p>
            Helper color for tips, guidance text, and supportive interface
            messaging that aids user understanding.
          </p>

          <p>
            <b>fg.component</b>
          </p>
          <p>
            Specialized text color for unique component contexts that need
            distinction from standard semantic colors.
          </p>
        </>
      }
    >
      <PanelHeader>
        <ColorTypesSelect colorType={colorType} setColorType={setColorType} />
      </PanelHeader>

      {["light", "dark"].map((theme) => (
        <Panel theme={theme as "light" | "dark"} key={theme}>
          {textTintedGroups.map((colorData) => {
            const colorKey = color(
              colorData.colorKey,
              1,
              theme as "light" | "dark"
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
                <h3
                  className={css`
                    margin-top: ${spacing(4)};
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
});

SectionTextTintedColors.displayName = "SectionTextTintedColors";
