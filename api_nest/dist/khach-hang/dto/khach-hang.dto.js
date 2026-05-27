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
exports.UpdateKhachHangDto = exports.CreateKhachHangDto = void 0;
const class_validator_1 = require("class-validator");
class CreateKhachHangDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Họ và tên không được để trống' }),
    __metadata("design:type", String)
], CreateKhachHangDto.prototype, "ho_va_ten", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Số điện thoại không được để trống' }),
    __metadata("design:type", String)
], CreateKhachHangDto.prototype, "so_dien_thoai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không đúng định dạng' }),
    __metadata("design:type", String)
], CreateKhachHangDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKhachHangDto.prototype, "dia_chi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKhachHangDto.prototype, "ngay_sinh", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Giới tính không hợp lệ' }),
    __metadata("design:type", Number)
], CreateKhachHangDto.prototype, "gioi_tinh", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Đối tượng không được để trống' }),
    (0, class_validator_1.IsInt)({ message: 'ID Đối tượng phải là số nguyên' }),
    __metadata("design:type", Number)
], CreateKhachHangDto.prototype, "id_doi_tuong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKhachHangDto.prototype, "ho", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKhachHangDto.prototype, "ten", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKhachHangDto.prototype, "tai_khoan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKhachHangDto.prototype, "mat_khau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Tỉnh phải là số nguyên' }),
    __metadata("design:type", Number)
], CreateKhachHangDto.prototype, "tinh_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Xã phải là số nguyên' }),
    __metadata("design:type", Number)
], CreateKhachHangDto.prototype, "xa_id", void 0);
exports.CreateKhachHangDto = CreateKhachHangDto;
class UpdateKhachHangDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Họ và tên không được để trống' }),
    __metadata("design:type", String)
], UpdateKhachHangDto.prototype, "ho_va_ten", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Số điện thoại không được để trống' }),
    __metadata("design:type", String)
], UpdateKhachHangDto.prototype, "so_dien_thoai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không đúng định dạng' }),
    __metadata("design:type", String)
], UpdateKhachHangDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateKhachHangDto.prototype, "dia_chi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateKhachHangDto.prototype, "ngay_sinh", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Giới tính không hợp lệ' }),
    __metadata("design:type", Number)
], UpdateKhachHangDto.prototype, "gioi_tinh", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Đối tượng không được để trống' }),
    (0, class_validator_1.IsInt)({ message: 'ID Đối tượng phải là số nguyên' }),
    __metadata("design:type", Number)
], UpdateKhachHangDto.prototype, "id_doi_tuong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateKhachHangDto.prototype, "ho", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateKhachHangDto.prototype, "ten", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateKhachHangDto.prototype, "tai_khoan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateKhachHangDto.prototype, "mat_khau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Tỉnh phải là số nguyên' }),
    __metadata("design:type", Number)
], UpdateKhachHangDto.prototype, "tinh_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Xã phải là số nguyên' }),
    __metadata("design:type", Number)
], UpdateKhachHangDto.prototype, "xa_id", void 0);
exports.UpdateKhachHangDto = UpdateKhachHangDto;
//# sourceMappingURL=khach-hang.dto.js.map