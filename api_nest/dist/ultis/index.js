"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSqlFormatDate = void 0;
const getSqlFormatDate = (date) => {
    return "'" + date.toISOString() + "'";
};
exports.getSqlFormatDate = getSqlFormatDate;
//# sourceMappingURL=index.js.map