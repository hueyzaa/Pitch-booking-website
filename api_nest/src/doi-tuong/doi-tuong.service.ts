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
import { DoiTuong } from '../database/entities/doi-tuong.entity';
import { NguoiDung } from '../database/entities/auth/nguoi-dung.entity';
import { CreateDoiTuongDto, UpdateDoiTuongDto } from './dto/doi-tuong.dto';

@Injectable()
export class DoiTuongService {
  private readonly logger = new Logger(DoiTuongService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(DoiTuong)
    private doiTuongRepo: Repository<DoiTuong>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(createDoiTuongDto: CreateDoiTuongDto) {
    return this.doiTuongRepo.save(createDoiTuongDto);
  }

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.doiTuongRepo
        .createQueryBuilder('doi_tuong')
        .leftJoin(NguoiDung, 'nguoi_tao', 'nguoi_tao.id = doi_tuong.nguoi_tao')
        .leftJoin(
          NguoiDung,
          'nguoi_cap_nhat',
          'nguoi_cap_nhat.id = doi_tuong.nguoi_cap_nhat',
        ),
      [
        'doi_tuong.id as id',
        'doi_tuong.ten_doi_tuong as ten_doi_tuong',
        'doi_tuong.phan_tram_giam_gia as phan_tram_giam_gia',
        'doi_tuong.ngay_tao as ngay_tao',
        'nguoi_tao.ho_va_ten as ten_nguoi_tao',
        'doi_tuong.ngay_cap_nhat as ngay_cap_nhat',
        'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
      ], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<DoiTuong>) {
    return this.doiTuongRepo.find(options);
  }

  findOneById(id: number) {
    return this.doiTuongRepo.findOneBy({ id: id });
  }

  findOneBy(where: FindOptionsWhere<DoiTuong> | FindOptionsWhere<DoiTuong>[]) {
    return this.doiTuongRepo.findOneBy(where);
  }

  async update(id: number, updateDoiTuongDto: UpdateDoiTuongDto) {
    await this.doiTuongRepo.update(id, updateDoiTuongDto);
    return await this.findOneById(id);
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<DoiTuong>) {
    return this.doiTuongRepo.update(where, {});
  }

  deleteBy(where: FindOptionsWhere<DoiTuong>) {
    return this.doiTuongRepo.delete(where);
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.doiTuongRepo.createQueryBuilder('doi_tuong'),
      [
        'doi_tuong.id as value',
        'doi_tuong.ten_doi_tuong as label',
        'doi_tuong.phan_tram_giam_gia as phan_tram_giam_gia',
      ], // Colums need select
      [], // Columns Overwrite
    );
  }
}
