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

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.sanRepo
        .createQueryBuilder('san')
        .leftJoin(LoaiSan, 'loai_san', 'loai_san.id = san.id_loai_san')
        .leftJoin(NguoiDung, 'nguoi_tao', 'nguoi_tao.id = san.nguoi_tao')
        .leftJoin(
          NguoiDung,
          'nguoi_cap_nhat',
          'nguoi_cap_nhat.id = san.nguoi_cap_nhat',
        ),
      [
        'san.id as id',
        'san.ten_san as ten_san',
        'san.id_loai_san as id_loai_san',
        'loai_san.ten_loai_san as ten_loai_san',
        'san.ngay_tao as ngay_tao',
        'nguoi_tao.ho_va_ten as ten_nguoi_tao',
        'san.ngay_cap_nhat as ngay_cap_nhat',
        'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
      ], // Columns need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<San>) {
    return this.sanRepo.find(options);
  }

  findOneById(id: number) {
    return this.sanRepo.findOneBy({ id: id });
  }

  findOneBy(
    where: FindOptionsWhere<San> | FindOptionsWhere<San>[],
  ) {
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
    return this.sanRepo.update(where, {  });
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
