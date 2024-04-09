import { useCallback, useState } from "react";

/**
 * react useState combined with localStorage will store the state to localStorage when changing the state.
 *
 * @param value initial value | function to calculate initial value
 *
 * @param storageKey stroage stored key
 *
 * @returns [state, setState]
 */
export function useLocalState<T>(value: T | (() => T), storgeKey?: string) {
  const key = storgeKey || location.pathname;

  const toStringify = (val: T) => JSON.stringify(val);
  const toParse = (val: string | null) => val && JSON.parse(val);
  const stroge = localStorage.getItem(key) || "";

  const [state, setState] = useState<T>(() => {
    if (value instanceof Function && !toParse(stroge || "")) return value();
    return toParse(stroge || "") || value;
  });

  const changeState = useCallback(
    (state: T | ((prev?: T) => T)) => {
      if (state instanceof Function) {
        setState((prev) => {
          localStorage.setItem(key, toStringify(state(prev)));
          return state(prev);
        });
      } else {
        setState(state);
        localStorage.setItem(key, toStringify(state));
      }
    },
    [key]
  );

  return [state, changeState] as const;
}
