import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanhGiaService } from './danh-gia.service';
import { DanhGiaController } from './danh-gia.controller';
import { DanhGia } from '../database/entities/danh-gia.entity';
import { NguoiDung } from '../database/entities/auth/nguoi-dung.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([DanhGia, NguoiDung])
  ],
  controllers: [DanhGiaController],
  providers: [DanhGiaService],
  exports: [DanhGiaService],
})
export class DanhGiaModule {}
