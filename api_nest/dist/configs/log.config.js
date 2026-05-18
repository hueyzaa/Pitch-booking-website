"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityMap = exports.IMPACT_SEVERITY_DTO = exports.LOG_CATEGORY_DTO = exports.IMPACT_SEVERITY = exports.LOG_CATEGORY = exports.URL_SEVERITY_MAP = void 0;
exports.URL_SEVERITY_MAP = {
    MUC_2: [
        { url: '/users', methods: ['POST', 'PATCH', 'DELETE'] },
        { url: '/roles', methods: ['POST', 'PATCH', 'DELETE'] },
    ],
    MUC_3: [],
};
exports.LOG_CATEGORY = {
    NHOM_1: 'Truy cập chương trình',
    NHOM_2: 'Đăng nhập / Đăng xuất hệ thống',
    NHOM_3: 'Lỗi phát sinh trong quá trình hoạt động',
    NHOM_4: 'Quản lý tài khoản',
    NHOM_5: 'Thay đổi cấu hình phần mềm',
};
exports.IMPACT_SEVERITY = {
    MUC_1: 'Bình thường',
    MUC_2: 'Cao',
    MUC_3: 'Nghiêm trọng',
};
exports.LOG_CATEGORY_DTO = [
    { value: 1, name: exports.LOG_CATEGORY.NHOM_1 },
    { value: 2, name: exports.LOG_CATEGORY.NHOM_2 },
    { value: 3, name: exports.LOG_CATEGORY.NHOM_3 },
    { value: 4, name: exports.LOG_CATEGORY.NHOM_4 },
    { value: 5, name: exports.LOG_CATEGORY.NHOM_5 },
];
exports.IMPACT_SEVERITY_DTO = [
    { value: 1, name: exports.IMPACT_SEVERITY.MUC_1 },
    { value: 2, name: exports.IMPACT_SEVERITY.MUC_2 },
    { value: 3, name: exports.IMPACT_SEVERITY.MUC_3 },
];
exports.entityMap = {
    dashboard: 'Trang chủ',
    'auth/login': 'Đăng nhập',
    'auth/logout': 'Đăng xuất',
    'auth/forgot-password': 'Quên mật khẩu',
    'auth/reset-password': 'Đổi mật khẩu',
    'log-thao-tac': 'Log thao tác',
    log: 'Log',
    'nguoi-dung-thiet-bi': 'Người dùng thiết bị',
    users: 'Người dùng',
    'thong-bao': 'Thông báo',
    roles: 'Vai trò',
    tinh: 'Tỉnh',
    huyen: 'Huyện',
    xa: 'Xã',
};
//# sourceMappingURL=log.config.js.map