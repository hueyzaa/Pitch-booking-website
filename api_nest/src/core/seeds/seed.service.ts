import { GENDER, ROLE, STATUS } from '@configs/contanst';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { permissions } from 'src/configs/permission.config';
import { NguoiDung } from 'src/database/entities/auth/nguoi-dung.entity';
import { VaiTro } from 'src/database/entities/auth/vai-tro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(VaiTro)
    private readonly roleRepository: Repository<VaiTro>,
    @InjectRepository(NguoiDung)
    private readonly userRepository: Repository<NguoiDung>,
  ) {
    this.seedRoles();
    this.seedUsers();
  }

  async seedRoles() {
    const rolesSeed = [
      {
        id: 1,
        ma_vai_tro: ROLE.ADMIN,
        ten_vai_tro: 'Admin',
        phan_quyen: JSON.stringify(permissions),
        trang_thai: STATUS.ACTIVE,
        nguoi_tao: 1,
      },
      {
        id: 2,
        ma_vai_tro: ROLE.USER,
        ten_vai_tro: 'User',
        phan_quyen: JSON.stringify(permissions),
        trang_thai: STATUS.ACTIVE,
        nguoi_tao: 1,
      },
    ];
    try {
      for (const element of rolesSeed) {
        try {
          await this.roleRepository.save(element);
        } catch (error) {
          if (!/Duplicate entry/.test(error.message)) {
            this.logger.error(error.stack);
          }
        }
      }

      this.logger.debug('@seedRoles > OK');
    } catch (error) {
      this.logger.error('@seedRoles > ' + error.stack);
    }
  }

  async seedUsers() {
    const enbcrypt_pass = await this.genHashedPassword('Abc@1234!');
    const seedUser = [
      {
        ho: 'Super',
        ten: 'Admin',
        ho_va_ten: 'Super Admin',
        ngay_sinh: new Date(),
        gioi_tinh: GENDER.MALE,
        dia_chi: 'Toà nhà MobiFone',
        tinh_id: 7210,
        huyen_id: 59489,
        xa_id: 1448569,
        tai_khoan: 'ADMIN',
        mat_khau: enbcrypt_pass,
        email: 'Admin@gmail.com',
        so_dien_thoai: '0939123456',
        ma_vai_tro: ROLE.ADMIN,
        nguoi_tao: 0,
        nguoi_cap_nhat: 0,
      },
      {
        ho: 'Nguoi',
        ten: 'Dung',
        ho_va_ten: 'Nguoi Dung',
        ngay_sinh: new Date(),
        gioi_tinh: GENDER.MALE,
        dia_chi: 'Toà nhà MobiFone',
        tinh_id: 7210,
        huyen_id: 59489,
        xa_id: 1448569,
        tai_khoan: 'USER',
        mat_khau: enbcrypt_pass,
        email: 'user@gmail.com',
        so_dien_thoai: '0939123456',
        ma_vai_tro: ROLE.USER,
        nguoi_tao: 0,
        nguoi_cap_nhat: 0,
      },
      {
        ho: 'Nguoi',
        ten: 'Dung 01',
        ho_va_ten: 'Nguoi Dung 01',
        ngay_sinh: new Date(),
        gioi_tinh: GENDER.MALE,
        dia_chi: 'Toà nhà MobiFone',
        tinh_id: 7210,
        huyen_id: 59489,
        xa_id: 1448569,
        tai_khoan: 'USER01',
        mat_khau: enbcrypt_pass,
        email: 'user01@gmail.com',
        so_dien_thoai: '0939123456',
        ma_vai_tro: ROLE.USER,
        nguoi_tao: 0,
        nguoi_cap_nhat: 0,
      },
    ];
    try {
      for (const element of seedUser) {
        try {
          await this.userRepository.save(element);
        } catch (error) {
          if (!/Duplicate entry/.test(error.message)) {
            this.logger.error(error.stack);
          }
        }
      }

      this.logger.debug('@seedUsers > OK');
    } catch (error) {
      this.logger.error('@seedUsers > ' + error.stack);
    }
  }
  async genHashedPassword(pass: string) {
    const enbcrypt_pass = await bcrypt.hash(pass, 12);
    return enbcrypt_pass;
  }
}
