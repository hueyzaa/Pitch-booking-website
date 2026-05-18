"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePersonalRoleDto = exports.SetFirebaseTokenDto = exports.VerifyOtpDto = exports.LogOutDto = exports.ForgotPassDto = exports.ResetPasswordDto = exports.LoginUserDto = void 0;
const is_not_empty_validator_1 = require("../../validators/is-not-empty.validator");
const is_valid_password_validator_1 = require("../../validators/is-valid-password.validator");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class LoginUserDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tài khoản không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Tài khoản phải là chuỗi' }),
    (0, class_validator_1.Matches)(/^([a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*|[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)+|(\+?\d{9,15}|0\d{9,10}))$/, {
        message: 'Tài khoản không đúng định dạng (VD: user_name01 hoặc username01 hoặc email@domain.com hoặc số điện thoại)',
    }),
    (0, class_validator_1.MinLength)(4, { message: 'Tài khoản phải có ít nhất 4 ký tự' }),
    (0, class_validator_1.MaxLength)(32, { message: 'Tài khoản không được vượt quá 32 ký tự' }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value.includes('@')) {
            return value.trim().toLowerCase();
        }
        return value.trim().toUpperCase();
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "tai_khoan", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mật khẩu không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Mật khẩu phải là chuỗi' }),
    (0, class_validator_1.MinLength)(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' }),
    (0, class_validator_1.MaxLength)(32, { message: 'Mật khẩu không được vượt quá 32 ký tự' }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "mat_khau", void 0);
exports.LoginUserDto = LoginUserDto;
class ResetPasswordDto {
}
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token_reset_pass", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_valid_password_validator_1.IsValidPassword),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "mat_khau_moi", void 0);
exports.ResetPasswordDto = ResetPasswordDto;
class ForgotPassDto {
}
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], ForgotPassDto.prototype, "tai_khoan", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], ForgotPassDto.prototype, "email", void 0);
exports.ForgotPassDto = ForgotPassDto;
class LogOutDto {
}
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], LogOutDto.prototype, "nguoi_dung_id", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], LogOutDto.prototype, "device_id", void 0);
exports.LogOutDto = LogOutDto;
class VerifyOtpDto {
}
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "otp", void 0);
exports.VerifyOtpDto = VerifyOtpDto;
class SetFirebaseTokenDto {
}
exports.SetFirebaseTokenDto = SetFirebaseTokenDto;
class UpdatePersonalRoleDto {
}
exports.UpdatePersonalRoleDto = UpdatePersonalRoleDto;
//# sourceMappingURL=auth.dto.js.map