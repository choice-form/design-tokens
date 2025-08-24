import { color, radius, spacing } from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { memo } from "react";
import { ColorField, Panel, Section, TokenFunctionDisplay } from "..";

const buttonContainerClass = css`
  display: grid;
  padding: ${spacing(4)};
  border: 1px dashed ${color("border.default")};
  place-content: center;
  aspect-ratio: 1 / 1;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${spacing(6)};
  padding: 0 ${spacing(2)};
  border-radius: ${radius("md")};
  background-color: ${color("background.accent")};
  color: ${color("text.on-accent")};
  border: none;

  &[data-theme="accent"] {
    background-color: ${color("background.accent")};
    color: ${color("text.on-accent")};
  }

  &[data-theme="component"] {
    background-color: ${color("background.component")};
    color: ${color("text.on-accent")};
  }
`;

export const SectionOverviewThemeColors = memo(
  function SectionOverviewThemeColors() {
    return (
      <Section
        title="Adaptive Theming"
        content={
          <>
            <p>
              Our color system supports adaptive theming, enabling seamless
              transitions between different visual modes while maintaining
              design consistency and accessibility standards.
            </p>
            <p>
              The design system automatically adapts all interface elements when
              switching between themes, ensuring optimal contrast and
              readability across all contexts. Available themes include:
            </p>
            <ul
              className={css`
                color: ${color("text.assistive")};
              `}
            >
              <li>Light mode - optimized for bright environments</li>
              <li>Dark mode - optimized for low-light conditions</li>
            </ul>
          </>
        }
      >
        {["light", "dark"].map((theme) => (
          <Panel theme={theme as "light" | "dark"} key={theme}>
            <div
              className={css`
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: ${spacing(4)};
              `}
            >
              {["accent", "component"].map((theme) => (
                <div key={theme} className={buttonContainerClass}>
                  <Button className={theme} data-theme={theme}>
                    Button
                  </Button>
                </div>
              ))}
              <ColorField
                key={theme}
                className={css`
                  grid-column: 1 / 3;
                `}
                colorString={
                  <TokenFunctionDisplay
                    functionName="color"
                    value="background.accent"
                  />
                }
                colorValue={color("background.accent")}
              />
            </div>
          </Panel>
        ))}
      </Section>
    );
  }
);

SectionOverviewThemeColors.displayName = "SectionOverviewThemeColors";
