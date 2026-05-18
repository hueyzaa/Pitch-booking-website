import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly mailerService;
    private readonly configService;
    constructor(mailerService: MailerService, configService: ConfigService);
    sendResetPassEmail(nguoiDung: NguoiDung, resetPassToken: string): Promise<void>;
    sendWelcomeEmail(nguoiDung: NguoiDung): Promise<void>;
    sendUpdatePassEmail(nguoiDung: NguoiDung, resetPassToken: string): Promise<void>;
    sendOtpEmail(nguoiDung: NguoiDung, otp: string): Promise<void>;
}
