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
exports.VaiTro = void 0;
const typeorm_1 = require("typeorm");
const nguoi_dung_entity_1 = require("./nguoi-dung.entity");
const nguoi_dung_vai_tro_entity_1 = require("./nguoi-dung-vai-tro.entity");
let VaiTro = class VaiTro {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], VaiTro.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ma_vai_tro', unique: true, length: 255 }),
    __metadata("design:type", String)
], VaiTro.prototype, "ma_vai_tro", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ten_vai_tro', length: 255 }),
    __metadata("design:type", String)
], VaiTro.prototype, "ten_vai_tro", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao' }),
    __metadata("design:type", Number)
], VaiTro.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], VaiTro.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], VaiTro.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], VaiTro.prototype, "ngay_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'trang_thai', default: () => "'1'" }),
    __metadata("design:type", Number)
], VaiTro.prototype, "trang_thai", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'phan_quyen' }),
    __metadata("design:type", String)
], VaiTro.prototype, "phan_quyen", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nguoi_dung_entity_1.NguoiDung, (nguoi_dung) => nguoi_dung.ma_vai_tro2),
    __metadata("design:type", Array)
], VaiTro.prototype, "nguoi_dungs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nguoi_dung_vai_tro_entity_1.NguoiDungVaiTro, (nguoi_dung_vai_tro) => nguoi_dung_vai_tro.vai_tro),
    __metadata("design:type", Array)
], VaiTro.prototype, "nguoi_dung_vai_tros", void 0);
VaiTro = __decorate([
    (0, typeorm_1.Index)('IDX_78a310d98cdb4b609df5fd3468', ['ma_vai_tro'], { unique: true }),
    (0, typeorm_1.Index)('idx_vt_ma_vai_tro', ['ma_vai_tro'], { unique: true }),
    (0, typeorm_1.Entity)('vai_tro', { synchronize: false })
], VaiTro);
exports.VaiTro = VaiTro;
//# sourceMappingURL=vai-tro.entity.js.map