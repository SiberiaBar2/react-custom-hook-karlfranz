"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSyncCallback = void 0;
var react_1 = require("react");
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
var useSyncCallback = function (callback) {
    var _a = (0, react_1.useState)({ current: false }), proxyState = _a[0], setProxyState = _a[1];
    var _b = (0, react_1.useState)(), parameters = _b[0], setParameters = _b[1];
    var Func = (0, react_1.useCallback)(function (val) {
        setParameters(val);
        setProxyState({ current: true });
    }, []);
    (0, react_1.useEffect)(function () {
        if (proxyState.current === true) {
            setProxyState({ current: false });
        }
    }, [proxyState]);
    (0, react_1.useEffect)(function () {
        proxyState.current && callback(parameters);
    });
    return Func;
};
exports.useSyncCallback = useSyncCallback;
//# sourceMappingURL=useSyncCallback.js.map