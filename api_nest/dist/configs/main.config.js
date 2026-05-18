"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILTER_OPERATOR = exports.ACTION = void 0;
exports.ACTION = {
    index: 'index',
    create: 'create',
    show: 'show',
    edit: 'edit',
    delete: 'delete',
    export: 'export',
    showMenu: 'showMenu',
    changePassword: 'changePassword',
};
exports.FILTER_OPERATOR = {
    EQUAL: 'equal',
    NOT_EQUAL: 'not_equal',
    EQUAL_TO: 'equal_to',
    CONTAIN: 'contain',
    LESS_THAN: 'less_than',
    LESS_THAN_OR_EQUAL_TO: 'less_than_or_equal_to',
    GREATER_THAN: 'greater_than',
    GREATER_THAN_OR_EQUAL_TO: 'greater_than_or_equal_to',
    INCLUDES: 'includes',
    BETWEEN: 'between',
};
exports.default = {
    responseInterceptorExcludePaths: /getPdf|download|download-file|example-module/,
};
//# sourceMappingURL=main.config.js.map