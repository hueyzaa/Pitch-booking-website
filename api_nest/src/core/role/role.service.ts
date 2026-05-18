import { STATUS } from '@configs/contanst';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { permissions } from 'src/configs/permission.config';
import { DatabaseService } from 'src/database/database.service';
import { NguoiDung } from 'src/database/entities/auth/nguoi-dung.entity';
import { VaiTro } from 'src/database/entities/auth/vai-tro.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { HttpCoreException } from '@core/exceptions/core.exception';
import * as _ from 'lodash';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(
    @InjectRepository(VaiTro)
    private rolesRepository: Repository<VaiTro>,

    private readonly databaseService: DatabaseService,
  ) {}

  /**
   * Tạo mới vai trò
   */
  async create(createRoleDto: CreateRoleDto) {
    const data = { ...createRoleDto };

    // Validate permission format
    if (data.phan_quyen && typeof data.phan_quyen === 'object') {
      data.phan_quyen = JSON.stringify(data.phan_quyen);
    }

    return this.rolesRepository.save(data);
  }

  /**
   * Lấy danh sách vai trò có phân trang
   */
  findAll(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.rolesRepository
        .createQueryBuilder('vai_tro')
        .leftJoinAndMapOne(
          'vai_tro.nguoi_tao',
          NguoiDung,
          'nguoi_dung',
          'nguoi_dung.id = vai_tro.nguoi_tao',
        )
        .andWhere('vai_tro.trang_thai = :trang_thai', {
          trang_thai: STATUS.ACTIVE,
        }),
      ['vai_tro.*', `nguoi_dung.ho_va_ten as nguoi_tao_ten_day_du`],
      [],
    );
  }

  /**
   * Lấy chi tiết vai trò
   * Merge quyền hiện tại của vai trò với quyền mặc định của hệ thống
   * để đảm bảo luôn hiển thị đủ các module/action
   */
  async findOne(id: number) {
    const role = await this.rolesRepository.findOneBy({
      id,
      trang_thai: STATUS.ACTIVE,
    });
    if (!role) {
      return null;
    }

    let permission_current = [];
    try {
      permission_current = JSON.parse(role.phan_quyen);
    } catch (e) {
      this.logger.error(`Lỗi parse phan_quyen role id ${id}`, e);
    }

    // Clone default permissions để không bị override biến global
    const permission_default = _.cloneDeep(permissions);

    permission_default.forEach((perDefault) => {
      const perm_db = permission_current.find(
        (perm) => perm.name == perDefault.name,
      );
      if (perm_db) {
        Object.keys(perDefault.actions).forEach((key) => {
          perDefault.actions[key] = perm_db.actions[key] || false;
        });
      }
    });

    return { ...role, phan_quyen: permission_default };
  }

  /**
   * Cập nhật vai trò
   */
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const data = { ...updateRoleDto };

    // Validate permission format
    if (data.phan_quyen && typeof data.phan_quyen === 'object') {
      data.phan_quyen = JSON.stringify(data.phan_quyen);
    }

    data.ngay_cap_nhat = new Date();
    await this.rolesRepository.update(id, data);
    return await this.rolesRepository.findOneBy({ id });
  }

  /**
   * Xóa vai trò (Soft Delete)
   */
  async remove(id: number) {
    if (id <= 3) {
      throw new HttpCoreException('Không thể xoá vai trò mặc định', '400');
    }

    // Soft delete: set trang_thai = INACTIVE
    return this.rolesRepository.update(id, {
      trang_thai: STATUS.INACTIVE,
      ngay_cap_nhat: new Date(),
    });
  }

  /**
   * Lấy danh sách options cho Select
   */
  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.rolesRepository
        .createQueryBuilder('vai_tro') // Alias rõ ràng tránh lỗi ambiguous
        .andWhere('vai_tro.trang_thai = :trang_thai', {
          trang_thai: STATUS.ACTIVE,
        }),
      ['vai_tro.id as value', `vai_tro.ten_vai_tro as label`], // Thêm alias
      [],
    );
  }
}
