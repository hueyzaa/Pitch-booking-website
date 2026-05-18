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
exports.DeletePermissionMiddleware = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const contanst_1 = require("../../configs/contanst");
let DeletePermissionMiddleware = class DeletePermissionMiddleware {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async use(req, res, next) {
        if (req.method !== 'DELETE') {
            return next();
        }
        const user = req.user;
        if (!user || !user.id || !user.ma_vai_tro) {
            throw new common_1.UnauthorizedException('Không tìm thấy thông tin người dùng');
        }
        if (user.ma_vai_tro === contanst_1.ROLE.ADMIN) {
            return next();
        }
        const resourceIdString = req.params.id;
        if (!resourceIdString) {
            throw new common_1.BadRequestException('Resource ID không tồn tại');
        }
        const resourceId = parseInt(resourceIdString, 10);
        if (isNaN(resourceId)) {
            throw new common_1.BadRequestException('Resource ID phải là số');
        }
        const baseUrlParts = req.originalUrl.split('/');
        const entitySlug = baseUrlParts[baseUrlParts.length - 2];
        if (!entitySlug) {
            throw new common_1.BadRequestException('Không xác định được entity từ URL');
        }
        const tableName = entitySlug.replace(/-/g, '_');
        try {
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            const result = await queryRunner.query(`SELECT nguoi_tao FROM ${tableName} WHERE id = ?`, [resourceId]);
            await queryRunner.release();
            if (!result || result.length === 0) {
                throw new common_1.NotFoundException(`Không tìm thấy bản ghi với ID ${resourceId} trong bảng ${tableName}.`);
            }
            const record = result[0];
            if (record.nguoi_tao !== user.id) {
                throw new common_1.ForbiddenException('Bạn không có quyền xóa. Chỉ người tạo hoặc admin mới có quyền');
            }
            next();
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Đã xảy ra lỗi khi kiểm tra quyền xóa.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
DeletePermissionMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], DeletePermissionMiddleware);
exports.DeletePermissionMiddleware = DeletePermissionMiddleware;
//# sourceMappingURL=delete-permission.middleware.js.map