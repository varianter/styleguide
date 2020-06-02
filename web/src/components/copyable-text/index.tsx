import * as React from "react";

import css from "./style.module.css";
import useConfirmationText from "../use-confirmation-text";

export interface CopyableTextProps extends React.ComponentPropsWithoutRef<any> {
  children: string | number;
  Component?: React.ReactType;
  withConfirmation?: boolean;
  overrideCopyValue?: string | number;
}

const CopyableText: React.FC<CopyableTextProps> = ({
  children,
  Component = "div",
  withConfirmation = true,
  className,
  overrideCopyValue,
  ...props
}) => {
  const handleCopy = async () => {
    try {
      navigator.clipboard.writeText(
        String(overrideCopyValue ? overrideCopyValue : children)
      );
    } catch (_) {}
  };

  const [onClick, icon] = useConfirmationText(handleCopy, {
    active: withConfirmation,
  });

  return (
    <Component
      onClick={onClick}
      className={`${className || ""} ${css.copyable}`}
      {...props}
    >
      {children}
      {icon}
    </Component>
  );
};

export default CopyableText;
