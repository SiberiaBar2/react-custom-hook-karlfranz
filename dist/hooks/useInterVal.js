"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInterVal = void 0;
// auth danny
var react_1 = require("react");
/**
 * react hook 和定时器的结合使用,
 *
 * 这是一个可以控制速度、暂停的hook
 *
 * 参数 delaty 可以是一个变量
 */
/**
 * Combined use of react hook and timer,
 *
 * This is a hook that can control speed and pause
 *
 * param delaty can be a variable
 */
var useInterVal = function (callback, delaty) {
    var savedCallback = (0, react_1.useRef)(callback);
    (0, react_1.useEffect)(function () {
        savedCallback.current = callback;
    });
    (0, react_1.useEffect)(function () {
        var tick = function () {
            savedCallback.current();
        };
        // 暂停
        if (delaty !== null) {
            var id_1 = setInterval(tick, delaty);
            return function () { return clearInterval(id_1); };
        }
    }, [delaty]);
};
exports.useInterVal = useInterVal;
//# sourceMappingURL=useInterVal.js.map