import { useState } from "react";

export const useBoolean = (initValue: boolean = false) => {
  const [value, setValue] = useState(initValue);

  const on = () => {
    setValue(true);
  };
  const off = () => {
    setValue(false);
  };
  const toggle = () => {
    setValue((state) => {
      return !state;
    });
  };

  return [value, { toggle, on, off }] as const;
};
