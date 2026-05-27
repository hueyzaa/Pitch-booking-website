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
exports.UpdatePasswordDto = exports.ChangePasswordDto = exports.UpdateSelfDto = void 0;
const is_equal_to_decorator_1 = require("../../decorators/is-equal-to.decorator");
const is_email_validator_1 = require("../../validators/is-email.validator");
const is_not_empty_validator_1 = require("../../validators/is-not-empty.validator");
const is_phone_number_validator_1 = require("../../validators/is-phone-number.validator");
const is_valid_password_validator_1 = require("../../validators/is-valid-password.validator");
const class_validator_1 = require("class-validator");
class UpdateSelfDto {
}
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_email_validator_1.IsEmailCustom),
    __metadata("design:type", String)
], UpdateSelfDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], UpdateSelfDto.prototype, "ho", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], UpdateSelfDto.prototype, "ten", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Date)
], UpdateSelfDto.prototype, "ngay_sinh", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], UpdateSelfDto.prototype, "gioi_tinh", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], UpdateSelfDto.prototype, "dia_chi", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], UpdateSelfDto.prototype, "tinh_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], UpdateSelfDto.prototype, "huyen_id", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], UpdateSelfDto.prototype, "xa_id", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_phone_number_validator_1.IsPhoneNumber),
    __metadata("design:type", String)
], UpdateSelfDto.prototype, "so_dien_thoai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSelfDto.prototype, "anh_dai_dien", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSelfDto.prototype, "san_yeu_thich", void 0);
exports.UpdateSelfDto = UpdateSelfDto;
class ChangePasswordDto {
}
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_valid_password_validator_1.IsValidPassword),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "mat_khau_moi", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_valid_password_validator_1.IsValidPassword),
    (0, is_equal_to_decorator_1.IsEqualTo)('mat_khau_moi'),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "mat_khau_moi_xac_nhan", void 0);
exports.ChangePasswordDto = ChangePasswordDto;
class UpdatePasswordDto {
}
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_valid_password_validator_1.IsValidPassword),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "mat_khau_moi", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_valid_password_validator_1.IsValidPassword),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "mat_khau_moi_xac_nhan", void 0);
exports.UpdatePasswordDto = UpdatePasswordDto;
//# sourceMappingURL=profile.dto.js.map