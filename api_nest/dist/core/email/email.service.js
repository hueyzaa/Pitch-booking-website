"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let EmailService = class EmailService {
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    async sendResetPassEmail(nguoiDung, resetPassToken) {
        let url = this.configService.get('env.system_frontend_url');
        url =
            url +
                `/auth/new-password?token=${resetPassToken}&email=${nguoiDung.email}`;
        const systemName = this.configService.get('env.system_name');
        await this.mailerService.sendMail({
            to: [nguoiDung.email],
            subject: `${systemName} : Đặt lại mật khẩu`,
            template: './reset-pass',
            context: {
                ho_va_ten: nguoiDung.ho_va_ten,
                url: url,
            },
        });
    }
    async sendWelcomeEmail(nguoiDung) {
        const url = this.configService.get('env.system_frontend_url');
        const systemName = this.configService.get('env.system_name');
        await this.mailerService.sendMail({
            to: [nguoiDung.email],
            subject: `${systemName} : Tài khoản của bạn đã được tạo`,
            template: './create-user',
            context: {
                ho_va_ten: nguoiDung.ho_va_ten,
                url: url,
            },
        });
    }
    async sendUpdatePassEmail(nguoiDung, resetPassToken) {
        let url = this.configService.get('env.system_frontend_url');
        url =
            url +
                `/auth/new-password?token=${resetPassToken}&email=${nguoiDung.email}`;
        const systemName = this.configService.get('env.system_name');
        await this.mailerService.sendMail({
            to: [nguoiDung.email],
            subject: `${systemName} : Đặt lại mật khẩu]`,
            template: './update-pass',
            context: {
                ho_va_ten: nguoiDung.ho_va_ten,
                url: url,
            },
        });
    }
    async sendOtpEmail(nguoiDung, otp) {
        const systemName = this.configService.get('env.system_name');
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
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map