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
exports.UpdateSanDto = exports.CreateSanDto = void 0;
const class_validator_1 = require("class-validator");
class CreateSanDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên sân không được để trống' }),
    __metadata("design:type", String)
], CreateSanDto.prototype, "ten_san", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Loại sân không được để trống' }),
    __metadata("design:type", Number)
], CreateSanDto.prototype, "id_loai_san", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSanDto.prototype, "dia_chi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSanDto.prototype, "tinh_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSanDto.prototype, "xa_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateSanDto.prototype, "tien_ich", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSanDto.prototype, "anh_chinh", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSanDto.prototype, "anh_chi_tiet", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSanDto.prototype, "mo_ta", void 0);
exports.CreateSanDto = CreateSanDto;
class UpdateSanDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên sân không được để trống' }),
    __metadata("design:type", String)
], UpdateSanDto.prototype, "ten_san", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Loại sân không được để trống' }),
    __metadata("design:type", Number)
], UpdateSanDto.prototype, "id_loai_san", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSanDto.prototype, "dia_chi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateSanDto.prototype, "tinh_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateSanDto.prototype, "xa_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateSanDto.prototype, "tien_ich", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSanDto.prototype, "anh_chinh", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSanDto.prototype, "anh_chi_tiet", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSanDto.prototype, "mo_ta", void 0);
exports.UpdateSanDto = UpdateSanDto;
//# sourceMappingURL=san.dto.js.map