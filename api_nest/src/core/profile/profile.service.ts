import {
  CORE_COMMON_ERROR,
  CORE_COMMON_MESSAGE,
  DATABASE_GENERAL_ERROR,
  HTTP_CODE,
  STATUS,
} from '@configs/contanst';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { DatabaseService } from 'src/database/database.service';
import { NguoiDung } from 'src/database/entities/auth/nguoi-dung.entity';
import { HelperService } from 'src/helper/helper.service';
import { Repository } from 'typeorm';
import { HttpCoreException } from '../exceptions/core.exception';
import {
  ChangePasswordDto,
  UpdatePasswordDto,
  UpdateSelfDto,
} from './dto/profile.dto';
import { UserReqData } from '@core/users/interfaces/user-req.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly helperService: HelperService,
    @InjectRepository(NguoiDung)
    private nguoiDungRepo: Repository<NguoiDung>,
  ) {}

  async updateAvatar(id: number, path: string) {
    await this.nguoiDungRepo.update({ id }, { avatar: path });
    return this.findOneById(id);
  }
  // @params taiKhoan
  // @return người dùng
  async findOneByUserName(taiKhoan: string): Promise<NguoiDung> {
    //TODO Tìm người dùng từ DB

    const findUser = await this.nguoiDungRepo.findOne({
      where: [
        { tai_khoan: taiKhoan, trang_thai: STATUS.ACTIVE },
        { email: taiKhoan, trang_thai: STATUS.ACTIVE },
        { so_dien_thoai: taiKhoan, trang_thai: STATUS.ACTIVE },
      ],
      relations: { ma_vai_tro2: true },
    });

    if (!findUser) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE,
        HTTP_CODE.NOT_FOUND,
      );
    }

    const user = {
      ...findUser,
      phan_quyen: findUser.ma_vai_tro2.phan_quyen,
      ten_vai_tro: findUser.ma_vai_tro2.ten_vai_tro,
    };

    delete user.ma_vai_tro2;

    return user;
  }
  async findOneByUsernameOrEmailOrSDT(taiKhoan: string): Promise<NguoiDung> {
    //TODO Tìm người dùng từ DB

    const findUser = await this.nguoiDungRepo.findOne({
      where: [
        { tai_khoan: taiKhoan, trang_thai: STATUS.ACTIVE },
        { email: taiKhoan, trang_thai: STATUS.ACTIVE },
        { so_dien_thoai: taiKhoan, trang_thai: STATUS.ACTIVE },
      ],
      relations: {
        ma_vai_tro2: true,
        nguoi_dung_vai_tros: {
          vai_tro: true,
        },
      },
    });
    findUser.nguoi_dung_vai_tros = findUser.nguoi_dung_vai_tros.map((item) => {
      return {
        ...item,
        vai_tro: {
          ...item.vai_tro,
          phan_quyen: null,
        },
      };
    });
    if (!findUser) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE,
        HTTP_CODE.NOT_FOUND,
      );
    }

    const createUser = {
      ...findUser,
      phan_quyen: findUser.ma_vai_tro2.phan_quyen,
      ten_vai_tro: findUser.ma_vai_tro2.ten_vai_tro,
    };

    delete createUser.ma_vai_tro2;

    return createUser;
  }

  async findOneByEmail(email: string): Promise<NguoiDung> {
    //TODO Tìm người dùng từ DB

    const findUser = await this.nguoiDungRepo.findOne({
      where: { email: email, trang_thai: STATUS.ACTIVE },
      relations: { ma_vai_tro2: true },
    });

    if (!findUser) {
      throw new Error(CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE);
    }

    const createUser = {
      ...findUser,
      phan_quyen: findUser.ma_vai_tro2.phan_quyen,
      ten_vai_tro: findUser.ma_vai_tro2.ten_vai_tro,
    };

    delete createUser.ma_vai_tro2;

    return createUser;
  }

  async changePassword(tai_khoan: string, payload: ChangePasswordDto) {
    const findUser = await this.findOneByUsernameOrEmailOrSDT(tai_khoan);

    if (!payload.is_first_change) {
      if (!payload.mat_khau_hien_tai) {
        throw new HttpCoreException(
          CORE_COMMON_ERROR.NOT_FOUND_CURRENT_PASSWORD,
          HTTP_CODE.UNAUTHORIZED,
        );
      }
      const checkCurrentPass = await this.helperService.compareHashed(
        payload.mat_khau_hien_tai,
        findUser.mat_khau,
      );

      if (!checkCurrentPass) {
        throw new HttpCoreException(
          CORE_COMMON_ERROR.NOT_CORRECT_CURRENT_PASSWORD,
          HTTP_CODE.UNPROCESSABLE_CONTENT,
        );
      }
    } else {
      //TODO Kiểm tra lại trong db phòng trường hợp bị lợi dụng lỗ hỏng
      if (!findUser.need_change_password) {
        throw new HttpCoreException(
          CORE_COMMON_ERROR.PERMISSION_DENY,
          HTTP_CODE.UNAUTHORIZED,
        );
      }
    }

    const enbcrypt_pass = await this.helperService.genHashedPassword(
      payload.mat_khau_moi,
    );

    await this.nguoiDungRepo.update(findUser.id, {
      mat_khau: enbcrypt_pass,
      need_change_password: payload.is_first_change && 0,
      last_password_change: new Date(),
    });

    delete findUser.mat_khau;

    return CORE_COMMON_MESSAGE.CHANGE_PASSWORD_SUCCESS;
  }

  async updatePassword(user: UserReqData, payload: UpdatePasswordDto) {
    const validEmail = await this.findOneByEmail(user.email);
    if (validEmail.email !== user.email) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.INVALID_EMAIL,
        HTTP_CODE.FORBIDDEN,
      );
    }

    // Cap nhat mat khau moi
    const newPass = await this.helperService.genHashedPassword(
      payload.mat_khau_moi,
    );
    await this.updateNewPassword(validEmail.email, newPass);
    return CORE_COMMON_MESSAGE.RESET_PASSWORD_SUCCESS;
  }

  async findOneById(id: number) {
    const result = await this.nguoiDungRepo.findOneBy({
      id,
    });
    return result;
  }

  async update(id: number, updateSelfDto: UpdateSelfDto) {
    //TODO Kiểm tra xem có họ tên chưa để ghép lại
    if (!updateSelfDto.ho_va_ten) {
      updateSelfDto.ho_va_ten = `${updateSelfDto.ho} ${updateSelfDto.ten}`;
    }
    if (updateSelfDto.ngay_sinh) {
      updateSelfDto.ngay_sinh = moment(
        updateSelfDto.ngay_sinh,
        'YYYY-MM-DD',
      ).toDate();
    }

    try {
      await this.nguoiDungRepo.update(id, updateSelfDto);
      const user = await this.nguoiDungRepo.findOneBy({ id });
      return user;
    } catch (error) {
      if (
        new RegExp(DATABASE_GENERAL_ERROR.DUPLICATE_ENTRY).test(error.message)
      ) {
        throw new HttpCoreException(
          CORE_COMMON_ERROR.DUPLICATE_ENTRY,
          HTTP_CODE.UNPROCESSABLE_CONTENT,
        );
      } else
        throw new HttpCoreException(
          `${CORE_COMMON_ERROR.UNKNOWN_ERROR} ${error.message}`,
          HTTP_CODE.INTERNAL_ERROR,
        );
    }
  }

  async remove(id: number) {
    await this.nguoiDungRepo.update(
      { id: id },
      { trang_thai: STATUS.INACTIVE },
    );
    return CORE_COMMON_MESSAGE.DELETE_PASSWORD_SUCCESS;
  }

  async updateResetPassToken(tai_khoan: string, token: string) {
    return await this.nguoiDungRepo
      .createQueryBuilder()
      .update()
      .set({ reset_pass_token: token })
      .where('tai_khoan = :tai_khoan', { tai_khoan })
      .execute();
  }

  async updateNewPassword(email: string, newPass: string) {
    return await this.nguoiDungRepo
      .createQueryBuilder()
      .update()
      .set({
        mat_khau: newPass,
        last_password_change: new Date(),
        need_change_password: STATUS.INACTIVE,
      })
      .where('email = :email', { email })
      .execute();
  }
  // async updateLastPasswordChange(id: number) {
  //   const user = await this.nguoiDungRepo.findOneBy({ id });
  //   if (!user) {
  //     throw new HttpCoreException(
  //       CORE_COMMON_ERROR.NOT_FOUND,
  //       HTTP_CODE.NOT_FOUND,
  //     );
  //   }
  //   user.last_password_change = new Date();
  //   await this.nguoiDungRepo.save(user);
  // }
}
