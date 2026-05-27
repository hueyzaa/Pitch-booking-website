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
exports.ImportExcelResponseDto = exports.UpdateUsersDto = exports.CreateUsersDto = void 0;
const is_contain_special_character_for_user_validator_1 = require("../../validators/is-contain-special-character-for-user.validator");
const is_email_validator_1 = require("../../validators/is-email.validator");
const is_not_empty_validator_1 = require("../../validators/is-not-empty.validator");
const is_phone_number_validator_1 = require("../../validators/is-phone-number.validator");
const is_valid_password_validator_1 = require("../../validators/is-valid-password.validator");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateUsersDto {
}
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "ho", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "ten", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_contain_special_character_for_user_validator_1.IsNotContainSpecialCharacterForUser),
    (0, class_transformer_1.Transform)(({ value }) => value.toUpperCase()),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "tai_khoan", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_valid_password_validator_1.IsValidPassword),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "mat_khau", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_phone_number_validator_1.IsPhoneNumber),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "so_dien_thoai", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Date)
], CreateUsersDto.prototype, "ngay_sinh", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], CreateUsersDto.prototype, "gioi_tinh", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "dia_chi", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], CreateUsersDto.prototype, "tinh_id", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], CreateUsersDto.prototype, "xa_id", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_email_validator_1.IsEmailCustom),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.IsArray)({ message: 'vai_tro_ids phải là mảng' }),
    __metadata("design:type", Array)
], CreateUsersDto.prototype, "vai_tro_ids", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], CreateUsersDto.prototype, "trang_thai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUsersDto.prototype, "id_doi_tuong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "san_yeu_thich", void 0);
exports.CreateUsersDto = CreateUsersDto;
class UpdateUsersDto extends (0, mapped_types_1.PartialType)(CreateUsersDto) {
}
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "ho", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "ten", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_phone_number_validator_1.IsPhoneNumber),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "so_dien_thoai", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Date)
], UpdateUsersDto.prototype, "ngay_sinh", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], UpdateUsersDto.prototype, "gioi_tinh", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "dia_chi", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], UpdateUsersDto.prototype, "tinh_id", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], UpdateUsersDto.prototype, "xa_id", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    (0, class_validator_1.Validate)(is_email_validator_1.IsEmailCustom),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Validate)(is_not_empty_validator_1.IsNotEmptyCustom),
    __metadata("design:type", Number)
], UpdateUsersDto.prototype, "trang_thai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUsersDto.prototype, "id_doi_tuong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "san_yeu_thich", void 0);
exports.UpdateUsersDto = UpdateUsersDto;
class ImportExcelResponseDto {
}
exports.ImportExcelResponseDto = ImportExcelResponseDto;
//# sourceMappingURL=users.dto.js.map