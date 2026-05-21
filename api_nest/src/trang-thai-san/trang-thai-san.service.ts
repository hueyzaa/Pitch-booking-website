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
import { TrangThaiSan } from '../database/entities/trang-thai-san.entity';
import { NguoiDung } from '../database/entities/auth/nguoi-dung.entity';
import { San } from '../database/entities/san.entity';
import { CreateTrangThaiSanDto, UpdateTrangThaiSanDto } from './dto/trang-thai-san.dto';

@Injectable()
export class TrangThaiSanService {
  private readonly logger = new Logger(TrangThaiSanService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(TrangThaiSan)
    private trangThaiSanRepo: Repository<TrangThaiSan>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(createTrangThaiSanDto: CreateTrangThaiSanDto) {
    return this.trangThaiSanRepo.save(createTrangThaiSanDto);
  }

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.trangThaiSanRepo
        .createQueryBuilder('trang_thai_san')
        .leftJoin(NguoiDung, 'nguoi_tao', 'nguoi_tao.id = trang_thai_san.nguoi_tao')
        .leftJoin(
          NguoiDung,
          'nguoi_cap_nhat',
          'nguoi_cap_nhat.id = trang_thai_san.nguoi_cap_nhat',
        )
        .leftJoin(San, 'san', 'san.id = trang_thai_san.id_san'),
      [
        'trang_thai_san.id as id',
        'trang_thai_san.id_san as id_san',
        'san.ten_san as ten_san',
        'trang_thai_san.ngay as ngay',
        'trang_thai_san.gio_bat_dau as gio_bat_dau',
        'trang_thai_san.gio_ket_thuc as gio_ket_thuc',
        'trang_thai_san.trang_thai as trang_thai',
        'trang_thai_san.ghi_chu as ghi_chu',
        'trang_thai_san.ngay_tao as ngay_tao',
        'nguoi_tao.ho_va_ten as ten_nguoi_tao',
        'trang_thai_san.ngay_cap_nhat as ngay_cap_nhat',
        'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
      ], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<TrangThaiSan>) {
    return this.trangThaiSanRepo.find(options);
  }

  findOneById(id: number) {
    return this.trangThaiSanRepo.findOneBy({ id: id });
  }

  findOneBy(
    where: FindOptionsWhere<TrangThaiSan> | FindOptionsWhere<TrangThaiSan>[],
  ) {
    return this.trangThaiSanRepo.findOneBy(where);
  }

  async update(id: number, updateTrangThaiSanDto: UpdateTrangThaiSanDto) {
    await this.trangThaiSanRepo.update(id, updateTrangThaiSanDto);
    return await this.findOneById(id);
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<TrangThaiSan>) {
    return this.trangThaiSanRepo.update(where, {  });
  }

  deleteBy(where: FindOptionsWhere<TrangThaiSan>) {
    return this.trangThaiSanRepo.delete(where);
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.trangThaiSanRepo
        .createQueryBuilder('trang_thai_san')
        .leftJoin(San, 'san', 'san.id = trang_thai_san.id_san'),
      [
        'trang_thai_san.id as value',
        `CONCAT(san.ten_san, ' - ', trang_thai_san.ngay, ' (', trang_thai_san.gio_bat_dau, ' - ', trang_thai_san.gio_ket_thuc, ')') as label`,
      ], // Colums need select
      [], // Columns Overwrite
    );
  }
}
