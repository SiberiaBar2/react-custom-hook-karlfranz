import { useRef, useState, useEffect } from "react";

enum NUMS {
  ZERO,
  ONE,
}

type SyncFunc<K> = (value: K) => void | undefined;
type DispatchFunc<K> = (
  newData: K | ((prev: K) => K),
  callF?: SyncFunc<K>
) => Promise<K>;
type ReturnArray<K> = [K, DispatchFunc<K>];

export const useStateSync = <T>(initValue: T) => {
  const ref = useRef<number>(NUMS.ZERO);
  const callFRef = useRef<(val: T) => void>();
  const setFuncRef = useRef<DispatchFunc<T>>();
  const [state, setState] = useState<T>(initValue);
  const prevValue = useRef<T>(initValue);

  if (!ref.current) {
    ref.current = NUMS.ONE;
    setFuncRef.current = (
      newData: T | ((prev: T) => T),
      callF?: SyncFunc<T>
    ) => {
      callFRef.current = callF;
      if (newData instanceof Function) {
        setState((prev) => {
          prevValue.current = prev;
          return newData(prev);
        });
        return Promise.resolve(prevValue.current);
      }
      setState(newData);
      return Promise.resolve(newData);
    };
  }
  useEffect(() => {
    callFRef.current?.(state);
  }, [state]);
  return [state, setFuncRef.current] as ReturnArray<T>;
};
