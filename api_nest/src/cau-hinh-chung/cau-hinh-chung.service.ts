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
  In,
  Repository,
} from 'typeorm';
import {
  CreateCauHinhChungDto,
  UpdateCauHinhChungDto,
} from './dto/cau-hinh-chung.dto';
import { GlobalConfigService } from '@core/globalconfig/globalConfig.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { HttpCoreException } from '@core/exceptions/core.exception';
import { HTTP_CODE, keyConfig } from '@configs/contanst';
import { CauHinhChung } from '@database/entities/system/cau-hinh-chung.entity';

@Injectable()
export class CauHinhChungService {
  private readonly logger = new Logger(CauHinhChungService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(CauHinhChung)
    private cauHinhChungRepo: Repository<CauHinhChung>,
    private readonly globalConfigService: GlobalConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(createCauHinhChungDto: CreateCauHinhChungDto) {
    return this.cauHinhChungRepo.save(createCauHinhChungDto);
  }

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.cauHinhChungRepo.createQueryBuilder('cau_hinh_chung'),
      [], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<CauHinhChung>) {
    return this.cauHinhChungRepo.find(options);
  }

  findOneById(id: number) {
    return this.cauHinhChungRepo.findOneBy({ id: id });
  }

  findOneBy(
    where: FindOptionsWhere<CauHinhChung> | FindOptionsWhere<CauHinhChung>[],
  ) {
    return this.cauHinhChungRepo.findOneBy(where);
  }

  async update(
    updateCauHinhChungDto: UpdateCauHinhChungDto,
    user: UserReqData,
  ) {
    await this.globalConfigService.updateConfigKey(
      updateCauHinhChungDto.key,
      updateCauHinhChungDto.value,
      user,
    );
    return await this.findOneBy({ key: updateCauHinhChungDto.key });
  }

  async updateConfigs(
    updateConfigsDto: { key: string; value: string }[],
    user: UserReqData,
  ) {
    const updatedResults = [];

    for (const config of updateConfigsDto) {
      const existingConfig = await this.cauHinhChungRepo.findOneBy({
        key: config.key,
      });

      if (!existingConfig) {
        throw new HttpCoreException(
          `Không tìm thấy cấu hình với key: ${config.key}`,
          HTTP_CODE.NOT_FOUND,
        );
      }

      // Chỉ cập nhật nếu giá trị thay đổi
      if (existingConfig.value !== config.value) {
        await this.cauHinhChungRepo.update(
          { key: config.key },
          {
            value: config.value,
            nguoi_cap_nhat: user.id,
          },
        );
      }

      updatedResults.push({ key: config.key, value: config.value });
    }

    return updatedResults;
  }

  remove(id: number) {
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<CauHinhChung>) {
    return this.cauHinhChungRepo.update(where, {});
  }

  deleteBy(where: FindOptionsWhere<CauHinhChung>) {
    return this.cauHinhChungRepo.delete(where);
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.cauHinhChungRepo.createQueryBuilder(),
      ['id as value', `CONCAT(id) as label`], // Colums need select
      [], // Columns Overwrite
    );
  }

  async findSpecificConfigs() {
    const configs = await this.cauHinhChungRepo.find({
      where: {
        key: In(keyConfig),
      },
    });

    if (!configs || configs.length === 0) {
      throw new HttpCoreException('Không tìm thấy cấu hình', '404');
    }

    return configs;
  }
}
