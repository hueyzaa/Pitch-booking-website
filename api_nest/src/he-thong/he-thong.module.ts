import { Module, Global } from '@nestjs/common';
import { HeThongService } from './he-thong.service';
import { HeThongController } from './he-thong.controller';

@Global()
@Module({
  imports: [],
  controllers: [HeThongController],
  providers: [HeThongService],
  exports: [HeThongService],
})
export class HeThongModule {}
