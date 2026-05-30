import { HTTP_CODE, STATUS } from '@configs/contanst';
import { HttpCoreException } from '@core/exceptions/core.exception';
import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
import { VaiTro } from '@database/entities/auth/vai-tro.entity';
import { HelperService } from '@helper/helper.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { FindManyOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';
import * as _ from 'lodash';
import {
  buildFullName,
  validateMultipleRoles,
  createUserRoleMappings,
  sanitizeUserResponse,
} from './helpers/users.helpers';
import { NguoiDungVaiTro } from '@database/entities/auth/nguoi-dung-vai-tro.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly databaseService: DatabaseService,
    private readonly helperService: HelperService,

    @InjectRepository(NguoiDungVaiTro)
    private nguoiDungVaiTroRepo: Repository<NguoiDungVaiTro>,
    @InjectRepository(NguoiDung)
    private usersRepo: Repository<NguoiDung>,

    @InjectRepository(VaiTro)
    private vaiTroRepo: Repository<VaiTro>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * Create a new user with multiple roles
   * @param createUsersDto - User data to create
   * @returns Created user entity
   */
  async create(createUsersDto: CreateUsersDto): Promise<NguoiDung> {
    // Build full name
    createUsersDto.ho_va_ten = buildFullName(
      createUsersDto.ho || '',
      createUsersDto.ten || '',
    );

    if (!createUsersDto.id_doi_tuong) {
      createUsersDto.id_doi_tuong = null;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate roles
      const roles = await validateMultipleRoles(
        createUsersDto.vai_tro_ids,
        this.vaiTroRepo,
      );

      // Set primary role code (first role)
      createUsersDto.ma_vai_tro = roles[0].ma_vai_tro;

      // Hash password
      const hashedPassword = await this.helperService.genHashedPassword(
        createUsersDto.mat_khau,
      );
      createUsersDto.mat_khau = hashedPassword;

      // Save user
      const user = await queryRunner.manager.save(NguoiDung, createUsersDto);

      // Create user-role mappings
      const userRoleMappings = createUserRoleMappings(
        user.id,
        roles.map((r) => r.id),
      );
      await queryRunner.manager.insert(NguoiDungVaiTro, userRoleMappings);

      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Find all users with pagination and role information
   * @param filters - Filter and pagination options
   * @returns Paginated user list with roles
   */
  async findAllWithPagination(filters: FilterData) {
    const queryBuilder = this.usersRepo
      .createQueryBuilder('users')
      .leftJoin(
        'nguoi_dung_vai_tro',
        'nguoi_dung_vai_tro',
        'nguoi_dung_vai_tro.nguoi_dung_id = users.id',
      )
      .leftJoin(
        'vai_tro',
        'vai_tro',
        'vai_tro.id = nguoi_dung_vai_tro.vai_tro_id',
      )
      .groupBy('users.id');

    const res = await this.databaseService.findWithPagination(
      filters,
      queryBuilder,
      [
        'users.*',
        'GROUP_CONCAT(DISTINCT vai_tro.ten_vai_tro SEPARATOR ", ") as danh_sach_vai_tro',
        'GROUP_CONCAT(DISTINCT vai_tro.id SEPARATOR ", ") as danh_sach_vai_tro_ids',
      ],
      [],
    );

    // Sanitize user responses
    res.collection = res.collection.map((user) => sanitizeUserResponse(user));

    return res;
  }

  /**
   * Find all users with optional filters
   * @param options - TypeORM find options
   * @returns Array of users
   */
  findAll(options?: FindManyOptions<NguoiDung>): Promise<NguoiDung[]> {
    return this.usersRepo.find(options);
  }

  async findOneById(id: number) {
    const user = await this.usersRepo.findOneBy({ id: id });
    const vaiTros = await this.nguoiDungVaiTroRepo.find({
      where: { nguoi_dung_id: id },
    });
    const vai_tro_ids = vaiTros.map((vaiTro) => vaiTro.vai_tro_id);
    return { ...user, vai_tro_ids };
  }

  /**
   * Find a user by custom conditions
   * @param where - Find conditions
   * @returns User entity or null
   */
  findOneBy(
    where: FindOptionsWhere<NguoiDung> | FindOptionsWhere<NguoiDung>[],
  ): Promise<NguoiDung | null> {
    return this.usersRepo.findOneBy(where);
  }

  /**
   * Update a user and their roles
   * @param id - User ID to update
   * @param updateUsersDto - Updated user data
   * @returns Updated user entity
   */
  async update(id: number, updateUsersDto: UpdateUsersDto): Promise<any> {
    if (updateUsersDto.ho !== undefined || updateUsersDto.ten !== undefined) {
      if (updateUsersDto.ho === undefined || updateUsersDto.ten === undefined) {
        const existingUser = await this.usersRepo.findOneBy({ id });
        if (existingUser) {
          updateUsersDto.ho_va_ten = buildFullName(
            updateUsersDto.ho !== undefined ? updateUsersDto.ho : existingUser.ho,
            updateUsersDto.ten !== undefined ? updateUsersDto.ten : existingUser.ten
          );
        }
      } else {
        updateUsersDto.ho_va_ten = buildFullName(updateUsersDto.ho, updateUsersDto.ten);
      }
    }

    if (updateUsersDto.id_doi_tuong === '' as any || updateUsersDto.id_doi_tuong === 0) {
      updateUsersDto.id_doi_tuong = null;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate roles
      const roles = await validateMultipleRoles(
        updateUsersDto.vai_tro_ids,
        this.vaiTroRepo,
      );

      // Set primary role code (first role)
      updateUsersDto.ma_vai_tro = roles[0].ma_vai_tro;

      // Delete existing user-role mappings
      await queryRunner.manager.delete(NguoiDungVaiTro, {
        nguoi_dung_id: id,
      });

      // Create new user-role mappings
      const userRoleMappings = createUserRoleMappings(
        id,
        roles.map((r) => r.id),
      );
      await queryRunner.manager.insert(NguoiDungVaiTro, userRoleMappings);

      // Update user data (exclude vai_tro_ids)
      await queryRunner.manager.update(
        NguoiDung,
        id,
        _.omit(updateUsersDto, ['vai_tro_ids']),
      );

      await queryRunner.commitTransaction();
      return await this.findOneById(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Delete a user by ID
   * @param id - User ID to delete
   * @returns Delete result
   */
  remove(id: number) {
    return this.deleteBy({ id });
  }

  /**
   * Delete users by conditions
   * @param where - Delete conditions
   * @returns Delete result
   */
  deleteBy(where: FindOptionsWhere<NguoiDung>) {
    return this.usersRepo.delete(where);
  }

  /**
   * Find users for select options (dropdown)
   * @param filters - Filter options
   * @returns Users formatted for select options
   */
  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.usersRepo
        .createQueryBuilder()
        .andWhere('trang_thai = :trang_thai', {
          trang_thai: STATUS.ACTIVE,
        }),
      ['id as value', `CONCAT(ho_va_ten) as label`], // Columns need select
      [], // Columns Overwrite
    );
  }

  /**
   * Update user's need_change_password flag
   * @param id - User ID
   * @returns Updated user entity
   */
  async updateNeedChangePassword(id: number): Promise<NguoiDung> {
    await this.usersRepo.update(id, {
      need_change_password: 2,
    });
    return this.usersRepo.findOneBy({ id: id });
  }

  /**
   * Update user's OTP secret
   * @param id - User ID
   * @param otp_secret - OTP secret to set
   * @returns Updated user entity
   */
  async updateOtpSecret(id: number, otp_secret: string): Promise<NguoiDung> {
    await this.usersRepo.update(id, { otp_secret });
    return this.usersRepo.findOneBy({ id });
  }

  /**
   * Update user's OTP verification status
   * @param id - User ID
   * @param is_otp_verify - OTP verification status (0: not verified, 1: verified)
   * @returns Updated user entity
   */
  async updateIsOtpVerify(
    id: number,
    is_otp_verify: number,
  ): Promise<NguoiDung> {
    await this.usersRepo.update(id, {
      is_otp_verify,
      last_otp_verified: new Date(),
    });
    return this.usersRepo.findOneBy({ id });
  }
  /**
   * Đổi mật khẩu người dùng
   * @param id - ID người dùng
   * @param password - Mật khẩu mới
   * @returns Người dùng đã thay đổi mật khẩu
   */
  async changePassword(id: number, password: string): Promise<NguoiDung> {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new HttpCoreException(
        'Người dùng không tồn tại',
        HTTP_CODE.BAD_REQUEST,
      );
    }
    const hashedPassword = await this.helperService.genHashedPassword(password);
    await this.usersRepo.update(id, { mat_khau: hashedPassword });
    return this.usersRepo.findOneBy({ id });
  }
  /**
   * Remove multiple users from a role
   * @param vai_tro_id - Role ID
   * @param user_ids - Array of user IDs to remove
   * @returns Success status
   * @throws HttpCoreException if parameters are invalid
   */
  async removeUsersFromRole(vai_tro_id: number, user_ids: number[]) {
    if (!vai_tro_id || !Array.isArray(user_ids) || user_ids.length === 0) {
      throw new HttpCoreException(
        'Thiếu vai_tro_id hoặc user_ids',
        HTTP_CODE.BAD_REQUEST,
      );
    }

    await this.nguoiDungVaiTroRepo.delete({
      vai_tro_id,
      nguoi_dung_id: In(user_ids),
    });

    return { success: true };
  }

  /**
   * Add multiple users to a role
   * @param vai_tro_id - Role ID
   * @param user_ids - Array of user IDs to add
   * @returns Success status with count of added users
   * @throws HttpCoreException if parameters are invalid or no new users to add
   */
  async addManyUsersToRole(vai_tro_id: number, user_ids: number[]) {
    if (!vai_tro_id || !Array.isArray(user_ids) || user_ids.length === 0) {
      throw new HttpCoreException(
        'Thiếu vai_tro_id hoặc user_ids',
        HTTP_CODE.BAD_REQUEST,
      );
    }

    // Get existing user-role mappings
    const existing = await this.nguoiDungVaiTroRepo.find({
      where: { vai_tro_id },
      select: ['nguoi_dung_id'],
    });
    const existingIds = existing.map((r) => r.nguoi_dung_id);

    // Filter out users that already have the role
    const newUserIds = user_ids.filter((id) => !existingIds.includes(id));
    if (newUserIds.length === 0) {
      throw new HttpCoreException(
        'Không có người dùng mới để thêm',
        HTTP_CODE.BAD_REQUEST,
      );
    }

    // Create user-role mappings
    const records = createUserRoleMappings(vai_tro_id, newUserIds).map(
      (mapping) => ({
        nguoi_dung_id: mapping.nguoi_dung_id,
        vai_tro_id: mapping.vai_tro_id,
      }),
    );

    await this.nguoiDungVaiTroRepo.insert(records);

    return { success: true, added: newUserIds };
  }
}
