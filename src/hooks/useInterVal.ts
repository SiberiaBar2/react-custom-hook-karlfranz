// auth danny
import React, { useRef, useEffect, MutableRefObject } from "react";

/**
 * react hook 和定时器的结合使用,
 *
 * 这是一个可以控制速度、暂停的hook
 *
 */

/**
 * Combined use of react hook and timer,
 *
 * This is a hook that can control speed and pause
 *
 */
export const useInterVal = (callback: () => void, delaty: number | null) => {
  const savedCallback: MutableRefObject<any> = useRef();

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
