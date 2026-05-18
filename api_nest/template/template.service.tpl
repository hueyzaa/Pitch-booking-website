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
import { [ModuleName] } from '../database/entities/[module-name].entity';
import { Create[ModuleName]Dto, Update[ModuleName]Dto } from './dto/[module-name].dto';

@Injectable()
export class [ModuleName]Service {
  private readonly logger = new Logger([ModuleName]Service.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository([ModuleName])
    private [moduleName]Repo: Repository<[ModuleName]>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(create[ModuleName]Dto: Create[ModuleName]Dto) {
    return this.[moduleName]Repo.save(create[ModuleName]Dto);
  }

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.[moduleName]Repo
        .createQueryBuilder('[module_name]'),
      [], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<[ModuleName]>) {
    return this.[moduleName]Repo.find(options);
  }

  findOneById(id: number) {
    return this.[moduleName]Repo.findOneBy({ id: id });
  }

  findOneBy(
    where: FindOptionsWhere<[ModuleName]> | FindOptionsWhere<[ModuleName]>[],
  ) {
    return this.[moduleName]Repo.findOneBy(where);
  }

  async update(id: number, update[ModuleName]Dto: Update[ModuleName]Dto) {
    await this.[moduleName]Repo.update(id, update[ModuleName]Dto);
    return await this.findOneById(id);
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<[ModuleName]>) {
    return this.[moduleName]Repo.update(where, {  });
  }

  deleteBy(where: FindOptionsWhere<[ModuleName]>) {
    return this.[moduleName]Repo.delete(where);
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.[moduleName]Repo.createQueryBuilder(),
      ['id as value', `CONCAT(id) as label`], // Colums need select
      [], // Columns Overwrite
    );
  }
}
