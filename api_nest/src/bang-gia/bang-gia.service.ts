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
import { BangGia } from '../database/entities/bang-gia.entity';
import { NguoiDung } from '../database/entities/auth/nguoi-dung.entity';
import { LoaiSan } from '../database/entities/loai-san.entity';
import { DoiTuong } from '../database/entities/doi-tuong.entity';
import { CreateBangGiaDto, UpdateBangGiaDto } from './dto/bang-gia.dto';

@Injectable()
export class BangGiaService {
  private readonly logger = new Logger(BangGiaService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(BangGia)
    private bangGiaRepo: Repository<BangGia>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(createBangGiaDto: CreateBangGiaDto) {
    return this.bangGiaRepo.save(createBangGiaDto);
  }

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.bangGiaRepo
        .createQueryBuilder('bang_gia')
        .leftJoin(NguoiDung, 'nguoi_tao', 'nguoi_tao.id = bang_gia.nguoi_tao')
        .leftJoin(
          NguoiDung,
          'nguoi_cap_nhat',
          'nguoi_cap_nhat.id = bang_gia.nguoi_cap_nhat',
        )
        .leftJoin(LoaiSan, 'loai_san', 'loai_san.id = bang_gia.id_loai_san')
        .leftJoin(DoiTuong, 'doi_tuong', 'doi_tuong.id = bang_gia.id_doi_tuong'),
      [
        'bang_gia.id as id',
        'bang_gia.ten_bang_gia as ten_bang_gia',
        'bang_gia.don_gia as don_gia',
        'bang_gia.gio_bat_dau as gio_bat_dau',
        'bang_gia.gio_ket_thuc as gio_ket_thuc',
        'bang_gia.id_loai_san as id_loai_san',
        'loai_san.ten_loai_san as ten_loai_san',
        'bang_gia.id_doi_tuong as id_doi_tuong',
        'doi_tuong.ten_doi_tuong as ten_doi_tuong',
        'bang_gia.ngay_tao as ngay_tao',
        'nguoi_tao.ho_va_ten as ten_nguoi_tao',
        'bang_gia.ngay_cap_nhat as ngay_cap_nhat',
        'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
      ], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<BangGia>) {
    return this.bangGiaRepo.find(options);
  }

  findOneById(id: number) {
    return this.bangGiaRepo.findOneBy({ id: id });
  }

  findOneBy(
    where: FindOptionsWhere<BangGia> | FindOptionsWhere<BangGia>[],
  ) {
    return this.bangGiaRepo.findOneBy(where);
  }

  async update(id: number, updateBangGiaDto: UpdateBangGiaDto) {
    await this.bangGiaRepo.update(id, updateBangGiaDto);
    return await this.findOneById(id);
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<BangGia>) {
    return this.bangGiaRepo.update(where, {  });
  }

  deleteBy(where: FindOptionsWhere<BangGia>) {
    return this.bangGiaRepo.delete(where);
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.bangGiaRepo.createQueryBuilder('bang_gia'),
      ['bang_gia.id as value', 'bang_gia.ten_bang_gia as label'], // Colums need select
      [], // Columns Overwrite
    );
  }
}
