import { color, spacing } from "@choiceform/design-tokens";
import EffectsSettings from "@choiceform/icons-react/EffectsSettings";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { memo } from "react";

interface ShadowFieldProps {
  className?: string;
  shadowString: React.ReactNode;
}

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing(2)};
  width: 100%;
  height: ${spacing(8)};
  padding: 0 ${spacing(2)};
  border: 1px solid ${color("border.default")};
`;

const iconStyles = css`
  color: ${color("icon.secondary")};
`;

const textStyles = css`
  flex: 1;
  color: ${color("text.success")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ShadowField = memo(function ShadowField(props: ShadowFieldProps) {
  const { shadowString } = props;

  return (
    <Field className={props.className}>
      <EffectsSettings className={iconStyles} />
      <span className={textStyles}>{shadowString}</span>
    </Field>
  );
});

ShadowField.displayName = "ShadowField";
