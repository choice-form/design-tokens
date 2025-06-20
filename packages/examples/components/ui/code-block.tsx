import {
  color,
  spacing,
  typographyStyles,
} from "@choiceform/design-tokens/helpers";
import { css } from "@linaria/core";
import { Highlight, Language, PrismTheme } from "prism-react-renderer";
import { memo, ReactNode } from "react";

export interface CodeBlockProps {
  className?: string;
  code: string;
  customHighlight?: (
    tokenContent: string,
    tokenType: string
  ) => ReactNode | undefined;
  language?: Language;
  styleOverrides?: React.CSSProperties;
}

const codeBlockClass = css`
  background: transparent;
  color: ${color("fg.default")};
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  padding: ${spacing(4)};
  white-space: pre;
  overflow-x: auto;
  ${typographyStyles("body.medium")}
`;

const customTheme: PrismTheme = {
  plain: {
    color: color("fg.default"),
  },
  styles: [],
};

export const CodeBlock = memo(function CodeBlock(props: CodeBlockProps) {
  const {
    code,
    language = "tsx",
    customHighlight,
    styleOverrides,
    className,
  } = props;

  return (
    <div className={className}>
      <Highlight code={code} language={language} theme={customTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={codeBlockClass + " " + className}
            style={{ ...style, ...styleOverrides }}
          >
            {tokens.map((line, i) => {
              const { key, ...lineProps } = getLineProps({ line, key: i });
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, tokenKey) => {
                    if (customHighlight) {
                      const custom = customHighlight(
                        token.content,
                        token.types[0]
                      );
                      if (custom) return custom;
                    }
                    const { key: tokenPropsKey, ...tokenProps } = getTokenProps(
                      { token, key: tokenKey }
                    );
                    return <span key={tokenKey} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
});
