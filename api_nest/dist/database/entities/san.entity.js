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
exports.San = void 0;
const typeorm_1 = require("typeorm");
const loai_san_entity_1 = require("./loai-san.entity");
const tinh_entity_1 = require("./common/tinh.entity");
const xa_entity_1 = require("./common/xa.entity");
let San = class San {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], San.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ten_san', length: 255 }),
    __metadata("design:type", String)
], San.prototype, "ten_san", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_loai_san' }),
    __metadata("design:type", Number)
], San.prototype, "id_loai_san", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao' }),
    __metadata("design:type", Number)
], San.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], San.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], San.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], San.prototype, "ngay_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'dia_chi', length: 500, nullable: true }),
    __metadata("design:type", String)
], San.prototype, "dia_chi", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'tinh_id', nullable: true }),
    __metadata("design:type", Number)
], San.prototype, "tinh_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'xa_id', nullable: true }),
    __metadata("design:type", Number)
], San.prototype, "xa_id", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { name: 'tien_ich', nullable: true }),
    __metadata("design:type", Array)
], San.prototype, "tien_ich", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'anh_chinh', nullable: true }),
    __metadata("design:type", String)
], San.prototype, "anh_chinh", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'anh_chi_tiet', nullable: true }),
    __metadata("design:type", String)
], San.prototype, "anh_chi_tiet", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'mo_ta', nullable: true }),
    __metadata("design:type", String)
], San.prototype, "mo_ta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => loai_san_entity_1.LoaiSan, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_loai_san' }),
    __metadata("design:type", loai_san_entity_1.LoaiSan)
], San.prototype, "loai_san", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tinh_entity_1.Tinh, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'tinh_id' }),
    __metadata("design:type", tinh_entity_1.Tinh)
], San.prototype, "tinh", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => xa_entity_1.Xa, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'xa_id' }),
    __metadata("design:type", xa_entity_1.Xa)
], San.prototype, "xa", void 0);
San = __decorate([
    (0, typeorm_1.Entity)('san', { synchronize: true })
], San);
exports.San = San;
//# sourceMappingURL=san.entity.js.map