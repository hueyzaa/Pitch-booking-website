import { HttpCoreException } from '@core/exceptions/core.exception';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { CauHinhChung } from '@database/entities/system/cau-hinh-chung.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { In, Repository } from 'typeorm';

@Injectable()
export class GlobalConfigService {
  private readonly logger = new Logger(GlobalConfigService.name);

  constructor(
    @InjectRepository(CauHinhChung)
    private readonly cauHinhChungRepo: Repository<CauHinhChung>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getConfigByKey(key: string) {
    const result = await this.cauHinhChungRepo.findOneBy({ key });
    if (!result) {
      throw new Error(`Không tim thấy cấu hình cần tìm ${key}`);
    }
    return result;
  }

  async getConfigByKeyCache(key: string): Promise<string> {
    //TODO Check from cache
    const dataFromCache: string = await this.cacheManager.get(
      `GLOBAL_CONFIG_${key}`,
    );
    if (dataFromCache) {
      return dataFromCache;
    }

    // const result = {
    //   value: '123',
    // };
    const result = await this.cauHinhChungRepo.findOneBy({ key });
    if (!result) {
      throw new Error(`Không tim thấy cấu hình cần tìm ${key}`);
    }
    await this.cacheManager.set(`GLOBAL_CONFIG_${key}`, result.value);

    return result.value;
  }
  async getConfigsByKeysCache(
    keys: Array<{ key: string; defaultValue: string }>,
  ): Promise<Record<string, string>> {
    //TODO Check from cache
    const result = {};
    const notFoundKeys = [];
    for (const key of keys) {
      const dataFromCache: string = await this.cacheManager.get(
        `GLOBAL_CONFIG_${key}`,
      );
      if (dataFromCache) {
        result[key.key] = dataFromCache;
      } else {
        notFoundKeys.push(key.key);
      }
    }

    if (notFoundKeys.length > 0) {
      const configs = await this.cauHinhChungRepo.find({
        where: { key: In(notFoundKeys) },
      });
      for (const config of configs) {
        result[config.key] = config.value;
        await this.cacheManager.set(
          `GLOBAL_CONFIG_${config.key}`,
          config.value,
        );
      }
    }
    for (const key of notFoundKeys) {
      result[key] = keys.find((k) => k.key === key).defaultValue;
    }
    return result;
  }

  async writeConfigToKey(key: string, value: string) {
    const result = await this.cauHinhChungRepo.insert({ key, value });
    return result;
  }

  async updateConfigKey(key: string, value: string, user: UserReqData) {
    const cauHinhChung = await this.cauHinhChungRepo.findOneBy({ key });
    if (!cauHinhChung) {
      throw new HttpCoreException(
        `Không tim thấy cấu hình cần tìm ${key}`,
        '404',
      );
    }
    return await this.cauHinhChungRepo.update(
      { key: key },
      {
        value,
        nguoi_cap_nhat: user.id,
      },
    );
  }
}
