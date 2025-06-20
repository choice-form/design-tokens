import {
  color,
  radius,
  ShadowKey,
  spacing,
  tokens,
} from "@choiceform/design-tokens";
import { shadow, shadowList } from "@choiceform/design-tokens";
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
  background-color: ${color("background.secondary")};
`;

export const SectionHardShadow = memo(function SectionHardShadow() {
  const getAllShadowKeys = () => {
    return Object.keys(tokens).filter((key) => key.startsWith("shadows."));
  };

  return (
    <>
      {getAllShadowKeys()
        .slice(6, 10)
        .map((shadowName) => {
          return (
            <Section
              key={shadowName}
              title={`${shadowName.charAt(0).toUpperCase() + shadowName.slice(1)} Hard Shadow`}
              content={
                <>
                  <p>
                    Strong shadow effects for prominent elements that need
                    significant visual separation.
                  </p>
                </>
              }
            >
              {["light", "dark"].map((theme) => {
                const shadowValue = shadow(
                  shadowName as ShadowKey,
                  theme as "light" | "dark"
                );

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
                                "--shadow": `var(--cdt-${shadowName.replace(".", "-")})`,
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
                            value={shadowName.replace("shadows.", "")}
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

SectionHardShadow.displayName = "SectionHardShadow";
