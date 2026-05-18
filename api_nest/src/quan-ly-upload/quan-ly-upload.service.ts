import { CORE_COMMON_ERROR, HTTP_CODE } from '@configs/contanst';
import { HttpCoreException } from '@core/exceptions/core.exception';
import { QuanLyUploadPermission } from '@database/entities/system/quan-ly-upload-permission.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { QuanLyUpload } from '../database/entities/system/quan-ly-upload.entity';
import {
  CreateQuanLyUploadDto,
  UpdateQuanLyUploadDto,
} from './dto/quan-ly-upload.dto';
import { HelperService } from '@helper/helper.service';

@Injectable()
export class QuanLyUploadService {
  private readonly logger = new Logger(QuanLyUploadService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(QuanLyUpload)
    private quanLyUploadRepo: Repository<QuanLyUpload>,

    private readonly helperService: HelperService,

    @InjectRepository(QuanLyUploadPermission)
    private permissionRepo: Repository<QuanLyUploadPermission>,
  ) {}

  create(createQuanLyUploadDto: CreateQuanLyUploadDto) {
    return this.quanLyUploadRepo.save(createQuanLyUploadDto);
  }

  async findAllWithPagination(filters: FilterData, userId: number) {
    const res = await this.databaseService.findWithPagination(
      filters,
      this.quanLyUploadRepo
        .createQueryBuilder('quan_ly_upload')
        .leftJoin('quan_ly_upload.permissions', 'permissions')
        .where('quan_ly_upload.nguoi_tao = :userId', {
          userId,
        })
        .orWhere('permissions.user_id = :userId', { userId }),
      [
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
      ],
      [],
      'quan_ly_upload.id',
    );
    const fileIds = res.collection.map((c) => c.id);
    if (!fileIds.length) {
      return { ...res, collection: [] };
    }
    const permissions = await this.permissionRepo
      .createQueryBuilder('permission')
      .where('permission.file_id IN (:...fileIds)', {
        fileIds: fileIds,
      })
      .getMany();
    const groupedSanPhams = this.helperService.groupBy(permissions, 'file_id');
    // Map dữ liệu
    const newCollection = res.collection.map((c) => {
      c.permissions = groupedSanPhams[c.id] || [];
      return c;
    });
    return { ...res, collection: newCollection };
  }

  // findAllWithPagination(filters: FilterData) {
  //   return this.databaseService.findWithPagination(
  //     filters,
  //     this.quanLyUploadRepo.createQueryBuilder('quan_ly_upload'),
  //     [], // Colums need select
  //     [], // Columns Overwrite
  //   );
  // }

  findAll(options?: FindManyOptions<QuanLyUpload>) {
    return this.quanLyUploadRepo.find(options);
  }

  async findOneByIdWithPermission(id: number, userId: number) {
    const file = await this.quanLyUploadRepo.findOne({
      where: { id },
      relations: ['permissions'],
    });
    if (!file) return null;

    // Người tạo luôn có quyền
    if (file.nguoi_tao === userId) return file;

    // Kiểm tra quyền
    const permission = await this.permissionRepo.findOneBy({
      file_id: id,
      user_id: userId,
    });
    if (!permission)
      throw new HttpCoreException(
        'Bạn không có quyền xem file này',
        HTTP_CODE.FORBIDDEN,
      );

    return file;
  }

  findOneById(id: number) {
    return this.quanLyUploadRepo.findOneBy({ id: id });
  }

  findOneBy(
    where: FindOptionsWhere<QuanLyUpload> | FindOptionsWhere<QuanLyUpload>[],
  ) {
    return this.quanLyUploadRepo.findOneBy(where);
  }

  async update(id: number, updateQuanLyUploadDto: UpdateQuanLyUploadDto) {
    await this.quanLyUploadRepo.update(id, updateQuanLyUploadDto);
    return await this.findOneById(id);
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<QuanLyUpload>) {
    return this.quanLyUploadRepo.update(where, {});
  }

  async deleteBy(where: FindOptionsWhere<QuanLyUpload>) {
    const file = await this.findOneBy(where);
    if (file) {
      const filePath = path.join(
        process.cwd(),
        file.destination,
        file.file_name,
      );
      try {
        if (!fs.existsSync(filePath)) {
          throw new HttpCoreException(
            CORE_COMMON_ERROR.FILE_NOT_FOUND,
            HTTP_CODE.BAD_REQUEST,
          );
        }
        fs.unlinkSync(filePath);
      } catch (error) {
        this.logger.error(error);
      }
    }

    this.quanLyUploadRepo.delete(where);
    return file;
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.quanLyUploadRepo.createQueryBuilder(),
      ['id as value', `CONCAT(id) as label`], // Colums need select
      [], // Columns Overwrite
    );
  }

  /**
   * Nguyễn Trần Đăng Khoa
   * Di chuyển file cũ sang thư mục uploads_old
   * @param relativeFilePath Đường dẫn tương đối của file (ví dụ: "public/uploads/logo.png")
   */
  async moveToOldFolder(relativeFilePath: string): Promise<void> {
    if (!relativeFilePath) return;

    const oldLogoPath = path.join(relativeFilePath.replace(/^\//, ''));
    const oldDir = path.join('public', 'uploads_old');
    const oldLogoName = path.basename(oldLogoPath);
    const newLogoPath = path.join(oldDir, oldLogoName);

    try {
      // Kiểm tra file tồn tại
      await fs.promises.access(oldLogoPath);
      this.logger.log(`File tồn tại: ${oldLogoPath}`);

      // Tạo thư mục uploads_old nếu chưa có
      await fs.promises.mkdir(oldDir, { recursive: true });

      // Di chuyển file
      await fs.promises.rename(oldLogoPath, newLogoPath);
      this.logger.log(`Đã di chuyển file sang: ${newLogoPath}`);
    } catch (err) {
      this.logger.warn(
        `Không thể di chuyển file (có thể không tồn tại): ${oldLogoPath}`,
      );
    }
  }

  async grantViewPermission(
    fileId: number,
    userIds: number[],
    currentUserId: number,
  ) {
    const file = await this.quanLyUploadRepo.findOneBy({ id: fileId });
    if (!file)
      throw new HttpCoreException('File không tồn tại', HTTP_CODE.NOT_FOUND);

    // Chỉ chủ file mới được cấp quyền
    if (file.nguoi_tao !== currentUserId) {
      throw new HttpCoreException(
        'Bạn không có quyền phân quyền file này',
        HTTP_CODE.FORBIDDEN,
      );
    }

    // Lấy danh sách quyền hiện tại của file
    const currentPermissions = await this.permissionRepo.find({
      where: { file_id: fileId },
    });

    // Xác định các quyền cần xóa (không nằm trong userIds và không phải chủ file)
    const toDeleteIds = currentPermissions
      .filter(
        (p) => p.user_id !== currentUserId && !userIds.includes(p.user_id),
      )
      .map((p) => p.id);

    if (toDeleteIds.length) {
      await this.permissionRepo.delete(toDeleteIds);
    }

    for (const userId of userIds) {
      // Không cấp quyền cho chính mình
      if (userId === currentUserId) {
        continue; // Bỏ qua nếu là chính mình
      }

      // Kiểm tra đã cấp quyền chưa
      const existed = await this.permissionRepo.findOneBy({
        file_id: fileId,
        user_id: userId,
      });
      if (!existed) {
        await this.permissionRepo.save({ file_id: fileId, user_id: userId });
      }
    }
  }
}
