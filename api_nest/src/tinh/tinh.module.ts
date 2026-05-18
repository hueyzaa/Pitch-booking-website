import { Module, Global } from '@nestjs/common';
import { TinhService } from './tinh.service';
import { TinhController } from './tinh.controller';

@Global()
@Module({
  imports: [],
  controllers: [TinhController],
  providers: [TinhService],
  exports: [TinhService],
})
export class TinhModule {}
