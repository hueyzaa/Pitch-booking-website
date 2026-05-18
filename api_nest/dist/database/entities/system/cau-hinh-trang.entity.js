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
exports.CauHinhTrang = void 0;
const typeorm_1 = require("typeorm");
let CauHinhTrang = class CauHinhTrang {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], CauHinhTrang.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'key', unique: true, length: 255 }),
    __metadata("design:type", String)
], CauHinhTrang.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'value', nullable: true }),
    __metadata("design:type", String)
], CauHinhTrang.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'mo_ta', nullable: true, length: 500 }),
    __metadata("design:type", String)
], CauHinhTrang.prototype, "mo_ta", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'loai', default: 'text', length: 50 }),
    __metadata("design:type", String)
], CauHinhTrang.prototype, "loai", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao', nullable: true }),
    __metadata("design:type", Number)
], CauHinhTrang.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CauHinhTrang.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat', nullable: true }),
    __metadata("design:type", Number)
], CauHinhTrang.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], CauHinhTrang.prototype, "ngay_cap_nhat", void 0);
CauHinhTrang = __decorate([
    (0, typeorm_1.Entity)('cau_hinh_trang')
], CauHinhTrang);
exports.CauHinhTrang = CauHinhTrang;
//# sourceMappingURL=cau-hinh-trang.entity.js.map