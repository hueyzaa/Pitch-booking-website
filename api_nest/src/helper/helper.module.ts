import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HelperService } from './helper.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('env.jwt_secret_key'),
      }),
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  providers: [HelperService],
  exports: [HelperService],
})
export class HelperModule {}
