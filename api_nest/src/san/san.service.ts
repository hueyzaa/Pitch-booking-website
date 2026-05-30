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
import { San } from '../database/entities/san.entity';
import { LoaiSan } from '../database/entities/loai-san.entity';
import { NguoiDung } from '../database/entities/auth/nguoi-dung.entity';
import { Tinh } from '../database/entities/common/tinh.entity';
import { Xa } from '../database/entities/common/xa.entity';
import { CreateSanDto, UpdateSanDto } from './dto/san.dto';

@Injectable()
export class SanService {
  private readonly logger = new Logger(SanService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(San)
    private sanRepo: Repository<San>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(createSanDto: CreateSanDto) {
    return this.sanRepo.save(createSanDto);
  }

  async findAllWithPagination(filters: FilterData) {
    const result = await this.databaseService.findWithPagination(
      filters,
      this.sanRepo
        .createQueryBuilder('san')
        .leftJoin(LoaiSan, 'loai_san', 'loai_san.id = san.id_loai_san')
        .leftJoin(NguoiDung, 'nguoi_tao', 'nguoi_tao.id = san.nguoi_tao')
        .leftJoin(
          NguoiDung,
          'nguoi_cap_nhat',
          'nguoi_cap_nhat.id = san.nguoi_cap_nhat',
        )
        .leftJoin(Tinh, 'tinh', 'tinh.id = san.tinh_id')
        .leftJoin(Xa, 'xa', 'xa.id = san.xa_id')
        .leftJoin(
          'quan_ly_gia',
          'q_gia',
          'q_gia.id_san = san.id AND q_gia.trang_thai = 1 AND q_gia.id = (SELECT MAX(id) FROM quan_ly_gia WHERE id_san = san.id AND trang_thai = 1)',
        )
        .leftJoin(
          (qb) =>
            qb
              .select('id_san')
              .addSelect('AVG(so_sao)', 'avg_rating')
              .addSelect('COUNT(id)', 'review_count')
              .from('danh_gia', 'dg')
              .where('trang_thai = 1')
              .groupBy('id_san'),
          'danh_gia_stats',
          'danh_gia_stats.id_san = san.id',
        )
        .leftJoin(
          (qb) =>
            qb
              .select('id_san')
              .addSelect('COUNT(id)', 'booked_slots_today')
              .from('dat_san', 'ds')
              .where('ds.ngay_dat = CURDATE()')
              .andWhere('ds.trang_thai IN (0, 1)')
              .groupBy('id_san'),
          'dat_san_stats',
          'dat_san_stats.id_san = san.id',
        ),
      [
        'san.id as id',
        'san.ten_san as ten_san',
        'san.id_loai_san as id_loai_san',
        'loai_san.ten_loai_san as ten_loai_san',
        'san.dia_chi as dia_chi',
        'san.tinh_id as tinh_id',
        'san.xa_id as xa_id',
        'tinh.name as ten_tinh',
        'xa.name as ten_xa',
        'san.tien_ich as tien_ich',
        'san.anh_chinh as anh_chinh',
        'san.anh_chi_tiet as anh_chi_tiet',
        'san.mo_ta as mo_ta',
        'san.ngay_tao as ngay_tao',
        'nguoi_tao.ho_va_ten as ten_nguoi_tao',
        'san.ngay_cap_nhat as ngay_cap_nhat',
        'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
        'COALESCE(q_gia.gia_theo_gio, 0) as pricePerHour',
        'COALESCE(danh_gia_stats.avg_rating, 0) as rating',
        'COALESCE(danh_gia_stats.review_count, 0) as reviewCount',
        'COALESCE(dat_san_stats.booked_slots_today, 0) as booked_slots_today',
      ], // Columns need select
      [], // Columns Overwrite
    );

    if (result.collection && Array.isArray(result.collection)) {
      result.collection = result.collection.map((san: any) => {
        if (san.tien_ich && typeof san.tien_ich === 'string') {
          san.tien_ich = san.tien_ich.split(',').filter(Boolean);
        }
        if (san.anh_chi_tiet && typeof san.anh_chi_tiet === 'string') {
          try {
            san.anh_chi_tiet = JSON.parse(san.anh_chi_tiet);
          } catch {
            san.anh_chi_tiet = san.anh_chi_tiet.split(',').filter(Boolean);
          }
        }
        if (san.pricePerHour !== undefined) {
          san.pricePerHour = Number(san.pricePerHour);
        }
        if (san.rating !== undefined) {
          san.rating = parseFloat(Number(san.rating).toFixed(1));
        }
        if (san.reviewCount !== undefined) {
          san.reviewCount = Number(san.reviewCount);
        }
        if (san.booked_slots_today !== undefined) {
          san.booked_slots_today = Number(san.booked_slots_today);
          san.status = san.booked_slots_today >= 16 ? 'sold_out' : 'available';
        }
        return san;
      });
    }

    return result;
  }

  findAll(options?: FindManyOptions<San>) {
    return this.sanRepo.find(options);
  }

  async findOneById(id: number) {
    const query = this.sanRepo
      .createQueryBuilder('san')
      .leftJoin(LoaiSan, 'loai_san', 'loai_san.id = san.id_loai_san')
      .leftJoin(Tinh, 'tinh', 'tinh.id = san.tinh_id')
      .leftJoin(Xa, 'xa', 'xa.id = san.xa_id')
      .leftJoin(
        'quan_ly_gia',
        'q_gia',
        'q_gia.id_san = san.id AND q_gia.trang_thai = 1 AND q_gia.id = (SELECT MAX(id) FROM quan_ly_gia WHERE id_san = san.id AND trang_thai = 1)',
      )
      .select([
        'san.id as id',
        'san.ten_san as ten_san',
        'san.id_loai_san as id_loai_san',
        'loai_san.ten_loai_san as ten_loai_san',
        'san.dia_chi as dia_chi',
        'san.tinh_id as tinh_id',
        'san.xa_id as xa_id',
        'tinh.name as ten_tinh',
        'xa.name as ten_xa',
        'san.tien_ich as tien_ich',
        'san.anh_chinh as anh_chinh',
        'san.anh_chi_tiet as anh_chi_tiet',
        'san.mo_ta as mo_ta',
        'san.ngay_tao as ngay_tao',
        'COALESCE(q_gia.gia_theo_gio, 0) as pricePerHour',
      ])
      .where('san.id = :id', { id });

    const san = await query.getRawOne();
    if (!san) return null;

    if (san.tien_ich && typeof san.tien_ich === 'string') {
      san.tien_ich = san.tien_ich.split(',').filter(Boolean);
    }
    if (san.anh_chi_tiet && typeof san.anh_chi_tiet === 'string') {
      try {
        san.anh_chi_tiet = JSON.parse(san.anh_chi_tiet);
      } catch {
        san.anh_chi_tiet = san.anh_chi_tiet.split(',').filter(Boolean);
      }
    }
    if (san.pricePerHour !== undefined) {
      san.pricePerHour = Number(san.pricePerHour);
    }

    return san;
  }

  findOneBy(where: FindOptionsWhere<San> | FindOptionsWhere<San>[]) {
    return this.sanRepo.findOneBy(where);
  }

  async update(id: number, updateSanDto: UpdateSanDto) {
    await this.sanRepo.update(id, updateSanDto);
    return await this.findOneById(id);
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<San>) {
    return this.sanRepo.update(where, {});
  }

  deleteBy(where: FindOptionsWhere<San>) {
    return this.sanRepo.delete(where);
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.sanRepo.createQueryBuilder('san'),
      ['san.id as value', 'san.ten_san as label'], // Columns need select
      [], // Columns Overwrite
    );
  }
}
