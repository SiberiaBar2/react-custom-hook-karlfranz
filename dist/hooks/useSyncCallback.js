"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSyncCallback = void 0;
var react_1 = require("react");
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