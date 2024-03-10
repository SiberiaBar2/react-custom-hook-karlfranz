import { useCallback, useState } from "react";

/**
 * react useState 结合 sessionStorage，在改变状态时会存储状态到sessionStorage
 * 
 * @param value 初始值 | 计算初始值的函数
 * 
 * @param storgeKey stroage 存储的键
 * 
 * @returns [state, setState]
 */

/**
 * react useState combined with sessionStorage will store the state to sessionStorage when changing the state.
 * 
 * @param value initial value | function to calculate initial value
 * 
 * @param storageKey stroage stored key
 * 
 * @returns [state, setState]
 */
export function useStorgeState<T>(value: T | (() => T), storgeKey?: string) {
  const key = storgeKey || location.pathname;

  const toStringify = (val: T) => JSON.stringify(val);
  const toParse = (val: string | null) => val && JSON.parse(val);
  const stroge = sessionStorage.getItem(key) || "";

  const [state, setState] = useState<T>(() => {
    if (value instanceof Function && !toParse(stroge || "")) return value();
    return toParse(stroge || "") || value;
  });

  const changeState = useCallback(
    (state: T | ((prev?: T) => T)) => {
      if (state instanceof Function) {
        setState((prev) => {
          sessionStorage.setItem(key, toStringify(state(prev)));
          return state(prev);
        });
      } else {
        setState(state);
        sessionStorage.setItem(key, toStringify(state));
      }
    },
    [key]
  );

  return [state, changeState] as const;
}
