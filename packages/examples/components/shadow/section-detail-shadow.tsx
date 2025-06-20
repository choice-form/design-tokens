import {
  listShadows,
  radius,
  shadow,
  spacing,
} from "@choiceform/design-tokens/helpers";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { CSSProperties, Fragment, memo } from "react";
import { Panel, Section, ShadowField, TokenFunctionDisplay } from "..";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${spacing(4)};
`;

const ShadowBox = styled.div`
  min-width: ${spacing(24)};
  min-height: ${spacing(24)};
  padding: ${spacing(4)};
  border-radius: ${radius("lg")};
  box-shadow: var(--shadow);
  aspect-ratio: 1/1;
`;

export const SectionDetailShadow = memo(function SectionDetailShadow() {
  const shadowNames = listShadows();

  return (
    <>
      {shadowNames.map((shadowName) => {
        return (
          <Section
            key={shadowName}
            title={`${shadowName.charAt(0).toUpperCase() + shadowName.slice(1)} Shadow`}
            content={
              <>
                <p>
                  Shadow effect for visual depth and layering in your interface.
                </p>
              </>
            }
          >
            {["light", "dark"].map((theme) => {
              const shadowValue = shadow(shadowName, theme as "light" | "dark");

              return (
                <Panel theme={theme as "light" | "dark"} key={theme}>
                  <Container>
                    <Fragment key={shadowName}>
                      <div
                        className={css`
                          display: flex;
                          flex-direction: column;
                          justify-content: center;
                          align-items: center;
                          width: 100%;
                        `}
                      >
                        <ShadowBox
                          style={
                            {
                              "--shadow": shadowValue,
                            } as CSSProperties
                          }
                        />
                      </div>
                      <div
                        className={css`
                          display: flex;
                          flex: 1;
                          flex-direction: column;
                          justify-content: end;
                          gap: ${spacing(2)};
                        `}
                      >
                        <TokenFunctionDisplay
                          functionName="shadow"
                          value={shadowName}
                        />
                        <ShadowField shadowString={shadowValue} />
                      </div>
                    </Fragment>
                  </Container>
                </Panel>
              );
            })}
          </Section>
        );
      })}
    </>
  );
});

SectionDetailShadow.displayName = "SectionDetailShadow";
