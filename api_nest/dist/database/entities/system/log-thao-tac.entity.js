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
exports.LogThaoTac = void 0;
const typeorm_1 = require("typeorm");
let LogThaoTac = class LogThaoTac {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], LogThaoTac.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'user_id', nullable: true }),
    __metadata("design:type", Number)
], LogThaoTac.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ho_ten', nullable: true, length: 255 }),
    __metadata("design:type", String)
], LogThaoTac.prototype, "ho_ten", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'url', nullable: true, length: 255 }),
    __metadata("design:type", String)
], LogThaoTac.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ip', nullable: true, length: 255 }),
    __metadata("design:type", String)
], LogThaoTac.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'mo_ta_url', nullable: true, length: 255 }),
    __metadata("design:type", String)
], LogThaoTac.prototype, "mo_ta_url", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'mo_ta', nullable: true, length: 255 }),
    __metadata("design:type", String)
], LogThaoTac.prototype, "mo_ta", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'phan_loai', nullable: true, length: 255 }),
    __metadata("design:type", String)
], LogThaoTac.prototype, "phan_loai", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'muc_do', nullable: true, length: 255 }),
    __metadata("design:type", String)
], LogThaoTac.prototype, "muc_do", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'noi_dung', nullable: true }),
    __metadata("design:type", String)
], LogThaoTac.prototype, "noi_dung", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ket_qua', nullable: true, length: 255 }),
    __metadata("design:type", String)
], LogThaoTac.prototype, "ket_qua", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], LogThaoTac.prototype, "ngay_tao", void 0);
LogThaoTac = __decorate([
    (0, typeorm_1.Index)('idx_log_truycap_user_id', ['user_id']),
    (0, typeorm_1.Entity)('log_thao_tac', { synchronize: true })
], LogThaoTac);
exports.LogThaoTac = LogThaoTac;
//# sourceMappingURL=log-thao-tac.entity.js.map