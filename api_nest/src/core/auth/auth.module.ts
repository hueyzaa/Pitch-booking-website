import { SessionService } from '@core/session/session.service';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from '../profile/profile.module';
import { UserService } from '../profile/profile.service';
import { RoleModule } from '../role/role.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OtpService } from '@core/otp/otp.service';

@Global()
@Module({
  imports: [
    ProfileModule,
    RoleModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('env.jwt_secret_key'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, SessionService, OtpService],
  exports: [AuthService, UserService],
})
export class AuthModule {}
