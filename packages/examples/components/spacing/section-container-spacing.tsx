import { listBreakpoints } from "@choiceform/design-tokens";
import { CSSProperties, Fragment, memo } from "react";
import { Section } from "..";
import {
  SpacingBar,
  SpacingDivider,
  SpacingGrid,
  SpacingLabel,
  SpacingValue,
} from "../page/share";

export const SectionContainerSpacing = memo(function SectionContainerSpacing() {
  return (
    <Section
      orientation="vertical"
      title="Container Spacing"
      content={
        <>
          <p>
            The spacing() function also supports container values. This is
            useful when you need to set spacing relative to the container
            element&apos;s width or height.
          </p>
          <ul>
            <li>
              <code>container-sm</code> - 16px
            </li>
            <li>
              <code>container-md</code> - 32px
            </li>
            <li>
              <code>container-lg</code> - 48px
            </li>
          </ul>
        </>
      }
    >
      <SpacingGrid>
        {listBreakpoints().map((key, index) => (
          <Fragment key={key}>
            <SpacingValue>{key}</SpacingValue>
            <SpacingValue>Available</SpacingValue>
            <SpacingValue>Responsive</SpacingValue>
            <SpacingValue>
              $spacing(
              <SpacingLabel>{key}</SpacingLabel>)
            </SpacingValue>
            <SpacingBar
              style={
                {
                  "--width": `var(--cdt-breakpoints-${key.replace(".", "-")})`,
                } as CSSProperties
              }
            />
            {index !== listBreakpoints().length - 1 && <SpacingDivider />}
          </Fragment>
        ))}
      </SpacingGrid>
    </Section>
  );
});

SectionContainerSpacing.displayName = "SectionContainerSpacing";
