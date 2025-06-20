import { spacing } from "@choiceform/design-tokens/helpers";
import { css } from "@linaria/core";
import { memo } from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

const pageContainerClass = css`
  max-width: ${spacing("lg")};
  margin: 0 auto;
`;

export const PageContainer = memo(function PageContainer(
  props: PageContainerProps
) {
  const { children } = props;

  return <div className={pageContainerClass}>{children}</div>;
});

PageContainer.displayName = "PageContainer";
