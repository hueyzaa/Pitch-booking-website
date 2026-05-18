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
exports.NguoiDungThietBi = void 0;
const typeorm_1 = require("typeorm");
const nguoi_dung_entity_1 = require("./nguoi-dung.entity");
let NguoiDungThietBi = class NguoiDungThietBi {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], NguoiDungThietBi.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_dung_id' }),
    __metadata("design:type", Number)
], NguoiDungThietBi.prototype, "nguoi_dung_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao' }),
    __metadata("design:type", Number)
], NguoiDungThietBi.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NguoiDungThietBi.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], NguoiDungThietBi.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], NguoiDungThietBi.prototype, "ngay_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'access_token', nullable: true }),
    __metadata("design:type", String)
], NguoiDungThietBi.prototype, "access_token", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'refresh_token', nullable: true }),
    __metadata("design:type", String)
], NguoiDungThietBi.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'firebase_token', nullable: true }),
    __metadata("design:type", String)
], NguoiDungThietBi.prototype, "firebase_token", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'device_id', length: 255 }),
    __metadata("design:type", String)
], NguoiDungThietBi.prototype, "device_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nguoi_dung_entity_1.NguoiDung, (nguoi_dung) => nguoi_dung.nguoi_dung_thiet_bis, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'nguoi_dung_id', referencedColumnName: 'id' }]),
    __metadata("design:type", nguoi_dung_entity_1.NguoiDung)
], NguoiDungThietBi.prototype, "nguoi_dung", void 0);
NguoiDungThietBi = __decorate([
    (0, typeorm_1.Index)('fk_nguoi_dung_thiet_bi_nguoi_dung_1', ['nguoi_dung_id'], {}),
    (0, typeorm_1.Index)('idx_nguoi_dung_thiet_bi_unique_1', ['nguoi_dung_id', 'device_id'], {
        unique: true,
    }),
    (0, typeorm_1.Entity)('nguoi_dung_thiet_bi', { synchronize: false })
], NguoiDungThietBi);
exports.NguoiDungThietBi = NguoiDungThietBi;
//# sourceMappingURL=nguoi-dung-thiet-bi.entity.js.map