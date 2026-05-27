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
exports.KhachHang = void 0;
const typeorm_1 = require("typeorm");
const doi_tuong_entity_1 = require("./doi-tuong.entity");
let KhachHang = class KhachHang {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], KhachHang.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ho_va_ten', length: 255 }),
    __metadata("design:type", String)
], KhachHang.prototype, "ho_va_ten", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'so_dien_thoai', length: 50 }),
    __metadata("design:type", String)
], KhachHang.prototype, "so_dien_thoai", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'email', length: 255, nullable: true }),
    __metadata("design:type", String)
], KhachHang.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'dia_chi', nullable: true }),
    __metadata("design:type", String)
], KhachHang.prototype, "dia_chi", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'ngay_sinh', nullable: true }),
    __metadata("design:type", Date)
], KhachHang.prototype, "ngay_sinh", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'gioi_tinh', nullable: true, comment: '0: Nữ | 1:Nam' }),
    __metadata("design:type", Number)
], KhachHang.prototype, "gioi_tinh", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_doi_tuong' }),
    __metadata("design:type", Number)
], KhachHang.prototype, "id_doi_tuong", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ho', length: 255, nullable: true }),
    __metadata("design:type", String)
], KhachHang.prototype, "ho", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ten', length: 255, nullable: true }),
    __metadata("design:type", String)
], KhachHang.prototype, "ten", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'tai_khoan', length: 255, nullable: true }),
    __metadata("design:type", String)
], KhachHang.prototype, "tai_khoan", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'mat_khau', length: 255, nullable: true }),
    __metadata("design:type", String)
], KhachHang.prototype, "mat_khau", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'tinh_id', nullable: true }),
    __metadata("design:type", Number)
], KhachHang.prototype, "tinh_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'xa_id', nullable: true }),
    __metadata("design:type", Number)
], KhachHang.prototype, "xa_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao' }),
    __metadata("design:type", Number)
], KhachHang.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], KhachHang.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], KhachHang.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], KhachHang.prototype, "ngay_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doi_tuong_entity_1.DoiTuong, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_doi_tuong' }),
    __metadata("design:type", doi_tuong_entity_1.DoiTuong)
], KhachHang.prototype, "doi_tuong", void 0);
KhachHang = __decorate([
    (0, typeorm_1.Entity)('khach_hang', { synchronize: true })
], KhachHang);
exports.KhachHang = KhachHang;
//# sourceMappingURL=khach-hang.entity.js.map