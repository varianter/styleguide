import React from "react";
import { CopyableElement, CopyableElementProp } from "./CopyableElement";

type CopyableButtonProp = Omit<
  CopyableElementProp<"button">,
  "component" | "overrideCopyValue" | "children"
> & { copyValue: string; buttonText?: string };

export function CopyableButton({
  copyValue,
  buttonText = "Click to copy",
  ...props
}: CopyableButtonProp) {
  return (
    <CopyableElement<"button">
      Component="button"
      overrideCopyValue={copyValue}
      {...props}
    >
      {buttonText}
    </CopyableElement>
  );
}
