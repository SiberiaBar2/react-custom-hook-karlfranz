import { useState, useEffect, useCallback } from "react";

export const useSyncCallback = <T>(callback: (value?: T) => void) => {
  const [proxyState, setProxyState] = useState({ current: false });
  const [parameters, setParameters] = useState<T>();

  const Func = useCallback((val?: T) => {
    setParameters(val);
    setProxyState({ current: true });
  }, []);

  useEffect(() => {
    if (proxyState.current === true) {
      setProxyState({ current: false });
    }
  }, [proxyState]);

  useEffect(() => {
    proxyState.current && callback(parameters);
  });

  return Func;
};
