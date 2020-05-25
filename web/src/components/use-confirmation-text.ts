import { useState, useEffect } from "react";

type FnType = () => Promise<void> | void;
type ConfirmationOptions = {
  confirmation?: string;
  active?: boolean;
};

function useConfirmationText(
  fn: FnType,
  { confirmation = "👍", active = true }: ConfirmationOptions = {}
): [FnType, string] {
  const [icon, setIcon] = useState<string>("");

  const doAction = async () => {
    await fn();
    if (active) {
      setIcon(confirmation);
    }
  };

  useEffect(
    function () {
      if (icon && active) {
        let time = setTimeout(() => setIcon(""), 3000);
        return () => clearTimeout(time);
      }
    },
    [icon, active]
  );

  return [doAction, icon];
}

export default useConfirmationText;
