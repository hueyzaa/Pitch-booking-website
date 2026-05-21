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
exports.UpdateQuanLyGiaDto = exports.CreateQuanLyGiaDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateQuanLyGiaDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Sân không được để trống' }),
    (0, class_validator_1.IsInt)({ message: 'ID Sân phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateQuanLyGiaDto.prototype, "id_san", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Bảng giá phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateQuanLyGiaDto.prototype, "id_bang_gia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Loại đối tượng phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateQuanLyGiaDto.prototype, "id_doi_tuong", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Giá sân theo giờ không được để trống' }),
    (0, class_validator_1.IsInt)({ message: 'Giá sân theo giờ phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateQuanLyGiaDto.prototype, "gia_theo_gio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuanLyGiaDto.prototype, "ngay_bat_dau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuanLyGiaDto.prototype, "ngay_ket_thuc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Trạng thái phải là số nguyên' }),
    (0, class_validator_1.IsIn)([0, 1], { message: 'Trạng thái chỉ nhận giá trị 0 hoặc 1' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateQuanLyGiaDto.prototype, "trang_thai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuanLyGiaDto.prototype, "ghi_chu", void 0);
exports.CreateQuanLyGiaDto = CreateQuanLyGiaDto;
class UpdateQuanLyGiaDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Sân không được để trống' }),
    (0, class_validator_1.IsInt)({ message: 'ID Sân phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateQuanLyGiaDto.prototype, "id_san", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Bảng giá phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateQuanLyGiaDto.prototype, "id_bang_gia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Loại đối tượng phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateQuanLyGiaDto.prototype, "id_doi_tuong", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Giá sân theo giờ không được để trống' }),
    (0, class_validator_1.IsInt)({ message: 'Giá sân theo giờ phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateQuanLyGiaDto.prototype, "gia_theo_gio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateQuanLyGiaDto.prototype, "ngay_bat_dau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateQuanLyGiaDto.prototype, "ngay_ket_thuc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Trạng thái phải là số nguyên' }),
    (0, class_validator_1.IsIn)([0, 1], { message: 'Trạng thái chỉ nhận giá trị 0 hoặc 1' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateQuanLyGiaDto.prototype, "trang_thai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateQuanLyGiaDto.prototype, "ghi_chu", void 0);
exports.UpdateQuanLyGiaDto = UpdateQuanLyGiaDto;
//# sourceMappingURL=quan-ly-gia.dto.js.map