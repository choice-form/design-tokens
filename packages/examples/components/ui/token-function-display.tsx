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
      <span style={{ color: "var(--cdt-color-text-assistive)" }}>
        {withQuotes && '"'}
        {value}
        {withQuotes && '"'}
      </span>
      ){"}"}
    </div>
  );
});

TokenFunctionDisplay.displayName = "TokenFunctionDisplay";
