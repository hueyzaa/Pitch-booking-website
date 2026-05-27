import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanhGiaService } from './danh-gia.service';
import { DanhGiaController } from './danh-gia.controller';
import { DanhGia } from '../database/entities/danh-gia.entity';
import { KhachHang } from '../database/entities/khach-hang.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([DanhGia, KhachHang])
  ],
  controllers: [DanhGiaController],
  providers: [DanhGiaService],
  exports: [DanhGiaService],
})
export class DanhGiaModule {}
