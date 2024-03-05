import { useEffect, useRef } from "react";

/**
 * 有时我们并不希望在react初次渲染时就执行某些函数，
 *
 * 而是希望在后续的组件重渲中执行
 *
 * @callback 执行的回调函数
 *
 * @deps 依赖项
 *
 * @updatedCount 从第几次重渲之后开始执行回调函数 默认为第一次重渲之后
 *
 * @unMount 卸载的函数
 */

enum Nums {
  zero,
  one,
}

export const useUpdate = (
  callback: () => void,
  deps: unknown[],
  endCount?: number,
  unMount?: () => void
) => {
  const count = useRef(Nums.zero);

  useEffect(() => {
    count.current += Nums.one;

    if (count.current === (endCount || Nums.one)) {
      return;
    }
    callback();

    return () => {
      // count.current = Nums.zero;
      unMount instanceof Function && unMount();
    };
  }, [...deps]);
};
