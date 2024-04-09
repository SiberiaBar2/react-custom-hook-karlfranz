"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSessonState = void 0;
var react_1 = require("react");
/**
 * react useState 结合 sessionStorage，在改变状态时会存储状态到sessionStorage
 *
 * @param value 初始值 | 计算初始值的函数
 *
 * @param storgeKey stroage 存储的键
 *
 * @returns [state, setState]
 */
/**
 * react useState combined with sessionStorage will store the state to sessionStorage when changing the state.
 *
 * @param value initial value | function to calculate initial value
 *
 * @param storageKey stroage stored key
 *
 * @returns [state, setState]
 */
function useSessonState(value, storgeKey) {
    var key = storgeKey || location.pathname;
    var toStringify = function (val) { return JSON.stringify(val); };
    var toParse = function (val) { return val && JSON.parse(val); };
    var stroge = sessionStorage.getItem(key) || "";
    var _a = (0, react_1.useState)(function () {
        if (value instanceof Function && !toParse(stroge || ""))
            return value();
        return toParse(stroge || "") || value;
    }), state = _a[0], setState = _a[1];
    var changeState = (0, react_1.useCallback)(function (state) {
        if (state instanceof Function) {
            setState(function (prev) {
                sessionStorage.setItem(key, toStringify(state(prev)));
                return state(prev);
            });
        }
        else {
            setState(state);
            sessionStorage.setItem(key, toStringify(state));
        }
    }, [key]);
    return [state, changeState];
}
exports.useSessonState = useSessonState;
//# sourceMappingURL=useStorgeState.js.map