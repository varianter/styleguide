import * as React from "react";
import { useState } from "react";

import css from "./style.module.css";

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
  const [icon, setIcon] = useState<string>("");

  const onClick = async () => {
    try {
      navigator.clipboard.writeText(String(children));

      if (withConfirmation) {
        setIcon("👍");
        setTimeout(function () {
          setIcon("");
        }, 3000);
      }
    } catch (_) {}
  };

  return (
    <Component onClick={onClick} className={css.copyable}>
      {children}
      {icon}
    </Component>
  );
};

export default CopyableText;
