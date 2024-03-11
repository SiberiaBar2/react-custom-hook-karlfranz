import { useEffect, useRef } from "react";
import { NUMS } from "./types";

/**
 * 有时我们并不希望在react初次渲染时就执行某些函数，
 *
 * 而是希望在后续的组件重渲中执行
 *
 * @callback 执行的回调函数
 *
 * @deps 依赖项 dependent
 *
 * @updatedCount 指定在多少次重薪渲染之后才会调用回调函数，默认为第一次重新渲染之后调用
 *
 * @unMount 卸载的函数 unMount
 */

/**
 * Sometimes we don’t want to execute certain functions when react is first rendered.
 *
 * Instead, we hope to execute it in subsequent component re-rendering
 *
 * @callback callback function executed
 *
 * @deps dependencies dependent
 *
 * @updatedCount specifies the number of re-renders before the callback function will be called. The default is to call it after the first re-render.
 *
 * @unMount Uninstall function unMount
 */
export const useUpdate = (
  callback: () => void,
  deps: unknown[],
  endCount?: number,
  unMount?: () => void
) => {
  const count = useRef(NUMS.ZERO);

  useEffect(() => {
    count.current += NUMS.ONE;

    if (count.current === (endCount || NUMS.ONE)) {
      return;
    }
    callback();

    return () => {
      // count.current = Nums.zero;
      unMount instanceof Function && unMount();
    };
  }, [...deps]);
};
