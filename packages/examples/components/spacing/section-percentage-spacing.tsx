import {
  color,
  fontWeight,
  spacing,
  spacingList,
} from "@choiceform/design-tokens";
import { styled } from "@linaria/react";
import { CSSProperties, Fragment, memo } from "react";
import { Section } from "..";
import { SpacingLabel } from "../page/share";

const PercentageSpacingGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-column: 1 / -1;
  padding: ${spacingList([4, 2, 1, 2])};
`;

const SpacingValueBar = styled.span`
  display: flex;
  flex: 1;
  align-items: center;
  gap: ${spacing(2)};
`;

const SpacingBarWrapper = styled.div`
  position: relative;
  gap: ${spacing(2)};
  width: var(--width);
  padding: ${spacingList([4, 2, 0, 2])};

  &:nth-child(odd) {
    ${SpacingValueBar} {
      justify-content: flex-start;
    }
  }

  &:nth-child(even) {
    ${SpacingValueBar} {
      justify-content: flex-end;
    }
  }
`;

const SpacingBar = styled.div`
  position: absolute;
  top: 0;
  right: ${spacing(2)};
  left: ${spacing(2)};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${spacing(4)};
  background-color: ${color("background.accent")};
  color: ${color("text.on-accent")};
  font-weight: ${fontWeight("medium")};
`;

const SpacingValue = styled.span`
  padding: ${spacing(2)} 0;
  color: ${color("text.default")};
`;

export const SectionPercentageSpacing = memo(
  function SectionPercentageSpacing() {
    const percentageData = [
      { key: "50%", value: "1/2" },
      { key: "50%", value: "1/2" },

      { key: "40%", value: "2/5" },
      { key: "60%", value: "3/5" },

      { key: "33.33%", value: "1/3" },
      { key: "66.67%", value: "2/3" },

      { key: "25%", value: "1/4" },
      { key: "75%", value: "3/4" },

      { key: "20%", value: "1/5" },
      { key: "80%", value: "4/5" },

      { key: "16.67%", value: "1/6" },
      { key: "83.33%", value: "5/6" },
    ];

    return (
      <>
        <Section
          title="Percentage Spacing"
          content={
            <>
              <p>
                The spacing() function also supports percentage values. This is
                useful when you need to set spacing relative to the parent
                element&apos;s width or height.
              </p>
            </>
          }
        >
          <PercentageSpacingGrid>
            {percentageData.map(({ key, value }, index) => (
              <Fragment key={`${key}-${value}-${index}`}>
                <SpacingBarWrapper
                  style={
                    {
                      "--width": key,
                    } as CSSProperties
                  }
                >
                  <SpacingBar>{key}</SpacingBar>

                  <SpacingValueBar>
                    <SpacingValue>
                      $spacing(
                      <SpacingLabel>{value}</SpacingLabel>)
                    </SpacingValue>
                  </SpacingValueBar>
                </SpacingBarWrapper>
              </Fragment>
            ))}
          </PercentageSpacingGrid>
        </Section>
      </>
    );
  }
);

SectionPercentageSpacing.displayName = "SectionPercentageSpacing";
