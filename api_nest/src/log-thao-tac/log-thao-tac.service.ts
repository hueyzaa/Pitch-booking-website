import { LOG_CATEGORY_DTO, IMPACT_SEVERITY_DTO } from './../configs/log.config';
import { UserService } from './../core/profile/profile.service';
import { HttpCoreException } from '@core/exceptions/core.exception';
import { entityMap, IMPACT_SEVERITY, LOG_CATEGORY } from '@configs/log.config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { CreateLogThaoTacDto } from './dto/log-thao-tac.dto';
import { URL_SEVERITY_MAP } from '@configs/log.config';
import { ForgotPassDto } from '@core/auth/dto/auth.dto';
import { LogThaoTac } from '@database/entities/system/log-thao-tac.entity';
import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';

@Injectable()
export class LogThaoTacService {
  private readonly logger = new Logger(LogThaoTacService.name);
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,

    @InjectRepository(LogThaoTac)
    private logThaoTacRepo: Repository<LogThaoTac>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.logThaoTacRepo.createQueryBuilder('log_thao_tac'),
      [], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<LogThaoTac>) {
    return this.logThaoTacRepo.find(options);
  }

  async create(createLogThaoTacDto: CreateLogThaoTacDto) {
    let logCategoryName: string | null;

    if (createLogThaoTacDto.log_type) {
      logCategoryName = LOG_CATEGORY_DTO.find(
        (i) => i.value === createLogThaoTacDto.log_type,
      )?.name;
    }

    let impactSeverityName: string | null;
    if (createLogThaoTacDto.severity) {
      impactSeverityName = IMPACT_SEVERITY_DTO.find(
        (i) => i.value === createLogThaoTacDto.log_type,
      )?.name;
    }

    try {
      // Xử lý ghi log
      const newData = {
        user_id: createLogThaoTacDto.user_id,
        ho_ten: createLogThaoTacDto.user_name,
        url: createLogThaoTacDto.url,
        mo_ta_url:
          createLogThaoTacDto.url_description ||
          this.checkRouteAndReturnResult(createLogThaoTacDto.url),
        mo_ta:
          createLogThaoTacDto.description ||
          this.convertMethod(createLogThaoTacDto.method),
        phan_loai: logCategoryName || this.convertType(createLogThaoTacDto.url),
        muc_do:
          impactSeverityName ||
          this.convertSeverity(
            createLogThaoTacDto.url,
            createLogThaoTacDto.method,
          ),
        noi_dung: JSON.stringify(createLogThaoTacDto.body),
        ket_qua: createLogThaoTacDto.statusCode,
      };

      return await this.logThaoTacRepo.save(newData);
    } catch (error) {
      throw new HttpCoreException(error);
    }
  }
  /**
   * Dịch sang tiếng Việt theo các đường dẫn API
   * @param url
   * @returns
   */
  checkRouteAndReturnResult = (url: string): string => {
    for (const [entity, name] of Object.entries(entityMap)) {
      if (url.includes(`/${entity}`)) {
        return name;
      }
    }
    return 'Khác';
  };

  convertMethod = (method: string) => {
    if (method === 'GET') {
      return 'Xem dữ liệu';
    }
    if (method === 'POST') {
      return 'Tạo mới dữ liệu';
    }
    if (method === 'PATCH') {
      return 'Cập nhật dữ liệu';
    }
    if (method === 'DELETE') {
      return 'Xóa dữ liệu';
    }
    return 'Khác';
  };

  /**
   * Phân loại mức độ tác động của API
   * @param originalUrl string
   * @param method string
   * @returns
   */
  convertSeverity = (originalUrl: string, method: string) => {
    for (const [severity, urlConfigs] of Object.entries(URL_SEVERITY_MAP)) {
      for (const config of urlConfigs) {
        if (
          originalUrl.includes(config.url) &&
          config.methods.includes(method)
        ) {
          return IMPACT_SEVERITY[severity as keyof typeof IMPACT_SEVERITY];
        }
      }
    }

    //API Còn lại
    return IMPACT_SEVERITY.MUC_1;
  };

  /**
   * Phân loại nhóm API
   * @param originalUrl
   * @returns
   */
  convertType = (originalUrl: string) => {
    // các api tác động tài khoản
    if (originalUrl.includes('/users')) {
      return LOG_CATEGORY.NHOM_4;
    }
    //api tác động cấu hình hệ thống - phân quyền
    if (originalUrl.includes('/roles')) {
      return LOG_CATEGORY.NHOM_5;
    }
    //....
    return LOG_CATEGORY.NHOM_1;
  };

  // CÁC TRƯỜNG HỢP KHÁC KHÔNG THỂ XỬ LÝ BẰNG MIDDLEWARE
  // PATH /auth

  async logLogin(user: NguoiDung) {
    const createLogThaoTacDto = new CreateLogThaoTacDto();
    createLogThaoTacDto.user_id = user.id;
    createLogThaoTacDto.user_name = user.ho_va_ten;
    createLogThaoTacDto.url = '/auth/login';
    createLogThaoTacDto.method = 'POST';
    createLogThaoTacDto.body = '';
    createLogThaoTacDto.description = 'Đăng nhập hệ thống';
    createLogThaoTacDto.log_type = 2;
    createLogThaoTacDto.statusCode = '200';

    return await this.create(createLogThaoTacDto);
  }

  async logLogout(userID: number) {
    const user = await this.userService.findOneById(userID);

    const createLogThaoTacDto = new CreateLogThaoTacDto();
    createLogThaoTacDto.user_id = user.id;
    createLogThaoTacDto.user_name = user.ho_va_ten;
    createLogThaoTacDto.url = '/auth/logout';
    createLogThaoTacDto.method = 'POST';
    createLogThaoTacDto.body = '';
    createLogThaoTacDto.description = 'Đăng xuất hệ thống';
    createLogThaoTacDto.log_type = 2;
    createLogThaoTacDto.statusCode = '200';

    return await this.create(createLogThaoTacDto);
  }

  async logForgotPassword(data: ForgotPassDto) {
    const createLogThaoTacDto = new CreateLogThaoTacDto();
    createLogThaoTacDto.user_id = 0;
    createLogThaoTacDto.user_name = '';
    createLogThaoTacDto.url = '/auth/forgot-password';
    createLogThaoTacDto.method = 'POST';
    createLogThaoTacDto.body = JSON.stringify(data);
    createLogThaoTacDto.description = 'Yêu cầu gửi mail đổi mật khẩu';
    createLogThaoTacDto.log_type = 4;
    createLogThaoTacDto.statusCode = '200';

    return await this.create(createLogThaoTacDto);
  }
}
