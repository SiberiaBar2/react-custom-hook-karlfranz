import { useEffect } from "react";

/**
 * 在react函数式组件首次渲染时执行
 *
 * @callback 回调函数
 *
 * @effect useEffect的清理副作用函数
 */

/**
 * Executed when the react functional component is first rendered
 *
 * @callback callback function
 *
 * @effect useEffect’s cleanup side effect function
 */
export const useMount = (callback: () => void, effect?: () => void) => {
  useEffect(() => {
    callback();
    return () => {
      effect instanceof Function && effect();
    };
  }, []);
};
