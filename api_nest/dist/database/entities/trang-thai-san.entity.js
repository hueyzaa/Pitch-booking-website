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
exports.TrangThaiSan = void 0;
const typeorm_1 = require("typeorm");
const san_entity_1 = require("./san.entity");
const dat_san_entity_1 = require("./dat-san.entity");
let TrangThaiSan = class TrangThaiSan {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], TrangThaiSan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_san' }),
    __metadata("design:type", Number)
], TrangThaiSan.prototype, "id_san", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_dat_san', nullable: true }),
    __metadata("design:type", Number)
], TrangThaiSan.prototype, "id_dat_san", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'ngay' }),
    __metadata("design:type", String)
], TrangThaiSan.prototype, "ngay", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { name: 'gio_bat_dau' }),
    __metadata("design:type", String)
], TrangThaiSan.prototype, "gio_bat_dau", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { name: 'gio_ket_thuc' }),
    __metadata("design:type", String)
], TrangThaiSan.prototype, "gio_ket_thuc", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', {
        name: 'trang_thai',
        default: 0,
        comment: '0=Trống, 1=Đã đặt, 2=Bảo trì',
    }),
    __metadata("design:type", Number)
], TrangThaiSan.prototype, "trang_thai", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ghi_chu', length: 500, nullable: true }),
    __metadata("design:type", String)
], TrangThaiSan.prototype, "ghi_chu", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao' }),
    __metadata("design:type", Number)
], TrangThaiSan.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], TrangThaiSan.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], TrangThaiSan.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], TrangThaiSan.prototype, "ngay_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => san_entity_1.San, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_san' }),
    __metadata("design:type", san_entity_1.San)
], TrangThaiSan.prototype, "san", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dat_san_entity_1.DatSan, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_dat_san' }),
    __metadata("design:type", dat_san_entity_1.DatSan)
], TrangThaiSan.prototype, "dat_san", void 0);
TrangThaiSan = __decorate([
    (0, typeorm_1.Entity)('trang_thai_san', { synchronize: true })
], TrangThaiSan);
exports.TrangThaiSan = TrangThaiSan;
//# sourceMappingURL=trang-thai-san.entity.js.map