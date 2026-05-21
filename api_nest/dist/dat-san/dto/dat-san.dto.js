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
exports.UpdateDatSanDto = exports.CreateDatSanDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateDatSanDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDatSanDto.prototype, "ma_dat_san", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateDatSanDto.prototype, "id_khach_hang", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateDatSanDto.prototype, "id_san", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'ngay_dat must be in format YYYY-MM-DD',
    }),
    __metadata("design:type", String)
], CreateDatSanDto.prototype, "ngay_dat", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{2}:\d{2}(:\d{2})?$/, {
        message: 'gio_bat_dau must be in format HH:mm',
    }),
    __metadata("design:type", String)
], CreateDatSanDto.prototype, "gio_bat_dau", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{2}:\d{2}(:\d{2})?$/, {
        message: 'gio_ket_thuc must be in format HH:mm',
    }),
    __metadata("design:type", String)
], CreateDatSanDto.prototype, "gio_ket_thuc", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDatSanDto.prototype, "tong_tien", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateDatSanDto.prototype, "id_doi_tuong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateDatSanDto.prototype, "phan_tram_giam_gia", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsIn)([0, 1, 2]),
    __metadata("design:type", Number)
], CreateDatSanDto.prototype, "trang_thai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDatSanDto.prototype, "ghi_chu", void 0);
exports.CreateDatSanDto = CreateDatSanDto;
class UpdateDatSanDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateDatSanDto.prototype, "id_khach_hang", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateDatSanDto.prototype, "id_san", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'ngay_dat must be in format YYYY-MM-DD',
    }),
    __metadata("design:type", String)
], UpdateDatSanDto.prototype, "ngay_dat", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{2}:\d{2}(:\d{2})?$/, {
        message: 'gio_bat_dau must be in format HH:mm',
    }),
    __metadata("design:type", String)
], UpdateDatSanDto.prototype, "gio_bat_dau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{2}:\d{2}(:\d{2})?$/, {
        message: 'gio_ket_thuc must be in format HH:mm',
    }),
    __metadata("design:type", String)
], UpdateDatSanDto.prototype, "gio_ket_thuc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateDatSanDto.prototype, "tong_tien", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateDatSanDto.prototype, "id_doi_tuong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateDatSanDto.prototype, "phan_tram_giam_gia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsIn)([0, 1, 2]),
    __metadata("design:type", Number)
], UpdateDatSanDto.prototype, "trang_thai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDatSanDto.prototype, "ghi_chu", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDatSanDto.prototype, "ma_dat_san", void 0);
exports.UpdateDatSanDto = UpdateDatSanDto;
//# sourceMappingURL=dat-san.dto.js.map