import { Log } from '@database/entities/system/log.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(Log)
    private logRepo: Repository<Log>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.logRepo.createQueryBuilder('log'),
      [], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<Log>) {
    return this.logRepo.find(options);
  }

  findOneById(id: number) {
    return this.logRepo.findOneBy({ id: id });
  }
}
