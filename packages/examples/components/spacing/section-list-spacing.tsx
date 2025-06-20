import { color, spacing, spacingList } from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { memo } from "react";
import { Section, SpacingLabel } from "..";

const BlockWrapper = styled.div`
  padding: ${spacing(4)};
`;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${color("background.secondary")};
  aspect-ratio: 1 / 1;
`;

const BlockInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacing(2)};
  width: 100%;
  height: 100%;
  border: 1px dotted ${color("border.selected")};
  color: ${color("text.secondary")};
  text-align: center;
`;

export const SectionListSpacing = memo(function SectionListSpacing() {
  return (
    <>
      <Section
        title="Spacing List"
        content={
          <>
            <p>
              The spacing() function can generate multiple spacing values at
              once, which is particularly useful for padding and margin
              shorthand properties.
            </p>
          </>
        }
      >
        <BlockWrapper>
          <Block
            className={css`
              padding: ${spacingList([4, 8])};
            `}
          >
            <BlockInner>
              $spacingList(<SpacingLabel>4</SpacingLabel>,{" "}
              <SpacingLabel>8</SpacingLabel>)
            </BlockInner>
          </Block>
        </BlockWrapper>
        <BlockWrapper>
          <Block
            className={css`
              padding: ${spacingList([4, 8, 16])};
            `}
          >
            <BlockInner>
              $spacingList(<SpacingLabel>4</SpacingLabel>,{" "}
              <SpacingLabel>8</SpacingLabel>,<SpacingLabel>16</SpacingLabel>)
            </BlockInner>
          </Block>
        </BlockWrapper>
      </Section>
    </>
  );
});

SectionListSpacing.displayName = "SectionListSpacing";
