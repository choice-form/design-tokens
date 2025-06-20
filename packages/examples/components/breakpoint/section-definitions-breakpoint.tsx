import {
  color,
  listBreakpoints,
  breakpoint,
  breakpointInfo,
  spacingList,
  typographyStyles,
  BreakpointKey,
} from "@choiceform/design-tokens";
import { styled } from "@linaria/react";
import { Section } from "..";
import { memo } from "react";

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
    const breakpointNames = listBreakpoints();

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
            {breakpointNames.map((name) => {
              const info = breakpointInfo(name as BreakpointKey);
              const value = breakpoint(name as BreakpointKey);
              return (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{value}</td>
                  <td>--cdt-breakpoints-{name}</td>
                  <td>{info.name}</td>
                </tr>
              );
            })}
          </tbody>
        </BreakpointTable>
      </Section>
    );
  }
);
