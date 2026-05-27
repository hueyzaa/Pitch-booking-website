import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import {
  DataSource,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { DanhGia } from '../database/entities/danh-gia.entity';
import { NguoiDung } from '../database/entities/auth/nguoi-dung.entity';
import { San } from '../database/entities/san.entity';

import {
  CreateDanhGiaDto,
  PublicCreateDanhGiaDto,
  UpdateDanhGiaDto,
} from './dto/danh-gia.dto';
import { HttpCoreException } from '@core/exceptions/core.exception';

@Injectable()
export class DanhGiaService {
  private readonly logger = new Logger(DanhGiaService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(DanhGia)
    private danhGiaRepo: Repository<DanhGia>,

    @InjectRepository(NguoiDung)
    private nguoiDungRepo: Repository<NguoiDung>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(createDanhGiaDto: CreateDanhGiaDto) {
    return this.danhGiaRepo.save(createDanhGiaDto);
  }

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.danhGiaRepo
        .createQueryBuilder('danh_gia')
        .leftJoin(
          NguoiDung,
          'nguoi_dung',
          'nguoi_dung.id = danh_gia.id_nguoi_dung',
        )
        .leftJoin(San, 'san', 'san.id = danh_gia.id_san')
        .leftJoin(NguoiDung, 'nguoi_tao', 'nguoi_tao.id = danh_gia.nguoi_tao')
        .leftJoin(
          NguoiDung,
          'nguoi_cap_nhat',
          'nguoi_cap_nhat.id = danh_gia.nguoi_cap_nhat',
        ),
      [
        'danh_gia.id as id',
        'danh_gia.id_nguoi_dung as id_nguoi_dung',
        'nguoi_dung.ho_va_ten as ten_khach_hang',
        'nguoi_dung.so_dien_thoai as so_dien_thoai_khach_hang',
        'danh_gia.id_san as id_san',
        'san.ten_san as ten_san',
        'danh_gia.so_sao as so_sao',
        'danh_gia.noi_dung as noi_dung',
        'danh_gia.trang_thai as trang_thai',
        'danh_gia.ngay_tao as ngay_tao',
        'nguoi_tao.ho_va_ten as ten_nguoi_tao',
        'danh_gia.ngay_cap_nhat as ngay_cap_nhat',
        'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
      ], // Columns need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<DanhGia>) {
    return this.danhGiaRepo.find(options);
  }

  findOneById(id: number) {
    return this.danhGiaRepo.findOne({
      where: { id },
      relations: ['nguoi_dung', 'san'],
    });
  }

  findOneBy(where: FindOptionsWhere<DanhGia> | FindOptionsWhere<DanhGia>[]) {
    return this.danhGiaRepo.findOneBy(where);
  }

  async update(id: number, updateDanhGiaDto: UpdateDanhGiaDto) {
    await this.danhGiaRepo.update(id, updateDanhGiaDto);
    return await this.findOneById(id);
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<DanhGia>) {
    return this.danhGiaRepo.update(where, {});
  }

  deleteBy(where: FindOptionsWhere<DanhGia>) {
    return this.danhGiaRepo.delete(where);
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.danhGiaRepo
        .createQueryBuilder('danh_gia')
        .leftJoin(
          NguoiDung,
          'nguoi_dung',
          'nguoi_dung.id = danh_gia.id_nguoi_dung',
        )
        .leftJoin(San, 'san', 'san.id = danh_gia.id_san'),
      [
        'danh_gia.id as value',
        `CONCAT(nguoi_dung.ho_va_ten, ' - ', san.ten_san, ' (', danh_gia.so_sao, ' sao)') as label`,
      ], // Colums need select
      [], // Columns Overwrite
    );
  }

  /**
   * Lấy danh sách đánh giá mới nhất trên toàn hệ thống (public)
   */
  async getLatestPublicReviews(limit: number = 6) {
    return this.danhGiaRepo
      .createQueryBuilder('danh_gia')
      .leftJoin(NguoiDung, 'nguoi_dung', 'nguoi_dung.id = danh_gia.id_nguoi_dung')
      .leftJoin(San, 'san', 'san.id = danh_gia.id_san')
      .select([
        'danh_gia.id as id',
        'nguoi_dung.ho_va_ten as ten_khach_hang',
        'nguoi_dung.anh_dai_dien as anh_dai_dien',
        'san.ten_san as ten_san',
        'danh_gia.so_sao as so_sao',
        'danh_gia.noi_dung as noi_dung',
        'danh_gia.ngay_tao as ngay_tao',
      ])
      .where('danh_gia.trang_thai = :trangThai', { trangThai: 1 })
      .orderBy('danh_gia.ngay_tao', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  /**
   * Lấy danh sách đánh giá theo sân (public - không cần auth)
   */
  async findBySanId(idSan: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await this.danhGiaRepo
      .createQueryBuilder('danh_gia')
      .leftJoin(
        NguoiDung,
        'nguoi_dung',
        'nguoi_dung.id = danh_gia.id_nguoi_dung',
      )
      .select([
        'danh_gia.id as id',
        'nguoi_dung.ho_va_ten as ten_khach_hang',
        'danh_gia.so_sao as so_sao',
        'danh_gia.noi_dung as noi_dung',
        'danh_gia.ngay_tao as ngay_tao',
      ])
      .where('danh_gia.id_san = :idSan', { idSan })
      .andWhere('danh_gia.trang_thai = :trangThai', { trangThai: 1 })
      .orderBy('danh_gia.ngay_tao', 'DESC')
      .offset(skip)
      .limit(limit)
      .getRawMany()
      .then(async (data) => {
        const count = await this.danhGiaRepo
          .createQueryBuilder('danh_gia')
          .where('danh_gia.id_san = :idSan', { idSan })
          .andWhere('danh_gia.trang_thai = :trangThai', { trangThai: 1 })
          .getCount();
        return [data, count] as [any[], number];
      });

    return {
      collection: reviews,
      total,
      page,
      limit,
    };
  }

  /**
   * Lấy điểm trung bình + tổng số đánh giá theo sân (public)
   */
  async getSummaryBySanId(idSan: number) {
    const result = await this.danhGiaRepo
      .createQueryBuilder('danh_gia')
      .select([
        'AVG(danh_gia.so_sao) as avg_rating',
        'COUNT(danh_gia.id) as total_reviews',
      ])
      .where('danh_gia.id_san = :idSan', { idSan })
      .andWhere('danh_gia.trang_thai = :trangThai', { trangThai: 1 })
      .getRawOne();

    return {
      avg_rating: result?.avg_rating
        ? parseFloat(parseFloat(result.avg_rating).toFixed(1))
        : 0,
      total_reviews: parseInt(result?.total_reviews || '0', 10),
    };
  }

  /**
   * Tạo đánh giá từ khách hàng (public - lookup qua tai_khoan)
   */
  async publicCreate(dto: PublicCreateDanhGiaDto) {
    // Tìm NguoiDung theo tai_khoan
    const nguoiDung = await this.nguoiDungRepo.findOneBy({
      tai_khoan: dto.tai_khoan,
    });

    if (!nguoiDung) {
      throw new HttpCoreException(
        'Không tìm thấy thông tin khách hàng. Vui lòng liên hệ quản trị viên.',
        '400',
      );
    }

    // Kiểm tra sân tồn tại
    const sanExists = await this.dataSource
      .getRepository(San)
      .findOneBy({ id: dto.id_san });

    if (!sanExists) {
      throw new HttpCoreException('Sân không tồn tại', '400');
    }

    // Tạo đánh giá
    const danhGia = this.danhGiaRepo.create({
      id_nguoi_dung: nguoiDung.id,
      id_san: dto.id_san,
      so_sao: dto.so_sao,
      noi_dung: dto.noi_dung || null,
      trang_thai: 1,
    });

    return this.danhGiaRepo.save(danhGia);
  }

  /**
   * Lấy danh sách đánh giá tốt mới nhất (public)
   */
  async getLatestGoodReviews(limit: number = 10) {
    return this.danhGiaRepo
      .createQueryBuilder('danh_gia')
      .leftJoin(NguoiDung, 'nguoi_dung', 'nguoi_dung.id = danh_gia.id_nguoi_dung')
      .select([
        'danh_gia.id as id',
        'nguoi_dung.ho_va_ten as name',
        'danh_gia.so_sao as rating',
        'danh_gia.noi_dung as quote',
        'danh_gia.ngay_tao as ngay_tao',
      ])
      .where('danh_gia.so_sao >= :minStars', { minStars: 4 })
      .andWhere('danh_gia.trang_thai = :trangThai', { trangThai: 1 })
      .andWhere('danh_gia.noi_dung IS NOT NULL')
      .orderBy('danh_gia.ngay_tao', 'DESC')
      .limit(limit)
      .getRawMany();
  }
}
