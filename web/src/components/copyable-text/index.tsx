import * as React from "react";

import css from "./style.module.css";
import useConfirmationText from "../use-confirmation-text";

export type CopyableTextProps = {
  children: string | number;
  Component?: React.ReactType;
  withConfirmation?: boolean;
};

const CopyableText: React.FC<CopyableTextProps> = ({
  children,
  Component = "div",
  withConfirmation = true,
}) => {
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(String(children));
    } catch (_) {}
  };

  const [onClick, icon] = useConfirmationText(handleCopy, {
    active: withConfirmation,
  });

  return (
    <Component onClick={onClick} className={css.copyable}>
      {children}
      {icon}
    </Component>
  );
};

export default CopyableText;
