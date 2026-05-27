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
import { ThuChi } from '../database/entities/thu-chi.entity';
import { NguoiDung } from '../database/entities/auth/nguoi-dung.entity';
import { San } from '../database/entities/san.entity';

import { CreateThuChiDto, UpdateThuChiDto } from './dto/thu-chi.dto';

@Injectable()
export class ThuChiService {
  private readonly logger = new Logger(ThuChiService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(ThuChi)
    private thuChiRepo: Repository<ThuChi>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(createThuChiDto: CreateThuChiDto) {
    return this.thuChiRepo.save(createThuChiDto);
  }

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.thuChiRepo
        .createQueryBuilder('thu_chi')
        .leftJoin(NguoiDung, 'nguoi_tao', 'nguoi_tao.id = thu_chi.nguoi_tao')
        .leftJoin(
          NguoiDung,
          'nguoi_cap_nhat',
          'nguoi_cap_nhat.id = thu_chi.nguoi_cap_nhat',
        )
        .leftJoin(
          NguoiDung,
          'nguoi_dung',
          'nguoi_dung.id = thu_chi.id_nguoi_dung',
        )
        .leftJoin(San, 'san', 'san.id = thu_chi.id_san'),
      [
        'thu_chi.id as id',
        'thu_chi.loai_giao_dich as loai_giao_dich',
        'thu_chi.danh_muc as danh_muc',
        'thu_chi.so_tien as so_tien',
        'thu_chi.ngay_giao_dich as ngay_giao_dich',
        'thu_chi.mo_ta as mo_ta',
        'thu_chi.id_nguoi_dung as id_nguoi_dung',
        'nguoi_dung.ho_va_ten as ten_khach_hang',
        'thu_chi.id_san as id_san',
        'san.ten_san as ten_san',
        'thu_chi.ghi_chu as ghi_chu',
        'thu_chi.ngay_tao as ngay_tao',
        'nguoi_tao.ho_va_ten as ten_nguoi_tao',
        'thu_chi.ngay_cap_nhat as ngay_cap_nhat',
        'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
      ], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<ThuChi>) {
    return this.thuChiRepo.find(options);
  }

  findOneById(id: number) {
    return this.thuChiRepo.findOneBy({ id: id });
  }

  findOneBy(where: FindOptionsWhere<ThuChi> | FindOptionsWhere<ThuChi>[]) {
    return this.thuChiRepo.findOneBy(where);
  }

  async update(id: number, updateThuChiDto: UpdateThuChiDto) {
    await this.thuChiRepo.update(id, updateThuChiDto);
    return await this.findOneById(id);
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<ThuChi>) {
    return this.thuChiRepo.update(where, {});
  }

  deleteBy(where: FindOptionsWhere<ThuChi>) {
    return this.thuChiRepo.delete(where);
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.thuChiRepo.createQueryBuilder('thu_chi'),
      [
        'id as value',
        `CONCAT(danh_muc, ' - ', IF(loai_giao_dich = 1, 'Thu', 'Chi'), ' - ', so_tien) as label`,
      ], // Colums need select
      [], // Columns Overwrite
    );
  }
}
