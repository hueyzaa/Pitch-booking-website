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
exports.UpdateThuChiDto = exports.CreateThuChiDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateThuChiDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Loại giao dịch không được để trống' }),
    (0, class_validator_1.IsInt)({ message: 'Loại giao dịch phải là số nguyên' }),
    (0, class_validator_1.IsIn)([0, 1], {
        message: 'Loại giao dịch chỉ nhận giá trị 0 (Chi) hoặc 1 (Thu)',
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateThuChiDto.prototype, "loai_giao_dich", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Danh mục không được để trống' }),
    __metadata("design:type", String)
], CreateThuChiDto.prototype, "danh_muc", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Số tiền không được để trống' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Số tiền phải là số' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateThuChiDto.prototype, "so_tien", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày giao dịch không được để trống' }),
    __metadata("design:type", String)
], CreateThuChiDto.prototype, "ngay_giao_dich", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateThuChiDto.prototype, "mo_ta", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Khách hàng phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateThuChiDto.prototype, "id_khach_hang", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Sân phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateThuChiDto.prototype, "id_san", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateThuChiDto.prototype, "ghi_chu", void 0);
exports.CreateThuChiDto = CreateThuChiDto;
class UpdateThuChiDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Loại giao dịch phải là số nguyên' }),
    (0, class_validator_1.IsIn)([0, 1], {
        message: 'Loại giao dịch chỉ nhận giá trị 0 (Chi) hoặc 1 (Thu)',
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateThuChiDto.prototype, "loai_giao_dich", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateThuChiDto.prototype, "danh_muc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Số tiền phải là số' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateThuChiDto.prototype, "so_tien", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateThuChiDto.prototype, "ngay_giao_dich", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateThuChiDto.prototype, "mo_ta", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Khách hàng phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateThuChiDto.prototype, "id_khach_hang", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ID Sân phải là số nguyên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateThuChiDto.prototype, "id_san", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateThuChiDto.prototype, "ghi_chu", void 0);
exports.UpdateThuChiDto = UpdateThuChiDto;
//# sourceMappingURL=thu-chi.dto.js.map