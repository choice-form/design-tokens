import {
  color,
  listBreakpoints,
  spacingList,
  typographyStyles,
} from "@choiceform/design-tokens";
import { styled } from "@linaria/react";
import { memo } from "react";
import { Section } from "..";

const BreakpointTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: ${spacingList([2, 4])};
    text-align: left;
    border-bottom: 1px solid ${color("border.default")};
  }

  th {
    ${typographyStyles("body.medium-strong")};
  }
`;

export const SectionDefinitionsBreakpoint = memo(
  function SectionDefinitionsBreakpoint() {
    const breakpointData = listBreakpoints();

    return (
      <Section
        orientation="vertical"
        title="Breakpoint Definitions"
        content={
          <>
            <p>
              Our breakpoints system provides complete media query tools and
              responsive layout support, maintaining consistency with Tailwind
              CSS&apos;s breakpoint system while offering more powerful
              functionality and better TypeScript support.
            </p>
          </>
        }
      >
        <BreakpointTable>
          <thead>
            <tr>
              <th>Breakpoint Name</th>
              <th>Minimum Width</th>
              <th>CSS Variable</th>
              <th>Media Query</th>
            </tr>
          </thead>
          <tbody>
            {breakpointData.breakpoints.map((info) => {
              const remValue = (info.value / 16).toFixed(4);
              return (
                <tr key={info.name}>
                  <td>{info.name}</td>
                  <td>{remValue}rem</td>
                  <td>{info.css}</td>
                  <td>@media screen and (min-width: {remValue}rem)</td>
                </tr>
              );
            })}
          </tbody>
        </BreakpointTable>
      </Section>
    );
  }
);
