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
exports.PublicCreateDanhGiaDto = exports.UpdateDanhGiaDto = exports.CreateDanhGiaDto = void 0;
const class_validator_1 = require("class-validator");
class CreateDanhGiaDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDanhGiaDto.prototype, "id_khach_hang", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDanhGiaDto.prototype, "id_san", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateDanhGiaDto.prototype, "so_sao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDanhGiaDto.prototype, "noi_dung", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDanhGiaDto.prototype, "trang_thai", void 0);
exports.CreateDanhGiaDto = CreateDanhGiaDto;
class UpdateDanhGiaDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateDanhGiaDto.prototype, "id_khach_hang", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateDanhGiaDto.prototype, "id_san", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], UpdateDanhGiaDto.prototype, "so_sao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDanhGiaDto.prototype, "noi_dung", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateDanhGiaDto.prototype, "trang_thai", void 0);
exports.UpdateDanhGiaDto = UpdateDanhGiaDto;
class PublicCreateDanhGiaDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tài khoản không được bỏ trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicCreateDanhGiaDto.prototype, "tai_khoan", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Sân không được bỏ trống' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PublicCreateDanhGiaDto.prototype, "id_san", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Số sao không được bỏ trống' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'Số sao tối thiểu là 1' }),
    (0, class_validator_1.Max)(5, { message: 'Số sao tối đa là 5' }),
    __metadata("design:type", Number)
], PublicCreateDanhGiaDto.prototype, "so_sao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicCreateDanhGiaDto.prototype, "noi_dung", void 0);
exports.PublicCreateDanhGiaDto = PublicCreateDanhGiaDto;
//# sourceMappingURL=danh-gia.dto.js.map