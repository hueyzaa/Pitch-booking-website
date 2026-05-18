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
exports.Xa = void 0;
const typeorm_1 = require("typeorm");
const nguoi_dung_entity_1 = require("../auth/nguoi-dung.entity");
let Xa = class Xa {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Xa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'code', length: 255 }),
    __metadata("design:type", String)
], Xa.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], Xa.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'full_name', length: 255 }),
    __metadata("design:type", String)
], Xa.prototype, "full_name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'slug', length: 255 }),
    __metadata("design:type", String)
], Xa.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'type', length: 255 }),
    __metadata("design:type", String)
], Xa.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'province_code', nullable: true }),
    __metadata("design:type", String)
], Xa.prototype, "province_code", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nguoi_dung_entity_1.NguoiDung, (nguoi_dung) => nguoi_dung.xa),
    __metadata("design:type", Array)
], Xa.prototype, "nguoi_dungs", void 0);
Xa = __decorate([
    (0, typeorm_1.Index)('fk_ward_province_code_1', ['province_code'], {}),
    (0, typeorm_1.Entity)('wards', { synchronize: false })
], Xa);
exports.Xa = Xa;
//# sourceMappingURL=xa.entity.js.map