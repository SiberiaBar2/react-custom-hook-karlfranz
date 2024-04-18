"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBoolean = void 0;
var react_1 = require("react");
/**
 * @value useState维护的布尔值状态
 *
 * @on 将状态设置为true的函数
 *
 * @off 将状态设置为false的函数
 *
 * @toggle 对状态取反的函数
 */
/**
 * Boolean value state maintained by @value useState
 *
 * @on function that sets the status to true
 *
 * @off function that sets the status to false
 *
 * @toggle function to invert the state
 */
var useBoolean = function (initValue) {
    if (initValue === void 0) { initValue = false; }
    var _a = (0, react_1.useState)(initValue), value = _a[0], setValue = _a[1];
    var on = function () {
        setValue(true);
    };
    var off = function () {
        setValue(false);
    };
    var toggle = function () {
        setValue(function (state) {
            return !state;
        });
    };
    return { value: value, toggle: toggle, on: on, off: off };
};
exports.useBoolean = useBoolean;
//# sourceMappingURL=useBoolean.js.map