import React, { PropsWithChildren } from "react";
import useConfirmationText from "../utils/use-confirmation-text";
import css from "./style.module.css";

export type CopyableElementProp<
  T extends keyof JSX.IntrinsicElements
> = PropsWithChildren<
  {
    Component?: React.ElementType;
    withConfirmation?: boolean;
    overrideCopyValue?: string | number | false;
  } & JSX.IntrinsicElements[T] &
    JSX.IntrinsicAttributes
>;

export function CopyableElement<T extends keyof JSX.IntrinsicElements>({
  Component = "div",
  withConfirmation,
  overrideCopyValue = false,
  className,
  children,
  ...props
}: CopyableElementProp<T>) {
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
}
