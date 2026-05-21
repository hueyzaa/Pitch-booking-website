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
exports.UpdateBangGiaDto = exports.CreateBangGiaDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateBangGiaDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên bảng giá không được để trống' }),
    __metadata("design:type", String)
], CreateBangGiaDto.prototype, "ten_bang_gia", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Đơn giá không được để trống' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Đơn giá phải là số' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateBangGiaDto.prototype, "don_gia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBangGiaDto.prototype, "gio_bat_dau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBangGiaDto.prototype, "gio_ket_thuc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Loại sân phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateBangGiaDto.prototype, "id_loai_san", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Đối tượng phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateBangGiaDto.prototype, "id_doi_tuong", void 0);
exports.CreateBangGiaDto = CreateBangGiaDto;
class UpdateBangGiaDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên bảng giá không được để trống' }),
    __metadata("design:type", String)
], UpdateBangGiaDto.prototype, "ten_bang_gia", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Đơn giá không được để trống' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Đơn giá phải là số' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateBangGiaDto.prototype, "don_gia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBangGiaDto.prototype, "gio_bat_dau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBangGiaDto.prototype, "gio_ket_thuc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Loại sân phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateBangGiaDto.prototype, "id_loai_san", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Đối tượng phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateBangGiaDto.prototype, "id_doi_tuong", void 0);
exports.UpdateBangGiaDto = UpdateBangGiaDto;
//# sourceMappingURL=bang-gia.dto.js.map