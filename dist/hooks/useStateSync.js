"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStateSync = void 0;
var react_1 = require("react");
var NUMS;
(function (NUMS) {
    NUMS[NUMS["ZERO"] = 0] = "ZERO";
    NUMS[NUMS["ONE"] = 1] = "ONE";
})(NUMS || (NUMS = {}));
var useStateSync = function (initValue) {
    var ref = (0, react_1.useRef)(NUMS.ZERO);
    var callFRef = (0, react_1.useRef)();
    var setFuncRef = (0, react_1.useRef)();
    var _a = (0, react_1.useState)(initValue), state = _a[0], setState = _a[1];
    var prevValue = (0, react_1.useRef)(initValue);
    if (!ref.current) {
        ref.current = NUMS.ONE;
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