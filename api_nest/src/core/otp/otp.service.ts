import { CORE_COMMON_ERROR, HTTP_CODE, STATUS } from '@configs/contanst';
import { EmailService } from '@core/email/email.service';
import { HttpCoreException } from '@core/exceptions/core.exception';
import { UserService } from '@core/profile/profile.service';
import { CreateSessionDto } from '@core/session/dto/session.dto';
import { SessionService } from '@core/session/session.service';
import { UsersService } from '@core/users/users.service';
import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
import { HelperService } from '@helper/helper.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import * as speakeasy from 'speakeasy';

@Injectable()
@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly sessionService: SessionService,
    private readonly helperService: HelperService,
    private readonly configService: ConfigService,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async generateSecretKey(user: NguoiDung) {
    const secretKey = speakeasy.generateSecret({
      name: user.tai_khoan,
      length: 20,
    });

    await this.usersService.updateOtpSecret(user.id, secretKey.base32);
    return secretKey.base32;
  }

  async generateOtp(user: NguoiDung) {
    const step = 60;
    const otp = speakeasy.totp({
      secret: user.otp_secret,
      encoding: 'base32',
      step,
    });
    const version = new Date().getTime(); // Sử dụng timestamp để làm phiên bản
    const otpKey = `otp:${user.id}`;
    await this.cacheManager.set(
      otpKey,
      JSON.stringify({
        otp,
        version,
      }),
      step * 1000, // TTL là 60 giây
    );
    const currentTime = Math.floor(Date.now() / 1000);
    const expiresIn = currentTime + step;
    return { otp, expiresIn: expiresIn * 1000 };
  }
  async handleOtp(user: NguoiDung) {
    if (!user.otp_secret) {
      await this.generateSecretKey(user);

      user = await this.userService.findOneById(user.id);
    }

    // Tạo mã OTP từ secret
    const { otp, expiresIn } = await this.generateOtp(user);
    await this.emailService.sendOtpEmail(user, otp);
    return { otp, expiresIn };
  }

  async verifyOtp(inputOtp: string, user: NguoiDung, device_id: string) {
    const otpKey = `otp:${user.id}`;
    const storedData = await this.cacheManager.get<string>(otpKey);

    if (!storedData) {
      throw new Error('OTP đã hết hạn hoặc không hợp lệ');
    }
    const { otp } = JSON.parse(storedData);
    if (inputOtp !== otp) {
      throw new Error('OTP không hợp lệ');
    }
    const step = 60;
    const isVerified = speakeasy.totp.verify({
      secret: user.otp_secret,
      token: otp,
      encoding: 'base32',
      step,
      window: 3,
    });
    if (!isVerified) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.INVALID_OTP,
        HTTP_CODE.UNAUTHORIZED,
      );
    }
    await this.usersService.updateIsOtpVerify(user.id, STATUS.ACTIVE);
    const findUser = await this.userService.findOneByUsernameOrEmailOrSDT(
      user.tai_khoan,
    );
    const expiresTime: string = this.configService.get<string>(
      'env.jwt_expires_time',
    );
    const token: string = await this.helperService.signJWTToken(findUser, {
      expiresIn: expiresTime,
    });
    const createSessionDto = new CreateSessionDto();
    createSessionDto.nguoi_dung_id = findUser.id;
    createSessionDto.access_token = token;
    createSessionDto.firebase_token = '';
    createSessionDto.device_id = device_id || '';
    createSessionDto.nguoi_tao = findUser.id;
    createSessionDto.nguoi_cap_nhat = findUser.id;
    await this.sessionService.insertSession(createSessionDto);
    await this.cacheManager.del(otpKey);
    return { ...findUser, token, isVerified };
  }
}
