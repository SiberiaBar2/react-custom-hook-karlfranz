"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./useBoolean"), exports);
__exportStar(require("./useFuncDebounce"), exports);
__exportStar(require("./useStateSync"), exports);
__exportStar(require("./useStorgeState"), exports);
__exportStar(require("./useSyncCallback"), exports);
__exportStar(require("./useMount"), exports);
__exportStar(require("./useInterVal"), exports);
__exportStar(require("./useKeyUpdate"), exports);
__exportStar(require("./useThrottle"), exports);
__exportStar(require("./useMountRef"), exports);
__exportStar(require("./useDocumentTitle"), exports);
//# sourceMappingURL=index.js.map