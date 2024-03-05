"use strict";
// auth danny
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInterVal = void 0;
/**
 * react hook 和定时器的结合使用， 可用于下面的 useCountDown hook
 *
 * 这是一个可以控制速度、暂停的hook
 *
 */
var react_1 = require("react");
var useInterVal = function (callback, delaty) {
    var savedCallback = (0, react_1.useRef)();
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