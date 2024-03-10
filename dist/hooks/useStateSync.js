"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStateSync = void 0;
var react_1 = require("react");
var types_1 = require("./types");
/**
 * 可以获得React状态更新后最新的值
 *
 * exmplate
 *
 * const [count, setCount] = useStateStrong<number>(1);
 *
  const handelClick = () => {
  // 其中 newValue 是最新的值
  setCount(count + 1).then((newValue: number) => {
    console.warn('.thenSyncState', newValue);
  });
  // count 是"旧值"(过去的渲染中的值)
    console.warn('noSync', count);
  }

  另一种使用方式
  const handelClick = () => {
    setCount(count + 1, (newState: any) => {
     在当前函数体内可以获得最新的值
         console.warn('syncState', newState);
    });
  };
 */
/**
  * Get the latest value after React status update
  *
  * exmplate
  *
  * const [count, setCount] = useStateStrong<number>(1);
  *
   const handelClick = () => {
   // where newValue is the latest value
   setCount(count + 1).then((newValue: number) => {
     console.warn('.thenSyncState', newValue);
   });
   // count is the "old value" (the value from past renderings)
     console.warn('noSync', count);
   }

   Another way to use
   const handelClick = () => {
     setCount(count + 1, (newState: any) => {
      The latest value can be obtained in the current function body
          console.warn('syncState', newState);
     });
   };
  */
var useStateSync = function (initValue) {
    var ref = (0, react_1.useRef)(types_1.NUMS.ZERO);
    var callFRef = (0, react_1.useRef)();
    var setFuncRef = (0, react_1.useRef)();
    var _a = (0, react_1.useState)(initValue), state = _a[0], setState = _a[1];
    var prevValue = (0, react_1.useRef)(initValue);
    if (!ref.current) {
        ref.current = types_1.NUMS.ONE;
        setFuncRef.current = function (newData, callF) {
            callFRef.current = callF;
            if (newData instanceof Function) {
                setState(function (prev) {
                    prevValue.current = prev;
                    return newData(prev);
                });
                return Promise.resolve(prevValue.current);
            }
            setState(newData);
            return Promise.resolve(newData);
        };
    }
    (0, react_1.useEffect)(function () {
        var _a;
        (_a = callFRef.current) === null || _a === void 0 ? void 0 : _a.call(callFRef, state);
    }, [state]);
    return [state, setFuncRef.current];
};
exports.useStateSync = useStateSync;
//# sourceMappingURL=useStateSync.js.map