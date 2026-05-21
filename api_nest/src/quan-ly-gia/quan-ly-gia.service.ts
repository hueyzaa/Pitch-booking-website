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
import { QuanLyGia } from '../database/entities/quan-ly-gia.entity';
import { NguoiDung } from '../database/entities/auth/nguoi-dung.entity';
import { San } from '../database/entities/san.entity';
import { DoiTuong } from '../database/entities/doi-tuong.entity';
import { CreateQuanLyGiaDto, UpdateQuanLyGiaDto } from './dto/quan-ly-gia.dto';

@Injectable()
export class QuanLyGiaService {
  private readonly logger = new Logger(QuanLyGiaService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(QuanLyGia)
    private quanLyGiaRepo: Repository<QuanLyGia>,

    @InjectRepository(DoiTuong)
    private doiTuongRepo: Repository<DoiTuong>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(createQuanLyGiaDto: CreateQuanLyGiaDto) {
    return this.quanLyGiaRepo.save({
      ...createQuanLyGiaDto,
      don_gia: createQuanLyGiaDto.gia_theo_gio,
    });
  }

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.quanLyGiaRepo
        .createQueryBuilder('quan_ly_gia')
        .leftJoin(
          NguoiDung,
          'nguoi_tao',
          'nguoi_tao.id = quan_ly_gia.nguoi_tao',
        )
        .leftJoin(
          NguoiDung,
          'nguoi_cap_nhat',
          'nguoi_cap_nhat.id = quan_ly_gia.nguoi_cap_nhat',
        )
        .leftJoin(San, 'san', 'san.id = quan_ly_gia.id_san'),
      [
        'quan_ly_gia.id as id',
        'quan_ly_gia.id_san as id_san',
        'san.ten_san as ten_san',
        'quan_ly_gia.gia_theo_gio as gia_theo_gio',
        'quan_ly_gia.don_gia as don_gia',
        'quan_ly_gia.ngay_bat_dau as ngay_bat_dau',
        'quan_ly_gia.ngay_ket_thuc as ngay_ket_thuc',
        'quan_ly_gia.trang_thai as trang_thai',
        'quan_ly_gia.ghi_chu as ghi_chu',
        'quan_ly_gia.ngay_tao as ngay_tao',
        'nguoi_tao.ho_va_ten as ten_nguoi_tao',
        'quan_ly_gia.ngay_cap_nhat as ngay_cap_nhat',
        'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
      ], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<QuanLyGia>) {
    return this.quanLyGiaRepo.find(options);
  }

  findOneById(id: number) {
    return this.quanLyGiaRepo.findOneBy({ id: id });
  }

  findOneBy(
    where: FindOptionsWhere<QuanLyGia> | FindOptionsWhere<QuanLyGia>[],
  ) {
    return this.quanLyGiaRepo.findOneBy(where);
  }

  async update(id: number, updateQuanLyGiaDto: UpdateQuanLyGiaDto) {
    await this.quanLyGiaRepo.update(id, {
      ...updateQuanLyGiaDto,
      don_gia: updateQuanLyGiaDto.gia_theo_gio,
    });
    return await this.findOneById(id);
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<QuanLyGia>) {
    return this.quanLyGiaRepo.update(where, {});
  }

  deleteBy(where: FindOptionsWhere<QuanLyGia>) {
    return this.quanLyGiaRepo.delete(where);
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.quanLyGiaRepo
        .createQueryBuilder('quan_ly_gia')
        .leftJoin(San, 'san', 'san.id = quan_ly_gia.id_san'),
      ['quan_ly_gia.id as value', 'san.ten_san as label'], // Colums need select
      [], // Columns Overwrite
    );
  }

  async findPriceBySan(id_san: number) {
    return this.quanLyGiaRepo.findOne({
      where: { id_san, trang_thai: 1 },
      order: { id: 'DESC' }, // Grab latest active price
    });
  }
}
