import { useEffect, useRef } from "react";
import { useBoolean } from "./useBoolean";

type Ready = { [value: string]: boolean };

export const useRefState = <T = any>(initialValue: T) => {
  const state = useRef<T>(initialValue);
  const ready = useRef<Ready>({
    value: false,
  });
  const [_, { toggle }] = useBoolean(false);

  const handler = {
    get(target: Ready, key: string) {
      return target[key];
    },
    set(target: Ready, key: string, newValue: any) {
      target[key as string] = newValue;
      toggle();
      return true;
    },
  };
  function createRevocableProxy(target: Ready, handler: ProxyHandler<Ready>) {
    const { proxy, revoke } = Proxy.revocable(target, handler);
    return { proxy, revoke };
  }
  const { proxy, revoke } = createRevocableProxy(ready.current, handler);

  useEffect(() => {
    return () => {
      revoke();
    };
  }, []);
  return { state: state.current, ready: proxy } as const;
};
