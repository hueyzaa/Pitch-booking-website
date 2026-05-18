import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendResetPassEmail(nguoiDung: NguoiDung, resetPassToken: string) {
    let url = this.configService.get<string>('env.system_frontend_url');
    url =
      url +
      `/auth/new-password?token=${resetPassToken}&email=${nguoiDung.email}`;
    const systemName = this.configService.get<string>('env.system_name');

    await this.mailerService.sendMail({
      to: [nguoiDung.email],
      //TODO Change Here
      subject: `${systemName} : Đặt lại mật khẩu`,
      template: './reset-pass',
      context: {
        ho_va_ten: nguoiDung.ho_va_ten,
        url: url,
      },
    });
  }

  async sendWelcomeEmail(nguoiDung: NguoiDung) {
    const url = this.configService.get<string>('env.system_frontend_url');
    const systemName = this.configService.get<string>('env.system_name');

    await this.mailerService.sendMail({
      to: [nguoiDung.email],
      //TODO Change Here
      subject: `${systemName} : Tài khoản của bạn đã được tạo`,
      template: './create-user',
      context: {
        ho_va_ten: nguoiDung.ho_va_ten,
        url: url,
      },
    });
  }

  async sendUpdatePassEmail(nguoiDung: NguoiDung, resetPassToken: string) {
    let url = this.configService.get<string>('env.system_frontend_url');
    url =
      url +
      `/auth/new-password?token=${resetPassToken}&email=${nguoiDung.email}`;
    const systemName = this.configService.get<string>('env.system_name');
    await this.mailerService.sendMail({
      to: [nguoiDung.email],
      //TODO Change Here
      subject: `${systemName} : Đặt lại mật khẩu]`,
      template: './update-pass',
      context: {
        ho_va_ten: nguoiDung.ho_va_ten,
        url: url,
      },
    });
  }

  async sendOtpEmail(nguoiDung: NguoiDung, otp: string) {
    const systemName = this.configService.get<string>('env.system_name');
    await this.mailerService.sendMail({
      to: [nguoiDung.email],
      subject: `${systemName} : Xác thực OTP`,
      template: './verify-otp',
      context: {
        ho_va_ten: nguoiDung.ho_va_ten,
        otp: otp,
      },
    });
  }

  // async sendResetPassEmail(email: string, resetPassToken: string) {
  //   let url = this.configService.get<string>('env.mail.resetPassUrl');
  //   url = url.replace('[TOKEN]', resetPassToken);
  //   await this.mailerService.sendMail({
  //     to: [email],
  //     //TODO Change Here
  //     subject: '[School9] Reset password',
  //     template: './reset-pass',
  //     context: {
  //       email: email,
  //       url: url,
  //     },
  //   });
  // }
}
