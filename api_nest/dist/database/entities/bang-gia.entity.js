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
exports.BangGia = void 0;
const typeorm_1 = require("typeorm");
let BangGia = class BangGia {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], BangGia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ten_bang_gia', length: 255 }),
    __metadata("design:type", String)
], BangGia.prototype, "ten_bang_gia", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { name: 'don_gia', precision: 15, scale: 0 }),
    __metadata("design:type", Number)
], BangGia.prototype, "don_gia", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'gio_bat_dau', length: 10, nullable: true }),
    __metadata("design:type", String)
], BangGia.prototype, "gio_bat_dau", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'gio_ket_thuc', length: 10, nullable: true }),
    __metadata("design:type", String)
], BangGia.prototype, "gio_ket_thuc", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_loai_san', nullable: true }),
    __metadata("design:type", Number)
], BangGia.prototype, "id_loai_san", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_doi_tuong', nullable: true }),
    __metadata("design:type", Number)
], BangGia.prototype, "id_doi_tuong", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao' }),
    __metadata("design:type", Number)
], BangGia.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], BangGia.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], BangGia.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], BangGia.prototype, "ngay_cap_nhat", void 0);
BangGia = __decorate([
    (0, typeorm_1.Entity)('bang_gia', { synchronize: true })
], BangGia);
exports.BangGia = BangGia;
//# sourceMappingURL=bang-gia.entity.js.map