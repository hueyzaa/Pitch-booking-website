import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { GlobalConfigService } from './globalconfig/globalConfig.service';
import { SessionService } from './session/session.service';
@Global()
@Module({
  imports: [AuthModule, EmailModule],
  providers: [GlobalConfigService, SessionService],
  exports: [GlobalConfigService, SessionService],
})
export class CoreModule {}
