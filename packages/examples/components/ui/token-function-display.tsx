import { color } from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import { memo } from "react";

export interface TokenFunctionDisplayProps {
  functionName: string;
  value: string | number;
  withQuotes?: boolean;
}

export const TokenFunctionDisplay = memo((props: TokenFunctionDisplayProps) => {
  const { functionName, value, withQuotes = true } = props;

  return (
    <div>
      {"${"}
      {functionName}(
      <span
        className={css`
          color: ${color("text.assistive")};
        `}
      >
        {withQuotes && '"'}
        {value}
        {withQuotes && '"'}
      </span>
      ){"}"}
    </div>
  );
});

TokenFunctionDisplay.displayName = "TokenFunctionDisplay";
