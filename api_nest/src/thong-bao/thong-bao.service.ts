import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { ThongBao } from '../database/entities/system/thong-bao.entity';
import { CreateThongBaoDto, UpdateThongBaoDto } from './dto/thong-bao.dto';

@Injectable()
export class ThongBaoService {
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(ThongBao)
    private thongBaoRepo: Repository<ThongBao>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  create(createThongBaoDto: CreateThongBaoDto) {
    return this.thongBaoRepo.save(createThongBaoDto);
  }

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.thongBaoRepo.createQueryBuilder('thong_bao'),
      [], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<ThongBao>) {
    return this.thongBaoRepo.find(options);
  }

  findOneById(id: number) {
    return this.thongBaoRepo.findOneBy({ id: id });
  }

  findOneBy(where: FindOptionsWhere<ThongBao> | FindOptionsWhere<ThongBao>[]) {
    return this.thongBaoRepo.findOneBy(where);
  }

  async update(id: number, updateThongBaoDto: UpdateThongBaoDto) {
    await this.thongBaoRepo.update(id, updateThongBaoDto);
    return await this.findOneById(id);
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<ThongBao>) {
    return this.thongBaoRepo.update(where, {});
  }

  deleteBy(where: FindOptionsWhere<ThongBao>) {
    return this.thongBaoRepo.delete(where);
  }

  async bulkDelete(ids: number[]) {
    return this.thongBaoRepo.delete(ids);
  }

  async markAllRead(userId: number) {
    return this.thongBaoRepo.update({ nguoi_dung_id: userId, da_xem: 0 }, { da_xem: 1 });
  }

  async deleteAllByUserId(userId: number) {
    return this.thongBaoRepo.delete({ nguoi_dung_id: userId });
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.thongBaoRepo.createQueryBuilder(),
      ['id as value', `CONCAT(id) as label`], // Colums need select
      [], // Columns Overwrite
    );
  }
}
