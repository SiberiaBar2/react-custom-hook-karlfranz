import { useEffect, useRef, useState } from "react";
import _ from "lodash";

import {
  useBoolean,
  useFuncDebounce,
  useInterVal,
  useKeyUpdate,
  useThrottle,
} from ".";
import { cleanObject } from "../utils";

const RESPONSRCODE = 200;
const CODEPATH = "code";
const FAILEDMESSAGE = "获取数据失败";

interface OptionsConfig {
  loop?: number | number;
  debounceWait?: number;
  throttleWait?: number;
  cacheKey?: string;
  ready?: boolean;
  loadingDelay?: number;
  refreshOnWindowFocus?: boolean;
  refreshDeps?: unknown[];
  retryNum?: number;
  manual?: boolean;
  responsePath?: string;
  codePath?: string | number;
  responseCode?: string | number;
  enableConsoleAuxiliary?: boolean;
}

interface EndConfig {
  success?: (res: any) => void;
  error?: (error: Error | any) => void;
}

type P<K> = [
  syncFunc: (config: K) => Promise<unknown>,
  options?: OptionsConfig & EndConfig
];

/**
 *
 * loop?: number 轮询间隔;
 *
 * debounceWait?: number 防抖时间 若 也设置了节流择只触发防抖;
 *
 * throttleWait?: number 节流时间;
 *
 * cacheKey?: string 缓存key;
 *
 * ready?: boolean 为false请求永远不会发出;
 *
 * loadingDelay?: number 延迟请求时间;
 *
 * refreshOnWindowFocus?: boolean 屏幕聚焦时重新请求;
 *
 * refreshDeps?: unknown[] 依赖项变化时重新请求;
 *
 * retryNum?: number 错误重试次数;
 *
 * manual?: boolean 手动触发请求;
 *
 * responsePath?: string 返回数据路径;
 *
 * codePath?: string | number 设置响应结果的code状态路径 (默认为code);
 *
 * responseCode?: string | number 响应结果code的值 (默认为200)
 *
 * enableConsoleAuxiliary? boolean 是否开启辅助打印
 *
 */
/**
 * Data request hook
 *
 * loop?: polling interval;
 *
 * debounceWait?: debounce time. If throttling is also set, only trigger debounce;
 *
 * throttleWait?: throttling time;
 *
 * cacheKey?: string cache key;
 *
 * ready?: boolean is false and the request will never be issued;
 *
 * loadingDelay?: delay request time;
 *
 * refreshOnWindowFocus?: boolean Request when the screen is focused;
 *
 * refreshDeps?: unknown[] Request when dependencies change;
 *
 * retryNum?: number Number of error retries;
 *
 * manual?: boolean manually triggers the request;
 *
 * responsePath?: string returns data path;
 *
 * CodePath?: String | number; sets the code status path for the response result (default to code);
 *
 * ResponseCode?: string | number; response result code (default to 200);
 *
 * enableConsoleAuxiliary?: boolean; Is auxiliary printing enabled
 *
 */
export const useQuery = <T = any, K = unknown>(
  ...[syncFunc, options]: P<K>
) => {
  const {
    loop = null,
    ready = true,
    retryNum = 0,
    cacheKey = "",
    manual = false,
    refreshDeps = [],
    debounceWait = 0,
    throttleWait = 0,
    loadingDelay = 0,
    responsePath = "",
    codePath = CODEPATH,
    responseCode = RESPONSRCODE,
    refreshOnWindowFocus = false,
    enableConsoleAuxiliary = false,
  } = options || {};
  const throttleCallback = useThrottle();
  const debouncedCallback = useFuncDebounce();
  const { value: loading, on: loadingOn, off: loadingOff } = useBoolean();

  const [data, setData] = useState<T>({} as T);
  const retryNumRef = useRef<number>(0);
  const requestConfig = useRef<K>();

  /**
   * refreshDeps
   */
  useKeyUpdate(() => {
    if (!_.isEmpty(refreshDeps)) {
      loadingOn();
      debouncedCallback(getSyncDataWrap, 1000)(requestConfig.current);
    }
  }, [...refreshDeps]);

  /**
   *
   * request func
   */
  const run = (config?: K) => {
    getSyncDataWrap(config);
  };

  enableConsoleAuxiliary && console.log("render count");

  const saveData = (res: any) => {
    if (responsePath) {
      setData(_.get(res, responsePath, {}) || {});
    } else {
      setData(res);
    }
  };

  const getParams = (config?: K) => {
    if (Object.prototype.toString.call(config) === "[object Object]") {
      return !_.isEmpty(cleanObject(config)) ? cleanObject(config) : undefined;
    }
    return config;
  };

  const getSyncData = (config?: K) => {
    enableConsoleAuxiliary &&
      console.warn("useQuery getSyncData config", config);
    try {
      loadingOn();
      if (ready) {
        if (cacheKey) {
          const locationCacheData = JSON.parse(
            localStorage.getItem(cacheKey) || "{}"
          );
          if (!_.isEmpty(locationCacheData)) {
            saveData(locationCacheData);
            options?.success && options.success(locationCacheData);
            loadingOff();
          }
        } else {
          const params = getParams(config);
          if (!_.isEmpty(config)) {
            requestConfig.current = config;
          }

          syncFunc(params || ({} as K))
            .then((res) => {
              if (_.get(res, codePath) == responseCode) {
                saveData(res);
                options?.success && options?.success(res);
                cacheKey && localStorage.setItem(cacheKey, JSON.stringify(res));
                loadingOff();
              } else {
                console.error(FAILEDMESSAGE);
                loadingOff();
              }
            })
            .catch((error) => {
              loadingOff();
              options?.error && options.error(error);
              console.log("useQuery error catch!", error);

              if (retryNum) {
                if (retryNumRef.current < retryNum) {
                  retryNumRef.current += 1;
                  getSyncData(config);
                }
              }
            });
        }
      }
    } catch (error) {
      console.log(error);
      loadingOff();
    }
  };

  const getSyncDataWrap = (config?: K) => {
    if (debounceWait) {
      return debouncedCallback(getSyncData, debounceWait)(config);
    }
    if (throttleWait) {
      return throttleCallback(getSyncData, throttleWait)(config);
    }

    return getSyncData(config);
  };

  /**
   * is loadingDelay
   */
  const loadingDelatyTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  useEffect(() => {
    if (manual) {
      return;
    }
    if (loadingDelay) {
      loadingDelatyTimer.current = setTimeout(() => {
        getSyncDataWrap(requestConfig.current);
      }, loadingDelay);
      return;
    }

    getSyncDataWrap(requestConfig.current);

    return () => {
      if (loadingDelatyTimer.current) {
        clearTimeout(loadingDelatyTimer.current);
      }
    };
  }, []);

  /**
   * loop
   */
  const getDelatyVal = () => {
    return loop || loop === 0 ? loop : null;
  };
  useInterVal(() => {
    getSyncDataWrap(requestConfig.current);
  }, getDelatyVal());

  /**
   * refreshOnWindowFocus
   */
  const windowFocusFunc = () => {
    if (document.visibilityState === "visible" && refreshOnWindowFocus) {
      debouncedCallback(run, 5000)(requestConfig.current);
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", windowFocusFunc);
    return () => {
      document.removeEventListener("visibilitychange", windowFocusFunc);
    };
  }, []);

  return {
    data,
    loading,
    run,
  };
};
