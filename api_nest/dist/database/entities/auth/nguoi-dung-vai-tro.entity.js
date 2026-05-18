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
exports.NguoiDungVaiTro = void 0;
const typeorm_1 = require("typeorm");
const nguoi_dung_entity_1 = require("./nguoi-dung.entity");
const vai_tro_entity_1 = require("./vai-tro.entity");
let NguoiDungVaiTro = class NguoiDungVaiTro {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], NguoiDungVaiTro.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_dung_id' }),
    __metadata("design:type", Number)
], NguoiDungVaiTro.prototype, "nguoi_dung_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'vai_tro_id' }),
    __metadata("design:type", Number)
], NguoiDungVaiTro.prototype, "vai_tro_id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ghi_chu', nullable: true, length: 255 }),
    __metadata("design:type", String)
], NguoiDungVaiTro.prototype, "ghi_chu", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao', nullable: true }),
    __metadata("design:type", Number)
], NguoiDungVaiTro.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], NguoiDungVaiTro.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_tao',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], NguoiDungVaiTro.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], NguoiDungVaiTro.prototype, "ngay_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nguoi_dung_entity_1.NguoiDung, (nguoi_dung) => nguoi_dung.nguoi_dung_vai_tros, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'nguoi_dung_id', referencedColumnName: 'id' }]),
    __metadata("design:type", nguoi_dung_entity_1.NguoiDung)
], NguoiDungVaiTro.prototype, "nguoi_dung", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vai_tro_entity_1.VaiTro, (vai_tro) => vai_tro.nguoi_dung_vai_tros, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'vai_tro_id', referencedColumnName: 'id' }]),
    __metadata("design:type", vai_tro_entity_1.VaiTro)
], NguoiDungVaiTro.prototype, "vai_tro", void 0);
NguoiDungVaiTro = __decorate([
    (0, typeorm_1.Index)('nguoi_dung_vai_tro_nguoi_dung_id', ['nguoi_dung_id'], {}),
    (0, typeorm_1.Index)('nguoi_dung_vai_tro_vai_tro_id', ['vai_tro_id'], {}),
    (0, typeorm_1.Entity)('nguoi_dung_vai_tro', { synchronize: false })
], NguoiDungVaiTro);
exports.NguoiDungVaiTro = NguoiDungVaiTro;
//# sourceMappingURL=nguoi-dung-vai-tro.entity.js.map