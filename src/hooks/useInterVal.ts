// auth danny
import React, { useRef, useEffect, MutableRefObject } from "react";

type F = () => void;

/**
 * react hook 和定时器的结合使用,
 *
 * 这是一个可以控制速度、暂停的hook
 *
 * 参数 delaty 可以是一个变量
 */

/**
 * Combined use of react hook and timer,
 *
 * This is a hook that can control speed and pause
 *
 * param delaty can be a variable
 */
export const useInterVal = (callback: F, delaty: number | null) => {
  const savedCallback = useRef<F>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    // 暂停
    if (delaty !== null) {
      const id = setInterval(tick, delaty);
      return () => clearInterval(id);
    }
  }, [delaty]);
};
