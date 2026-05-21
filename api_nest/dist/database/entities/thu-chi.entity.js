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
exports.ThuChi = void 0;
const typeorm_1 = require("typeorm");
let ThuChi = class ThuChi {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], ThuChi.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { name: 'loai_giao_dich', comment: '1=Thu, 0=Chi' }),
    __metadata("design:type", Number)
], ThuChi.prototype, "loai_giao_dich", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'danh_muc', length: 255 }),
    __metadata("design:type", String)
], ThuChi.prototype, "danh_muc", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { name: 'so_tien', precision: 15, scale: 0 }),
    __metadata("design:type", Number)
], ThuChi.prototype, "so_tien", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'ngay_giao_dich' }),
    __metadata("design:type", String)
], ThuChi.prototype, "ngay_giao_dich", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'mo_ta', length: 500, nullable: true }),
    __metadata("design:type", String)
], ThuChi.prototype, "mo_ta", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_khach_hang', nullable: true }),
    __metadata("design:type", Number)
], ThuChi.prototype, "id_khach_hang", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_san', nullable: true }),
    __metadata("design:type", Number)
], ThuChi.prototype, "id_san", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_dat_san', nullable: true }),
    __metadata("design:type", Number)
], ThuChi.prototype, "id_dat_san", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ghi_chu', length: 500, nullable: true }),
    __metadata("design:type", String)
], ThuChi.prototype, "ghi_chu", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao' }),
    __metadata("design:type", Number)
], ThuChi.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ThuChi.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], ThuChi.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ThuChi.prototype, "ngay_cap_nhat", void 0);
ThuChi = __decorate([
    (0, typeorm_1.Entity)('thu_chi', { synchronize: true })
], ThuChi);
exports.ThuChi = ThuChi;
//# sourceMappingURL=thu-chi.entity.js.map