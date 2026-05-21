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
exports.UpdateDoiTuongDto = exports.CreateDoiTuongDto = void 0;
const class_validator_1 = require("class-validator");
class CreateDoiTuongDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên đối tượng không được để trống' }),
    __metadata("design:type", String)
], CreateDoiTuongDto.prototype, "ten_doi_tuong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Phần trăm giảm giá phải là số nguyên' }),
    (0, class_validator_1.Min)(0, { message: 'Phần trăm giảm giá tối thiểu là 0' }),
    (0, class_validator_1.Max)(100, { message: 'Phần trăm giảm giá tối đa là 100' }),
    __metadata("design:type", Number)
], CreateDoiTuongDto.prototype, "phan_tram_giam_gia", void 0);
exports.CreateDoiTuongDto = CreateDoiTuongDto;
class UpdateDoiTuongDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên đối tượng không được để trống' }),
    __metadata("design:type", String)
], UpdateDoiTuongDto.prototype, "ten_doi_tuong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Phần trăm giảm giá phải là số nguyên' }),
    (0, class_validator_1.Min)(0, { message: 'Phần trăm giảm giá tối thiểu là 0' }),
    (0, class_validator_1.Max)(100, { message: 'Phần trăm giảm giá tối đa là 100' }),
    __metadata("design:type", Number)
], UpdateDoiTuongDto.prototype, "phan_tram_giam_gia", void 0);
exports.UpdateDoiTuongDto = UpdateDoiTuongDto;
//# sourceMappingURL=doi-tuong.dto.js.map