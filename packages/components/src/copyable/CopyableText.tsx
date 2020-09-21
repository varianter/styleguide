import React from "react";
import { CopyableElement, CopyableElementProp } from "./CopyableElement";

type CopyableTextProps<T extends keyof JSX.IntrinsicElements> = Omit<
  CopyableElementProp<T>,
  "overrideCopyValue"
>;

export function CopyableText<T extends keyof JSX.IntrinsicElements>({
  className,
  children,
  ...props
}: CopyableTextProps<T>) {
  return <CopyableElement<T> {...props}>{children}</CopyableElement>;
}
