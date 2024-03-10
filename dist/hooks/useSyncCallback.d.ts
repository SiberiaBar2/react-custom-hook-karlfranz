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
export declare const useSyncCallback: <T>(callback: (value?: T | undefined) => void) => (val?: T | undefined) => void;
