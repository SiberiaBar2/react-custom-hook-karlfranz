import { useEffect, useRef } from "react";

/**
 *
 * 提供一个节流函数
 */

/**
 *
 * Provide a throttling function
 */
export const useThrottle = () => {
  const valid = useRef(false);
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  const throttleCallback = (fn: Function, delay: number = 500) => {
    return (config?: unknown, ...args: unknown[]) => {
      if (valid.current) return;

      valid.current = true;
      timer.current = setTimeout(() => {
        valid.current = false;
        fn.apply(config, [config, ...args]);
      }, delay);
    };
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return throttleCallback;
};
