import { Module, Global } from '@nestjs/common';
import { DoiTuongService } from './doi-tuong.service';
import { DoiTuongController } from './doi-tuong.controller';

@Global()
@Module({
  imports: [],
  controllers: [DoiTuongController],
  providers: [DoiTuongService],
  exports: [DoiTuongService],
})
export class DoiTuongModule {}
