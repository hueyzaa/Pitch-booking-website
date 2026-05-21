import { Module, Global } from '@nestjs/common';
import { LoaiSanService } from './loai-san.service';
import { LoaiSanController } from './loai-san.controller';

@Global()
@Module({
  imports: [],
  controllers: [LoaiSanController],
  providers: [LoaiSanService],
  exports: [LoaiSanService],
})
export class LoaiSanModule {}
