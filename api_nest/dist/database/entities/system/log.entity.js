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
exports.Log = void 0;
const typeorm_1 = require("typeorm");
let Log = class Log {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Log.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'device_id', nullable: true }),
    __metadata("design:type", String)
], Log.prototype, "device_id", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'user_id', nullable: true }),
    __metadata("design:type", String)
], Log.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'method', nullable: true }),
    __metadata("design:type", String)
], Log.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'request_url', nullable: true }),
    __metadata("design:type", String)
], Log.prototype, "request_url", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'request_param', nullable: true }),
    __metadata("design:type", String)
], Log.prototype, "request_param", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'request_query', nullable: true }),
    __metadata("design:type", String)
], Log.prototype, "request_query", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'request_header', nullable: true }),
    __metadata("design:type", String)
], Log.prototype, "request_header", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'request_body', nullable: true }),
    __metadata("design:type", String)
], Log.prototype, "request_body", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'response_code', nullable: true }),
    __metadata("design:type", String)
], Log.prototype, "response_code", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'response_body', nullable: true }),
    __metadata("design:type", String)
], Log.prototype, "response_body", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Log.prototype, "ngay_tao", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'ngay_cap_nhat',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Log.prototype, "ngay_cap_nhat", void 0);
Log = __decorate([
    (0, typeorm_1.Entity)('log', { synchronize: false })
], Log);
exports.Log = Log;
//# sourceMappingURL=log.entity.js.map