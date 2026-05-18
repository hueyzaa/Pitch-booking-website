import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';
import { UsersService } from '@core/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
import { Repository } from 'typeorm';
import { EmailService } from '@core/email/email.service';
import { GlobalConfigService } from '@core/globalconfig/globalConfig.service';
import { UserService } from '@core/profile/profile.service';
import { AuthService } from '@core/auth/auth.service';
import { STATUS } from '@configs/contanst';

@Injectable()
export class PasswordCheckCronService {
  private readonly logger = new Logger(PasswordCheckCronService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly globalConfigService: GlobalConfigService,
    private readonly authService: AuthService,
    @InjectRepository(NguoiDung)
    private readonly nguoiDungRepo: Repository<NguoiDung>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Chạy vào 00:00 hàng ngày
  async handleCron() {
    this.logger.log('Starting password check job');
    const [check_valid_pass, pass_valid_time] = await Promise.all([
      this.globalConfigService
        .getConfigByKeyCache('CHECK_VALID_PASS')
        .catch(() => '0'),
      this.globalConfigService
        .getConfigByKeyCache('PASS_VALID_TIME')
        .catch(() => '30'),
    ]);
    // Lấy danh sách tất cả người dùng từ DB
    const users = await this.nguoiDungRepo.find({
      where: {
        trang_thai: STATUS.ACTIVE,
      },
    });

    if (Number(check_valid_pass) === 1) {
      for (const user of users) {
        const lastPasswordChange = user.last_password_change;
        const daysSinceLastChange = moment().diff(
          moment(lastPasswordChange),
          'days',
        );
        // kiểm tra nếu đã đổi mk và đã quá thời gian thời gian mật khẩu hợp lệ
        if (
          lastPasswordChange &&
          daysSinceLastChange >= Number(pass_valid_time)
        ) {
          const token = await this.authService.generateUpdatePassToken(user);
          await this.userService.updateResetPassToken(user.tai_khoan, token);
          await this.usersService.updateNeedChangePassword(user.id);

          // Gửi email link đổi mật khẩu mới
          await this.emailService.sendUpdatePassEmail(user, token);
          this.logger.log(`Password update email sent for user: ${user.email}`);
        }
      }
    }

    this.logger.log('Password check job completed');
  }
}
