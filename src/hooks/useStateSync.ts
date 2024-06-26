import { useRef, useState, useEffect } from "react";
import { NUMS } from "../types";

export type SyncFunc<K> = (value: K) => void | undefined;
export type DispatchFunc<K> = (
  newData: K | ((prev: K) => K),
  callF?: SyncFunc<K>
) => Promise<K>;
export type ReturnArray<K> = [K, DispatchFunc<K>];

/**
 * 可以获得React状态更新后最新的值
 * 
 * exmplate 
 * 
 * const [count, setCount] = useStateStrong<number>(1);
 * 
  const handelClick = () => {
  // 其中 newValue 是最新的值
  setCount(count + 1).then((newValue: number) => {
    console.warn('.thenSyncState', newValue);
  });
  // count 是"旧值"(过去的渲染中的值)
    console.warn('noSync', count);
  } 

  另一种使用方式
  const handelClick = () => {
    setCount(count + 1, (newState: any) => {
     在当前函数体内可以获得最新的值
         console.warn('syncState', newState);
    });
  };
 */

/**
  * Get the latest value after React status update
  *
  * exmplate
  *
  * const [count, setCount] = useStateSync<number>(1);
  *
   const handelClick = () => {
   // where newValue is the latest value
   setCount(count + 1).then((newValue: number) => {
     console.warn('.thenSyncState', newValue);
   });
   // count is the "old value" (the value from past renderings)
     console.warn('noSync', count);
   }

   Another way to use
   const handelClick = () => {
     setCount(count + 1, (newState: any) => {
      The latest value can be obtained in the current function body
          console.warn('syncState', newState);
     });
   };
  */
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
          const newResult = newData(prev);
          prevValue.current = newResult;
          return newResult;
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
