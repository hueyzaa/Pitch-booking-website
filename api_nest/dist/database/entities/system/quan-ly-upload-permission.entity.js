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
exports.QuanLyUploadPermission = void 0;
const typeorm_1 = require("typeorm");
const quan_ly_upload_entity_1 = require("./quan-ly-upload.entity");
const nguoi_dung_entity_1 = require("../auth/nguoi-dung.entity");
let QuanLyUploadPermission = class QuanLyUploadPermission {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QuanLyUploadPermission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], QuanLyUploadPermission.prototype, "file_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], QuanLyUploadPermission.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quan_ly_upload_entity_1.QuanLyUpload),
    (0, typeorm_1.JoinColumn)({ name: 'file_id' }),
    __metadata("design:type", quan_ly_upload_entity_1.QuanLyUpload)
], QuanLyUploadPermission.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nguoi_dung_entity_1.NguoiDung),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", nguoi_dung_entity_1.NguoiDung)
], QuanLyUploadPermission.prototype, "user", void 0);
QuanLyUploadPermission = __decorate([
    (0, typeorm_1.Entity)('quan_ly_upload_permission', {
        synchronize: false,
    })
], QuanLyUploadPermission);
exports.QuanLyUploadPermission = QuanLyUploadPermission;
//# sourceMappingURL=quan-ly-upload-permission.entity.js.map