"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_DATETIME_FORMAT = exports.DB_DATE_FORMAT = exports.EXCEL_DATE_FORMAT = exports.ALLOWED_EXCEL_MIME_TYPES = exports.USER_EXCEL_HEADERS = exports.USER_EXCEL_COLUMNS = exports.GENDER_MAPPING = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender[Gender["FEMALE"] = 0] = "FEMALE";
    Gender[Gender["MALE"] = 1] = "MALE";
})(Gender = exports.Gender || (exports.Gender = {}));
exports.GENDER_MAPPING = {
    nam: Gender.MALE,
    nu: Gender.FEMALE,
};
exports.USER_EXCEL_COLUMNS = {
    HO: 'A',
    TEN: 'B',
    TAI_KHOAN: 'C',
    MAT_KHAU: 'D',
    SO_DIEN_THOAI: 'E',
    NGAY_SINH: 'F',
    GIOI_TINH: 'G',
    DIA_CHI: 'H',
    TINH_ID: 'I',
    XA_ID: 'J',
    EMAIL: 'K',
    MA_VAI_TRO: 'L',
    TRANG_THAI: 'M',
};
exports.USER_EXCEL_HEADERS = [
    'Họ',
    'Tên',
    'Tài khoản',
    'Mật khẩu',
    'Số điện thoại',
    'Ngày sinh',
    'Giới tính',
    'Địa chỉ',
    'Tỉnh',
    'Xã',
    'Email',
    'Mã vai trò',
    'Trạng thái',
];
exports.ALLOWED_EXCEL_MIME_TYPES = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
];
exports.EXCEL_DATE_FORMAT = 'DD/MM/YYYY';
exports.DB_DATE_FORMAT = 'YYYY-MM-DD';
exports.DB_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
//# sourceMappingURL=users.constants.js.map