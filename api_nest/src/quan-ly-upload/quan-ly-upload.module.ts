import { Module, Global } from '@nestjs/common';
import { QuanLyUploadService } from './quan-ly-upload.service';
import { QuanLyUploadController } from './quan-ly-upload.controller';

@Global()
@Module({
  imports: [],
  controllers: [QuanLyUploadController],
  providers: [QuanLyUploadService],
  exports: [QuanLyUploadService],
})
export class QuanLyUploadModule {}
