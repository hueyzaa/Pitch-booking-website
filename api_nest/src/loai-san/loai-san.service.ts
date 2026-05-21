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
import { LoaiSan } from '../database/entities/loai-san.entity';
import { NguoiDung } from '../database/entities/auth/nguoi-dung.entity';
import { CreateLoaiSanDto, UpdateLoaiSanDto } from './dto/loai-san.dto';

@Injectable()
export class LoaiSanService {
  private readonly logger = new Logger(LoaiSanService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(LoaiSan)
    private loaiSanRepo: Repository<LoaiSan>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(createLoaiSanDto: CreateLoaiSanDto) {
    return this.loaiSanRepo.save(createLoaiSanDto);
  }

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.loaiSanRepo
        .createQueryBuilder('loai_san')
        .leftJoin(NguoiDung, 'nguoi_tao', 'nguoi_tao.id = loai_san.nguoi_tao')
        .leftJoin(
          NguoiDung,
          'nguoi_cap_nhat',
          'nguoi_cap_nhat.id = loai_san.nguoi_cap_nhat',
        ),
      [
        'loai_san.id as id',
        'loai_san.ten_loai_san as ten_loai_san',
        'loai_san.ngay_tao as ngay_tao',
        'nguoi_tao.ho_va_ten as ten_nguoi_tao',
        'loai_san.ngay_cap_nhat as ngay_cap_nhat',
        'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
      ], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<LoaiSan>) {
    return this.loaiSanRepo.find(options);
  }

  findOneById(id: number) {
    return this.loaiSanRepo.findOneBy({ id: id });
  }

  findOneBy(where: FindOptionsWhere<LoaiSan> | FindOptionsWhere<LoaiSan>[]) {
    return this.loaiSanRepo.findOneBy(where);
  }

  async update(id: number, updateLoaiSanDto: UpdateLoaiSanDto) {
    await this.loaiSanRepo.update(id, updateLoaiSanDto);
    return await this.findOneById(id);
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<LoaiSan>) {
    return this.loaiSanRepo.update(where, {});
  }

  deleteBy(where: FindOptionsWhere<LoaiSan>) {
    return this.loaiSanRepo.delete(where);
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.loaiSanRepo.createQueryBuilder('loai_san'),
      ['loai_san.id as value', 'loai_san.ten_loai_san as label'], // Colums need select
      [], // Columns Overwrite
    );
  }
}
