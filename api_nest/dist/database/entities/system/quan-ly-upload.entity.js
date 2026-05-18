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
exports.QuanLyUpload = void 0;
const typeorm_1 = require("typeorm");
const quan_ly_upload_permission_entity_1 = require("./quan-ly-upload-permission.entity");
let QuanLyUpload = class QuanLyUpload {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], QuanLyUpload.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'original_name', length: 255 }),
    __metadata("design:type", String)
], QuanLyUpload.prototype, "original_name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'file_path', length: 255 }),
    __metadata("design:type", String)
], QuanLyUpload.prototype, "file_path", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'mime_type', length: 255 }),
    __metadata("design:type", String)
], QuanLyUpload.prototype, "mime_type", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'loai_file', length: 10 }),
    __metadata("design:type", String)
], QuanLyUpload.prototype, "loai_file", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'destination', length: 255 }),
    __metadata("design:type", String)
], QuanLyUpload.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'file_name', length: 255 }),
    __metadata("design:type", String)
], QuanLyUpload.prototype, "file_name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'path', length: 255 }),
    __metadata("design:type", String)
], QuanLyUpload.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'size' }),
    __metadata("design:type", Number)
], QuanLyUpload.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'file_type', length: 255 }),
    __metadata("design:type", String)
], QuanLyUpload.prototype, "file_type", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_tao' }),
    __metadata("design:type", Number)
], QuanLyUpload.prototype, "nguoi_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], QuanLyUpload.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nguoi_cap_nhat' }),
    __metadata("design:type", Number)
], QuanLyUpload.prototype, "nguoi_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], QuanLyUpload.prototype, "ngay_cap_nhat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quan_ly_upload_permission_entity_1.QuanLyUploadPermission, (permission) => permission.file),
    __metadata("design:type", Array)
], QuanLyUpload.prototype, "permissions", void 0);
QuanLyUpload = __decorate([
    (0, typeorm_1.Entity)('quan_ly_upload', { synchronize: false })
], QuanLyUpload);
exports.QuanLyUpload = QuanLyUpload;
//# sourceMappingURL=quan-ly-upload.entity.js.map