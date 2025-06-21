import { color } from "@choiceform/design-tokens";
import { css } from "@linaria/core";
import { memo } from "react";

export interface TokenFunctionDisplayProps {
  functionName: string;
  value: string | number;
  withQuotes?: boolean;
}

// 预定义样式以避免运行时问题
const assistiveTextStyles = css`
  color: ${color("text.assistive")};
`;

export const TokenFunctionDisplay = memo((props: TokenFunctionDisplayProps) => {
  const { functionName, value, withQuotes = true } = props;

  return (
    <div>
      {"${"}
      {functionName}(
      <span className={assistiveTextStyles}>
        {withQuotes && '"'}
        {value}
        {withQuotes && '"'}
      </span>
      ){"}"}
    </div>
  );
});

TokenFunctionDisplay.displayName = "TokenFunctionDisplay";
