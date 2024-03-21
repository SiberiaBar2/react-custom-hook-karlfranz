import { useEffect, useRef } from "react";
import { NUMS } from "./types";

/**
 * 
 * 在依赖值初始化时不会执行回调函数(也可以指定依赖值渲染多少次之后再执行回调函数)；
 * 
 * 有时我们并不希望在react某个值初次渲染时就执行某些函数，
 *
 * 而是希望在该值在后续的某次重新渲染之后执行,
 *
 * 那么此时可能你就需要这个hook
 *
 * @callback 执行的回调函数
 *
 * @deps 依赖项 dependent
 *
 * @endCount 指定在多少次重薪渲染之后才会调用回调函数，默认为第一次重新渲染之后调用
 *
 * @unMount 卸载的函数 unMount
 */

/**
 * 
 * The callback function will not be executed when the dependent value is initialized (you can also specify how many times the dependent value is rendered before executing the callback function);
 * 
 * Sometimes we don’t want to execute certain functions when a certain value is first rendered in react.
 *
 * Instead, we hope to execute it after the value is re-rendered in a subsequent time,
 *
 * Then you may need this hook at this time
 *
 * @callback callback function executed
 *
 * @deps dependencies dependent
 *
 * @endCount specifies how many times the callback function will be called after re-rendering. The default is to call it after the first re-render.
 *
 * @unMount Uninstall function unMount
 */
export const useKeyUpdate = (
  callback: () => void,
  deps: unknown[],
  endCount?: number,
  unMount?: () => void
) => {
  const count = useRef(NUMS.ZERO);

  useEffect(() => {
    count.current += NUMS.ONE;

    if (count.current > (endCount || NUMS.ONE)) {
      callback();
    }

    return () => {
      // count.current = Nums.zero;
      unMount instanceof Function && unMount();
    };
  }, [...deps]);
};
