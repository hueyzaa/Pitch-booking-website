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
exports.DatSan = void 0;
const typeorm_1 = require("typeorm");
const nguoi_dung_entity_1 = require("./auth/nguoi-dung.entity");
const san_entity_1 = require("./san.entity");
const doi_tuong_entity_1 = require("./doi-tuong.entity");
let DatSan = class DatSan {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], DatSan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ma_dat_san', unique: true, length: 50 }),
    __metadata("design:type", String)
], DatSan.prototype, "ma_dat_san", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_nguoi_dung' }),
    __metadata("design:type", Number)
], DatSan.prototype, "id_nguoi_dung", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_san' }),
    __metadata("design:type", Number)
], DatSan.prototype, "id_san", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_doi_tuong', nullable: true }),
    __metadata("design:type", Number)
], DatSan.prototype, "id_doi_tuong", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'phan_tram_giam_gia', default: 0 }),
    __metadata("design:type", Number)
], DatSan.prototype, "phan_tram_giam_gia", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'ngay_dat' }),
    __metadata("design:type", String)
], DatSan.prototype, "ngay_dat", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { name: 'gio_bat_dau' }),
    __metadata("design:type", String)
], DatSan.prototype, "gio_bat_dau", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { name: 'gio_ket_thuc' }),
    __metadata("design:type", String)
], DatSan.prototype, "gio_ket_thuc", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { name: 'tong_tien', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], DatSan.prototype, "tong_tien", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', {
        name: 'trang_thai',
        default: 0,
        comment: '0: Chưa thanh toán, 1: Đã thanh toán, 2: Đã hủy',
    }),
    __metadata("design:type", Number)
], DatSan.prototype, "trang_thai", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ghi_chu', length: 500, nullable: true }),
    __metadata("design:type", String)
], DatSan.prototype, "ghi_chu", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao' }),
    __metadata("design:type", Number)
], DatSan.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], DatSan.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], DatSan.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], DatSan.prototype, "ngay_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nguoi_dung_entity_1.NguoiDung, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_nguoi_dung' }),
    __metadata("design:type", nguoi_dung_entity_1.NguoiDung)
], DatSan.prototype, "nguoi_dung", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => san_entity_1.San, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_san' }),
    __metadata("design:type", san_entity_1.San)
], DatSan.prototype, "san", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doi_tuong_entity_1.DoiTuong, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id_doi_tuong' }),
    __metadata("design:type", doi_tuong_entity_1.DoiTuong)
], DatSan.prototype, "doi_tuong", void 0);
DatSan = __decorate([
    (0, typeorm_1.Entity)('dat_san', { synchronize: true })
], DatSan);
exports.DatSan = DatSan;
//# sourceMappingURL=dat-san.entity.js.map