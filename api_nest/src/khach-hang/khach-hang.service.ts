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
import { KhachHang } from '../database/entities/khach-hang.entity';
import { NguoiDung } from '../database/entities/auth/nguoi-dung.entity';
import { DoiTuong } from '../database/entities/doi-tuong.entity';
import { CreateKhachHangDto, UpdateKhachHangDto } from './dto/khach-hang.dto';

@Injectable()
export class KhachHangService {
  private readonly logger = new Logger(KhachHangService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(KhachHang)
    private khachHangRepo: Repository<KhachHang>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(createKhachHangDto: CreateKhachHangDto) {
    return this.khachHangRepo.save(createKhachHangDto);
  }

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.khachHangRepo
        .createQueryBuilder('khach_hang')
        .leftJoin(NguoiDung, 'nguoi_tao', 'nguoi_tao.id = khach_hang.nguoi_tao')
        .leftJoin(
          NguoiDung,
          'nguoi_cap_nhat',
          'nguoi_cap_nhat.id = khach_hang.nguoi_cap_nhat',
        )
        .leftJoin(
          DoiTuong,
          'doi_tuong',
          'doi_tuong.id = khach_hang.id_doi_tuong',
        ),
      [
        'khach_hang.id as id',
        'khach_hang.ho_va_ten as ho_va_ten',
        'khach_hang.so_dien_thoai as so_dien_thoai',
        'khach_hang.email as email',
        'khach_hang.dia_chi as dia_chi',
        'khach_hang.ngay_sinh as ngay_sinh',
        'khach_hang.gioi_tinh as gioi_tinh',
        'khach_hang.id_doi_tuong as id_doi_tuong',
        'doi_tuong.ten_doi_tuong as ten_doi_tuong',
        'khach_hang.ngay_tao as ngay_tao',
        'nguoi_tao.ho_va_ten as ten_nguoi_tao',
        'khach_hang.ngay_cap_nhat as ngay_cap_nhat',
        'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
      ], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<KhachHang>) {
    return this.khachHangRepo.find(options);
  }

  findOneById(id: number) {
    return this.khachHangRepo.findOneBy({ id: id });
  }

  findOneBy(
    where: FindOptionsWhere<KhachHang> | FindOptionsWhere<KhachHang>[],
  ) {
    return this.khachHangRepo.findOneBy(where);
  }

  async update(id: number, updateKhachHangDto: UpdateKhachHangDto) {
    await this.khachHangRepo.update(id, updateKhachHangDto);
    return await this.findOneById(id);
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<KhachHang>) {
    return this.khachHangRepo.update(where, {});
  }

  deleteBy(where: FindOptionsWhere<KhachHang>) {
    return this.khachHangRepo.delete(where);
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.khachHangRepo
        .createQueryBuilder('khach_hang')
        .leftJoin(
          DoiTuong,
          'doi_tuong',
          'doi_tuong.id = khach_hang.id_doi_tuong',
        ),
      [
        'khach_hang.id as value',
        'khach_hang.ho_va_ten as label',
        'khach_hang.id_doi_tuong as id_doi_tuong',
        'doi_tuong.phan_tram_giam_gia as phan_tram_giam_gia',
      ], // Colums need select
      [], // Columns Overwrite
    );
  }
}
