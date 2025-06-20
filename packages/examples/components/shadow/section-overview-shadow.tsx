import {
  listShadows,
  radius,
  shadow,
  spacing,
} from "@choiceform/design-tokens/helpers";
import { styled } from "@linaria/react";
import { CSSProperties, memo } from "react";
import { Panel, Section, TokenFunctionDisplay } from "..";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${spacing(8)};
  place-content: center;
  padding: ${spacing(8)};
`;

const ShadowBox = styled.div`
  padding: ${spacing(4)};
  border-radius: ${radius("lg")};
  box-shadow: var(--shadow);
  aspect-ratio: 1/1;
`;

export const SectionOverviewShadow = memo(function SectionOverviewShadow() {
  return (
    <>
      <Section
        orientation="vertical"
        title="Understanding Shadow Elevations"
        content={
          <>
            <p>
              Our shadow system provides a set of carefully crafted elevation
              levels that create consistent depth and hierarchy across
              components. Instead of defining custom shadows for each use case,
              we offer five predefined elevation levels that map to different
              visual depths. These numeric levels make it simple to adjust
              elevation for different component states - for example, increasing
              elevation on hover or during drag interactions.
            </p>

            <p>
              A key advantage of our shadow system is that each elevation level
              includes a subtle built-in border effect. This eliminates the need
              to add separate border styles to elements like modals or cards,
              resulting in cleaner code and more consistent visuals across light
              and dark themes.
            </p>
          </>
        }
      >
        {["light", "dark"].map((theme) => {
          const shadowNames = listShadows();

          return (
            <Panel theme={theme as "light" | "dark"} key={theme}>
              <Container>
                {shadowNames.map((name) => {
                  const shadowValue = shadow(name, theme as "light" | "dark");

                  return (
                    <ShadowBox
                      key={name}
                      style={
                        {
                          "--shadow": shadowValue,
                        } as CSSProperties
                      }
                    >
                      <TokenFunctionDisplay
                        functionName="shadow"
                        value={name}
                      />
                    </ShadowBox>
                  );
                })}
              </Container>
            </Panel>
          );
        })}
      </Section>
    </>
  );
});

SectionOverviewShadow.displayName = "SectionCustomizingSpacing";
