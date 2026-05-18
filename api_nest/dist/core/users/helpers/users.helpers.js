"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUserResponse = exports.createUserRoleMappings = exports.validateMultipleRoles = exports.formatImportResult = exports.mapExcelRowToUserDto = exports.validateRole = exports.parseGenderFromVietnamese = exports.buildFullName = void 0;
const core_exception_1 = require("../../exceptions/core.exception");
const contanst_1 = require("../../../configs/contanst");
const typeorm_1 = require("typeorm");
const _ = require("lodash");
const moment = require("moment");
const users_constants_1 = require("../constants/users.constants");
const users_dto_1 = require("../dto/users.dto");
function buildFullName(ho, ten) {
    return `${ho} ${ten}`.trim();
}
exports.buildFullName = buildFullName;
function parseGenderFromVietnamese(genderText) {
    const normalized = _.toLower(genderText)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/\s+/g, '');
    const gender = users_constants_1.GENDER_MAPPING[normalized];
    if (gender === undefined) {
        throw new Error('Sai giới tính (chỉ chấp nhận "Nam" hoặc "Nữ")');
    }
    return gender;
}
exports.parseGenderFromVietnamese = parseGenderFromVietnamese;
async function validateRole(roleCode, vaiTroRepo) {
    const role = await vaiTroRepo.findOneBy({ ma_vai_tro: roleCode });
    if (!role) {
        throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.ROLE_INVALID, contanst_1.HTTP_CODE.UNPROCESSABLE_CONTENT);
    }
    return role;
}
exports.validateRole = validateRole;
function mapExcelRowToUserDto(row, userId) {
    const userData = new users_dto_1.CreateUsersDto();
    const now = moment().utcOffset('+07:00').format(users_constants_1.DB_DATETIME_FORMAT);
    Object.assign(userData, {
        ho: row[users_constants_1.USER_EXCEL_COLUMNS.HO],
        ten: row[users_constants_1.USER_EXCEL_COLUMNS.TEN],
        tai_khoan: row[users_constants_1.USER_EXCEL_COLUMNS.TAI_KHOAN],
        mat_khau: row[users_constants_1.USER_EXCEL_COLUMNS.MAT_KHAU],
        so_dien_thoai: row[users_constants_1.USER_EXCEL_COLUMNS.SO_DIEN_THOAI],
        ngay_sinh: moment(row[users_constants_1.USER_EXCEL_COLUMNS.NGAY_SINH], users_constants_1.EXCEL_DATE_FORMAT).format(users_constants_1.DB_DATE_FORMAT),
        gioi_tinh: parseGenderFromVietnamese(row[users_constants_1.USER_EXCEL_COLUMNS.GIOI_TINH]),
        dia_chi: row[users_constants_1.USER_EXCEL_COLUMNS.DIA_CHI],
        tinh_id: row[users_constants_1.USER_EXCEL_COLUMNS.TINH_ID],
        xa_id: row[users_constants_1.USER_EXCEL_COLUMNS.XA_ID],
        email: row[users_constants_1.USER_EXCEL_COLUMNS.EMAIL] || null,
        ma_vai_tro: row[users_constants_1.USER_EXCEL_COLUMNS.MA_VAI_TRO],
        trang_thai: row[users_constants_1.USER_EXCEL_COLUMNS.TRANG_THAI],
        nguoi_tao: userId,
        ngay_tao: now,
        nguoi_cap_nhat: userId,
        ngay_cap_nhat: now,
    });
    return userData;
}
exports.mapExcelRowToUserDto = mapExcelRowToUserDto;
function formatImportResult(success, fail, pathResult) {
    return {
        success: success.length,
        fail: fail.length,
        danh_sach_thanh_cong: success,
        danh_sach_that_bai: fail,
        path_result: pathResult,
    };
}
exports.formatImportResult = formatImportResult;
async function validateMultipleRoles(roleIds, vaiTroRepo) {
    if (!roleIds || roleIds.length === 0) {
        throw new core_exception_1.HttpCoreException('Danh sách vai trò không được để trống', contanst_1.HTTP_CODE.UNPROCESSABLE_CONTENT);
    }
    const roles = await vaiTroRepo.find({
        where: {
            id: (0, typeorm_1.In)(roleIds),
        },
    });
    if (roles.length !== roleIds.length) {
        throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.ROLE_INVALID, contanst_1.HTTP_CODE.UNPROCESSABLE_CONTENT);
    }
    return roles;
}
exports.validateMultipleRoles = validateMultipleRoles;
function createUserRoleMappings(userId, roleIds) {
    return roleIds.map((roleId) => ({
        nguoi_dung_id: userId,
        vai_tro_id: roleId,
    }));
}
exports.createUserRoleMappings = createUserRoleMappings;
function sanitizeUserResponse(user) {
    const { mat_khau, reset_pass_token, otp_secret } = user, sanitized = __rest(user, ["mat_khau", "reset_pass_token", "otp_secret"]);
    return sanitized;
}
exports.sanitizeUserResponse = sanitizeUserResponse;
//# sourceMappingURL=users.helpers.js.map