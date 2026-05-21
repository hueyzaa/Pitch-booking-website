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
exports.UpdateTrangThaiSanDto = exports.CreateTrangThaiSanDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateTrangThaiSanDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Sân không được để trống' }),
    (0, class_validator_1.IsInt)({ message: 'ID Sân phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateTrangThaiSanDto.prototype, "id_san", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Ngày phải là chuỗi' }),
    __metadata("design:type", String)
], CreateTrangThaiSanDto.prototype, "ngay", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Giờ bắt đầu không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Giờ bắt đầu phải là chuỗi' }),
    __metadata("design:type", String)
], CreateTrangThaiSanDto.prototype, "gio_bat_dau", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Giờ kết thúc không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Giờ kết thúc phải là chuỗi' }),
    __metadata("design:type", String)
], CreateTrangThaiSanDto.prototype, "gio_ket_thuc", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Trạng thái không được để trống' }),
    (0, class_validator_1.IsInt)({ message: 'Trạng thái phải là số nguyên' }),
    (0, class_validator_1.IsIn)([0, 1, 2], { message: 'Trạng thái chỉ nhận giá trị 0 (Trống), 1 (Đã đặt) hoặc 2 (Bảo trì)' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateTrangThaiSanDto.prototype, "trang_thai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Ghi chú phải là chuỗi' }),
    __metadata("design:type", String)
], CreateTrangThaiSanDto.prototype, "ghi_chu", void 0);
exports.CreateTrangThaiSanDto = CreateTrangThaiSanDto;
class UpdateTrangThaiSanDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Sân phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateTrangThaiSanDto.prototype, "id_san", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Ngày phải là chuỗi' }),
    __metadata("design:type", String)
], UpdateTrangThaiSanDto.prototype, "ngay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Giờ bắt đầu phải là chuỗi' }),
    __metadata("design:type", String)
], UpdateTrangThaiSanDto.prototype, "gio_bat_dau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Giờ kết thúc phải là chuỗi' }),
    __metadata("design:type", String)
], UpdateTrangThaiSanDto.prototype, "gio_ket_thuc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Trạng thái phải là số nguyên' }),
    (0, class_validator_1.IsIn)([0, 1, 2], { message: 'Trạng thái chỉ nhận giá trị 0 (Trống), 1 (Đã đặt) hoặc 2 (Bảo trì)' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateTrangThaiSanDto.prototype, "trang_thai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Ghi chú phải là chuỗi' }),
    __metadata("design:type", String)
], UpdateTrangThaiSanDto.prototype, "ghi_chu", void 0);
exports.UpdateTrangThaiSanDto = UpdateTrangThaiSanDto;
//# sourceMappingURL=trang-thai-san.dto.js.map