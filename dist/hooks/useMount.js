"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMount = void 0;
var react_1 = require("react");
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