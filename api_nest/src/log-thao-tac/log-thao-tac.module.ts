import { Module, Global } from '@nestjs/common';
import { LogThaoTacService } from './log-thao-tac.service';
import { LogThaoTacController } from './log-thao-tac.controller';

@Global()
@Module({
  imports: [],
  controllers: [LogThaoTacController],
  providers: [LogThaoTacService],
  exports: [LogThaoTacService],
})
export class LogThaoTacModule {}
