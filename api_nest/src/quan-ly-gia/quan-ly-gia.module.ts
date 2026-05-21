import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuanLyGiaService } from './quan-ly-gia.service';
import { QuanLyGiaController } from './quan-ly-gia.controller';
import { QuanLyGia } from '../database/entities/quan-ly-gia.entity';
import { DoiTuong } from '../database/entities/doi-tuong.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([QuanLyGia, DoiTuong])],
  controllers: [QuanLyGiaController],
  providers: [QuanLyGiaService],
  exports: [QuanLyGiaService],
})
export class QuanLyGiaModule {}
