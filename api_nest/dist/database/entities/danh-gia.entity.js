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
exports.DanhGia = void 0;
const typeorm_1 = require("typeorm");
const khach_hang_entity_1 = require("./khach-hang.entity");
const san_entity_1 = require("./san.entity");
let DanhGia = class DanhGia {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], DanhGia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_khach_hang' }),
    __metadata("design:type", Number)
], DanhGia.prototype, "id_khach_hang", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_san' }),
    __metadata("design:type", Number)
], DanhGia.prototype, "id_san", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'so_sao', default: 5 }),
    __metadata("design:type", Number)
], DanhGia.prototype, "so_sao", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'noi_dung', nullable: true }),
    __metadata("design:type", String)
], DanhGia.prototype, "noi_dung", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { name: 'trang_thai', default: 1 }),
    __metadata("design:type", Number)
], DanhGia.prototype, "trang_thai", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao', nullable: true }),
    __metadata("design:type", Number)
], DanhGia.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], DanhGia.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], DanhGia.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], DanhGia.prototype, "ngay_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => khach_hang_entity_1.KhachHang, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_khach_hang' }),
    __metadata("design:type", khach_hang_entity_1.KhachHang)
], DanhGia.prototype, "khach_hang", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => san_entity_1.San, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_san' }),
    __metadata("design:type", san_entity_1.San)
], DanhGia.prototype, "san", void 0);
DanhGia = __decorate([
    (0, typeorm_1.Entity)('danh_gia', { synchronize: true })
], DanhGia);
exports.DanhGia = DanhGia;
//# sourceMappingURL=danh-gia.entity.js.map