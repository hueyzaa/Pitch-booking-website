import { Module, Global } from '@nestjs/common';
import { SanService } from './san.service';
import { SanController } from './san.controller';

@Global()
@Module({
  imports: [],
  controllers: [SanController],
  providers: [SanService],
  exports: [SanService],
})
export class SanModule {}
