import { useCallback, useEffect, useRef, useState } from "react";
import { generateUniqueString } from "../utils";

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
  const key = storgeKey || generateUniqueString();

  const sessonKey = useRef("");
  if (!sessonKey.current) {
    sessonKey.current = key;
  }
  const toStringify = (val: T) => JSON.stringify(val);
  const toParse = (val: string | null) => val && JSON.parse(val);
  const stroge = localStorage.getItem(sessonKey.current) || "";

  const [state, setState] = useState<T>(() => {
    if (value instanceof Function && !toParse(stroge || "")) return value();
    return toParse(stroge || "") || value;
  });

  const changeState = useCallback(
    (state: T | ((prev?: T) => T)) => {
      if (state instanceof Function) {
        setState((prev) => {
          const newState = state(prev);
          localStorage.setItem(sessonKey.current, toStringify(newState));
          return newState;
        });
      } else {
        setState(state);
        localStorage.setItem(sessonKey.current, toStringify(state));
      }
    },
    [sessonKey.current]
  );

  useEffect(() => {
    return () => {
      if (!storgeKey) localStorage.removeItem(sessonKey.current);
    };
  }, [sessonKey.current, storgeKey]);
  return [state, changeState] as const;
}
