import { useState, useEffect, useCallback } from "react";

/**
 * 提供一个可以获取到react最新状态的函数
 * 
 * @param callback 回调函数
 * 
 * @returns 
 * 
   const syncFunc = useSyncCallback<string>((value) => {
    ...
    // 在当前函数体内可以获取到最新的值
   })

   syncFunc() 
   // syncFunc函数需要在你指定的位置调用
 */

/**
  * Provide a function that can get the latest status of react
  *
  * @param callback callback function
  *
  * @returns
  *
    const syncFunc = useSyncCallback<string>((value) => {
     ...
     //The latest value can be obtained in the current function body
    })

    syncFunc()
    // The syncFunc function needs to be called at the location you specify
  */
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
