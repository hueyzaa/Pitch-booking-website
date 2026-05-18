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
exports.NguoiDung = void 0;
const typeorm_1 = require("typeorm");
const nguoi_dung_thiet_bi_entity_1 = require("./nguoi-dung-thiet-bi.entity");
const thong_bao_entity_1 = require("../system/thong-bao.entity");
const tinh_entity_1 = require("../common/tinh.entity");
const vai_tro_entity_1 = require("./vai-tro.entity");
const xa_entity_1 = require("../common/xa.entity");
const nguoi_dung_vai_tro_entity_1 = require("./nguoi-dung-vai-tro.entity");
let NguoiDung = class NguoiDung {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], NguoiDung.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao' }),
    __metadata("design:type", Number)
], NguoiDung.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NguoiDung.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], NguoiDung.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], NguoiDung.prototype, "ngay_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'tai_khoan', length: 255 }),
    __metadata("design:type", String)
], NguoiDung.prototype, "tai_khoan", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'mat_khau', length: 255 }),
    __metadata("design:type", String)
], NguoiDung.prototype, "mat_khau", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'so_dien_thoai', length: 255 }),
    __metadata("design:type", String)
], NguoiDung.prototype, "so_dien_thoai", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'email',
        nullable: true,
        unique: true,
        length: 255,
    }),
    __metadata("design:type", String)
], NguoiDung.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ma_vai_tro', length: 255 }),
    __metadata("design:type", String)
], NguoiDung.prototype, "ma_vai_tro", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'reset_pass_token', nullable: true, length: 255 }),
    __metadata("design:type", String)
], NguoiDung.prototype, "reset_pass_token", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'avatar', length: 255, nullable: true }),
    __metadata("design:type", String)
], NguoiDung.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'ho' }),
    __metadata("design:type", String)
], NguoiDung.prototype, "ho", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'ten' }),
    __metadata("design:type", String)
], NguoiDung.prototype, "ten", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'ho_va_ten' }),
    __metadata("design:type", String)
], NguoiDung.prototype, "ho_va_ten", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'ngay_sinh' }),
    __metadata("design:type", Date)
], NguoiDung.prototype, "ngay_sinh", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'gioi_tinh', comment: '0: Nữ | 1:Nam' }),
    __metadata("design:type", Number)
], NguoiDung.prototype, "gioi_tinh", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'dia_chi' }),
    __metadata("design:type", String)
], NguoiDung.prototype, "dia_chi", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'tinh_id' }),
    __metadata("design:type", Number)
], NguoiDung.prototype, "tinh_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'xa_id' }),
    __metadata("design:type", Number)
], NguoiDung.prototype, "xa_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', {
        name: 'trang_thai',
        comment: '0: Bị khoá | 1: Không bị khoá',
        default: () => "'1'",
    }),
    __metadata("design:type", Number)
], NguoiDung.prototype, "trang_thai", void 0);
__decorate([
    (0, typeorm_1.Column)('int', {
        name: 'need_change_password',
        comment: '0: Không cần đổi | 1: Bắt buộc đổi | 2: Cần thay đổi',
        default: () => "'1'",
    }),
    __metadata("design:type", Number)
], NguoiDung.prototype, "need_change_password", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'last_password_change', nullable: true }),
    __metadata("design:type", Date)
], NguoiDung.prototype, "last_password_change", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'otp_secret', length: 255, nullable: true }),
    __metadata("design:type", String)
], NguoiDung.prototype, "otp_secret", void 0);
__decorate([
    (0, typeorm_1.Column)('int', {
        name: 'is_otp_verify',
        comment: '0: Chưa xác thực | 1: Xác thực',
        default: () => "'0'",
    }),
    __metadata("design:type", Number)
], NguoiDung.prototype, "is_otp_verify", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'last_otp_verified', nullable: true }),
    __metadata("design:type", Date)
], NguoiDung.prototype, "last_otp_verified", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vai_tro_entity_1.VaiTro, (vai_tro) => vai_tro.nguoi_dungs, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'ma_vai_tro', referencedColumnName: 'ma_vai_tro' }]),
    __metadata("design:type", vai_tro_entity_1.VaiTro)
], NguoiDung.prototype, "ma_vai_tro2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tinh_entity_1.Tinh, (tinh) => tinh.nguoi_dungs, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'tinh_id', referencedColumnName: 'id' }]),
    __metadata("design:type", tinh_entity_1.Tinh)
], NguoiDung.prototype, "tinh", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => xa_entity_1.Xa, (xa) => xa.nguoi_dungs, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'xa_id', referencedColumnName: 'id' }]),
    __metadata("design:type", xa_entity_1.Xa)
], NguoiDung.prototype, "xa", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nguoi_dung_thiet_bi_entity_1.NguoiDungThietBi, (nguoi_dung_thiet_bi) => nguoi_dung_thiet_bi.nguoi_dung),
    __metadata("design:type", Array)
], NguoiDung.prototype, "nguoi_dung_thiet_bis", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => thong_bao_entity_1.ThongBao, (thong_bao) => thong_bao.nguoi_dung),
    __metadata("design:type", Array)
], NguoiDung.prototype, "thong_baos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nguoi_dung_vai_tro_entity_1.NguoiDungVaiTro, (nguoi_dung_vai_tro) => nguoi_dung_vai_tro.nguoi_dung),
    __metadata("design:type", Array)
], NguoiDung.prototype, "nguoi_dung_vai_tros", void 0);
NguoiDung = __decorate([
    (0, typeorm_1.Index)('fk_nguoi_dung_vai_tro_1', ['ma_vai_tro'], {}),
    (0, typeorm_1.Index)('idx_nd_email', ['email'], { unique: true }),
    (0, typeorm_1.Index)('idx_nd_taikhoan', ['tai_khoan'], { unique: true }),
    (0, typeorm_1.Index)('tinh_id', ['tinh_id'], {}),
    (0, typeorm_1.Index)('xa_id', ['xa_id'], {}),
    (0, typeorm_1.Entity)('nguoi_dung', { synchronize: false })
], NguoiDung);
exports.NguoiDung = NguoiDung;
//# sourceMappingURL=nguoi-dung.entity.js.map