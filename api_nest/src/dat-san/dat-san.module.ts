import { Module, Global } from '@nestjs/common';
import { DatSanService } from './dat-san.service';
import { DatSanController } from './dat-san.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DatSan } from 'src/database/entities/dat-san.entity';
import { ThuChi } from 'src/database/entities/thu-chi.entity';
import { DoiTuong } from 'src/database/entities/doi-tuong.entity';
import { QuanLyGia } from 'src/database/entities/quan-ly-gia.entity';
import { TrangThaiSan } from 'src/database/entities/trang-thai-san.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([DatSan, ThuChi, DoiTuong, QuanLyGia, TrangThaiSan])],
  controllers: [DatSanController],
  providers: [DatSanService],
  exports: [DatSanService],
})
export class DatSanModule {}
