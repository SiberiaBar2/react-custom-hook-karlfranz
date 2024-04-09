import { useState } from "react";
/**
 * @value useState维护的布尔值状态
 *
 * @on 将状态设置为true的函数
 *
 * @off 将状态设置为false的函数
 *
 * @toggle 对状态取反的函数
 */
/**
 * Boolean value state maintained by @value useState
 *
 * @on function that sets the status to true
 *
 * @off function that sets the status to false
 *
 * @toggle function to invert the state
 */
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

  return { value, toggle, on, off } as const;
};
