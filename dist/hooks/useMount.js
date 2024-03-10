"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMount = void 0;
var react_1 = require("react");
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
var useMount = function (callback, effect) {
    (0, react_1.useEffect)(function () {
        callback();
        return function () {
            effect instanceof Function && effect();
        };
    }, []);
};
exports.useMount = useMount;
//# sourceMappingURL=useMount.js.map