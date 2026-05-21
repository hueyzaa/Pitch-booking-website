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
exports.QuanLyGia = void 0;
const typeorm_1 = require("typeorm");
let QuanLyGia = class QuanLyGia {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], QuanLyGia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_san' }),
    __metadata("design:type", Number)
], QuanLyGia.prototype, "id_san", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_bang_gia', nullable: true }),
    __metadata("design:type", Number)
], QuanLyGia.prototype, "id_bang_gia", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_doi_tuong', nullable: true }),
    __metadata("design:type", Number)
], QuanLyGia.prototype, "id_doi_tuong", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        name: 'gia_theo_gio',
        precision: 15,
        scale: 0,
        default: 0,
    }),
    __metadata("design:type", Number)
], QuanLyGia.prototype, "gia_theo_gio", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { name: 'don_gia', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], QuanLyGia.prototype, "don_gia", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'ngay_bat_dau', nullable: true }),
    __metadata("design:type", String)
], QuanLyGia.prototype, "ngay_bat_dau", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'ngay_ket_thuc', nullable: true }),
    __metadata("design:type", String)
], QuanLyGia.prototype, "ngay_ket_thuc", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { name: 'trang_thai', default: 1 }),
    __metadata("design:type", Number)
], QuanLyGia.prototype, "trang_thai", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ghi_chu', length: 500, nullable: true }),
    __metadata("design:type", String)
], QuanLyGia.prototype, "ghi_chu", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao' }),
    __metadata("design:type", Number)
], QuanLyGia.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], QuanLyGia.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], QuanLyGia.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], QuanLyGia.prototype, "ngay_cap_nhat", void 0);
QuanLyGia = __decorate([
    (0, typeorm_1.Entity)('quan_ly_gia', { synchronize: true })
], QuanLyGia);
exports.QuanLyGia = QuanLyGia;
//# sourceMappingURL=quan-ly-gia.entity.js.map