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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var QuanLyUploadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuanLyUploadService = void 0;
const contanst_1 = require("../configs/contanst");
const core_exception_1 = require("../core/exceptions/core.exception");
const quan_ly_upload_permission_entity_1 = require("../database/entities/system/quan-ly-upload-permission.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fs = require("fs");
const path = require("path");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const quan_ly_upload_entity_1 = require("../database/entities/system/quan-ly-upload.entity");
const helper_service_1 = require("../helper/helper.service");
let QuanLyUploadService = QuanLyUploadService_1 = class QuanLyUploadService {
    constructor(databaseService, quanLyUploadRepo, helperService, permissionRepo) {
        this.databaseService = databaseService;
        this.quanLyUploadRepo = quanLyUploadRepo;
        this.helperService = helperService;
        this.permissionRepo = permissionRepo;
        this.logger = new common_1.Logger(QuanLyUploadService_1.name);
    }
    create(createQuanLyUploadDto) {
        return this.quanLyUploadRepo.save(createQuanLyUploadDto);
    }
    async findAllWithPagination(filters, userId) {
        const res = await this.databaseService.findWithPagination(filters, this.quanLyUploadRepo
            .createQueryBuilder('quan_ly_upload')
            .leftJoin('quan_ly_upload.permissions', 'permissions')
            .where('quan_ly_upload.nguoi_tao = :userId', {
            userId,
        })
            .orWhere('permissions.user_id = :userId', { userId }), [
            'quan_ly_upload.id as id',
            'quan_ly_upload.original_name as original_name',
            'quan_ly_upload.file_path as file_path',
            'quan_ly_upload.mime_type as mime_type',
            'quan_ly_upload.destination as destination',
            'quan_ly_upload.file_name as file_name',
            'quan_ly_upload.path as path',
            'quan_ly_upload.size as size',
            'quan_ly_upload.file_type as file_type',
            'quan_ly_upload.loai_file as loai_file',
            'quan_ly_upload.nguoi_tao as nguoi_tao',
            'quan_ly_upload.ngay_tao as ngay_tao',
            'quan_ly_upload.nguoi_cap_nhat as nguoi_cap_nhat',
            'quan_ly_upload.ngay_cap_nhat as ngay_cap_nhat',
        ], [], 'quan_ly_upload.id');
        const fileIds = res.collection.map((c) => c.id);
        if (!fileIds.length) {
            return Object.assign(Object.assign({}, res), { collection: [] });
        }
        const permissions = await this.permissionRepo
            .createQueryBuilder('permission')
            .where('permission.file_id IN (:...fileIds)', {
            fileIds: fileIds,
        })
            .getMany();
        const groupedSanPhams = this.helperService.groupBy(permissions, 'file_id');
        const newCollection = res.collection.map((c) => {
            c.permissions = groupedSanPhams[c.id] || [];
            return c;
        });
        return Object.assign(Object.assign({}, res), { collection: newCollection });
    }
    findAll(options) {
        return this.quanLyUploadRepo.find(options);
    }
    async findOneByIdWithPermission(id, userId) {
        const file = await this.quanLyUploadRepo.findOne({
            where: { id },
            relations: ['permissions'],
        });
        if (!file)
            return null;
        if (file.nguoi_tao === userId)
            return file;
        const permission = await this.permissionRepo.findOneBy({
            file_id: id,
            user_id: userId,
        });
        if (!permission)
            throw new core_exception_1.HttpCoreException('Bạn không có quyền xem file này', contanst_1.HTTP_CODE.FORBIDDEN);
        return file;
    }
    findOneById(id) {
        return this.quanLyUploadRepo.findOneBy({ id: id });
    }
    findOneBy(where) {
        return this.quanLyUploadRepo.findOneBy(where);
    }
    async update(id, updateQuanLyUploadDto) {
        await this.quanLyUploadRepo.update(id, updateQuanLyUploadDto);
        return await this.findOneById(id);
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.quanLyUploadRepo.update(where, {});
    }
    async deleteBy(where) {
        const file = await this.findOneBy(where);
        if (file) {
            const filePath = path.join(process.cwd(), file.destination, file.file_name);
            try {
                if (!fs.existsSync(filePath)) {
                    throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.FILE_NOT_FOUND, contanst_1.HTTP_CODE.BAD_REQUEST);
                }
                fs.unlinkSync(filePath);
            }
            catch (error) {
                this.logger.error(error);
            }
        }
        this.quanLyUploadRepo.delete(where);
        return file;
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.quanLyUploadRepo.createQueryBuilder(), ['id as value', `CONCAT(id) as label`], []);
    }
    async moveToOldFolder(relativeFilePath) {
        if (!relativeFilePath)
            return;
        const oldLogoPath = path.join(relativeFilePath.replace(/^\//, ''));
        const oldDir = path.join('public', 'uploads_old');
        const oldLogoName = path.basename(oldLogoPath);
        const newLogoPath = path.join(oldDir, oldLogoName);
        try {
            await fs.promises.access(oldLogoPath);
            this.logger.log(`File tồn tại: ${oldLogoPath}`);
            await fs.promises.mkdir(oldDir, { recursive: true });
            await fs.promises.rename(oldLogoPath, newLogoPath);
            this.logger.log(`Đã di chuyển file sang: ${newLogoPath}`);
        }
        catch (err) {
            this.logger.warn(`Không thể di chuyển file (có thể không tồn tại): ${oldLogoPath}`);
        }
    }
    async grantViewPermission(fileId, userIds, currentUserId) {
        const file = await this.quanLyUploadRepo.findOneBy({ id: fileId });
        if (!file)
            throw new core_exception_1.HttpCoreException('File không tồn tại', contanst_1.HTTP_CODE.NOT_FOUND);
        if (file.nguoi_tao !== currentUserId) {
            throw new core_exception_1.HttpCoreException('Bạn không có quyền phân quyền file này', contanst_1.HTTP_CODE.FORBIDDEN);
        }
        const currentPermissions = await this.permissionRepo.find({
            where: { file_id: fileId },
        });
        const toDeleteIds = currentPermissions
            .filter((p) => p.user_id !== currentUserId && !userIds.includes(p.user_id))
            .map((p) => p.id);
        if (toDeleteIds.length) {
            await this.permissionRepo.delete(toDeleteIds);
        }
        for (const userId of userIds) {
            if (userId === currentUserId) {
                continue;
            }
            const existed = await this.permissionRepo.findOneBy({
                file_id: fileId,
                user_id: userId,
            });
            if (!existed) {
                await this.permissionRepo.save({ file_id: fileId, user_id: userId });
            }
        }
    }
};
QuanLyUploadService = QuanLyUploadService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(quan_ly_upload_entity_1.QuanLyUpload)),
    __param(3, (0, typeorm_1.InjectRepository)(quan_ly_upload_permission_entity_1.QuanLyUploadPermission)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository,
        helper_service_1.HelperService,
        typeorm_2.Repository])
], QuanLyUploadService);
exports.QuanLyUploadService = QuanLyUploadService;
//# sourceMappingURL=quan-ly-upload.service.js.map