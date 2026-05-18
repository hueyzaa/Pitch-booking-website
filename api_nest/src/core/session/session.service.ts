import {
  CORE_COMMON_ERROR,
  DATABASE_GENERAL_ERROR,
  HTTP_CODE,
} from '@configs/contanst';
import { HttpCoreException } from '@core/exceptions/core.exception';
import { NguoiDungThietBi } from '@database/entities/auth/nguoi-dung-thiet-bi.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/session.dto';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @InjectRepository(NguoiDungThietBi)
    private readonly nguoiDungThietBiRepo: Repository<NguoiDungThietBi>,
  ) {}

  async insertSession(createSessionDto: CreateSessionDto) {
    try {
      await this.nguoiDungThietBiRepo.save(createSessionDto);
    } catch (error) {
      if (
        new RegExp(DATABASE_GENERAL_ERROR.DUPLICATE_ENTRY).test(error.message)
      ) {
        //TODO Xử lý update lại
        await this.nguoiDungThietBiRepo.update(
          {
            nguoi_dung_id: createSessionDto.nguoi_dung_id,
            device_id: createSessionDto.device_id,
          },
          createSessionDto,
        );
      } else {
        throw new HttpCoreException(
          CORE_COMMON_ERROR.SAVE_SESSION_FAILED,
          HTTP_CODE.UNPROCESSABLE_CONTENT,
        );
      }
    }
  }

  async checkTokenInDB(nguoi_dung_id: number, access_token: string) {
    const check = await this.nguoiDungThietBiRepo.findOneBy({
      nguoi_dung_id,
      access_token,
    });
    if (!check) {
      return false;
    }
    return true;
  }

  //fix findOneByNguoiDungId
  async findOneByNguoiDungId(nguoi_dung_id: number) {
    return this.nguoiDungThietBiRepo.findOneBy({ nguoi_dung_id });
  }

  async removeSession(nguoi_dung_id: number, device_id: string) {
    return this.nguoiDungThietBiRepo.delete({ nguoi_dung_id, device_id });
  }

  async clearAllSession() {
    return this.nguoiDungThietBiRepo.clear();
  }

  async clearSessionByNguoiDungId(nguoi_dung_id: number) {
    return this.nguoiDungThietBiRepo.delete({ nguoi_dung_id });
  }

  /**
   * Hàm cập nhật firebase token cho người dùng
   * @param nguoi_dung_id ID của người dùng
   * @param firebase_token Token firebase cần cập nhật
   * @returns Kết quả cập nhật token
   */
  async updateFirebaseToken(nguoi_dung_id: number, firebase_token: string) {
    const existingToken = await this.nguoiDungThietBiRepo.findOneBy({
      nguoi_dung_id,
      firebase_token,
    });

    if (existingToken) return;

    const latestSession = await this.nguoiDungThietBiRepo.findOne({
      where: { nguoi_dung_id },
      order: { ngay_tao: 'DESC' },
    });

    if (latestSession) {
      await this.nguoiDungThietBiRepo.update(
        { id: latestSession.id },
        { firebase_token },
      );
    }
  }
}
