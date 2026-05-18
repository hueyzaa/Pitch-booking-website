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
exports.ThongBao = void 0;
const typeorm_1 = require("typeorm");
const nguoi_dung_entity_1 = require("../auth/nguoi-dung.entity");
let ThongBao = class ThongBao {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], ThongBao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'da_xem' }),
    __metadata("design:type", Number)
], ThongBao.prototype, "da_xem", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_dung_id' }),
    __metadata("design:type", Number)
], ThongBao.prototype, "nguoi_dung_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao' }),
    __metadata("design:type", Number)
], ThongBao.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ThongBao.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], ThongBao.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ThongBao.prototype, "ngay_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'tieu_de', length: 255 }),
    __metadata("design:type", String)
], ThongBao.prototype, "tieu_de", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'noi_dung', length: 255 }),
    __metadata("design:type", String)
], ThongBao.prototype, "noi_dung", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nguoi_dung_entity_1.NguoiDung, (nguoi_dung) => nguoi_dung.thong_baos, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'nguoi_dung_id', referencedColumnName: 'id' }]),
    __metadata("design:type", nguoi_dung_entity_1.NguoiDung)
], ThongBao.prototype, "nguoi_dung", void 0);
ThongBao = __decorate([
    (0, typeorm_1.Index)('nguoi_dung_id', ['nguoi_dung_id'], {}),
    (0, typeorm_1.Entity)('thong_bao', { synchronize: false })
], ThongBao);
exports.ThongBao = ThongBao;
//# sourceMappingURL=thong-bao.entity.js.map