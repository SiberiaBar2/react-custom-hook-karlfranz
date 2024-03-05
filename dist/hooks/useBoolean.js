"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBoolean = void 0;
var react_1 = require("react");
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
    return [value, { toggle: toggle, on: on, off: off }];
};
exports.useBoolean = useBoolean;
//# sourceMappingURL=useBoolean.js.map