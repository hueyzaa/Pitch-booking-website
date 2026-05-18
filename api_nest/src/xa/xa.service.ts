import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { Repository } from 'typeorm';
import { Xa } from '../database/entities/common/xa.entity';

@Injectable()
export class XaService {
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(Xa)
    private xaRepo: Repository<Xa>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.xaRepo.createQueryBuilder(),
      ['id as value', `CONCAT(name) as label`], // Colums need select
      [], // Columns Overwrite
    );
  }
}
