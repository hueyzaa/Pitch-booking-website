// System
import { LogThaoTac } from './entities/system/log-thao-tac.entity';
import { CauHinhChung } from './entities/system/cau-hinh-chung.entity';
import { Log } from './entities/system/log.entity';
import { ThongBao } from './entities/system/thong-bao.entity';
import { CauHinhTrang } from './entities/system/cau-hinh-trang.entity';
import { HeThong } from './entities/system/he-thong.entity';
import { QuanLyUpload } from './entities/system/quan-ly-upload.entity';
import { QuanLyUploadPermission } from './entities/system/quan-ly-upload-permission.entity';

// Auth
import { NguoiDungThietBi } from './entities/auth/nguoi-dung-thiet-bi.entity';
import { NguoiDung } from './entities/auth/nguoi-dung.entity';
import { VaiTro } from './entities/auth/vai-tro.entity';
import { NguoiDungVaiTro } from './entities/auth/nguoi-dung-vai-tro.entity';

// Common
import { Tinh } from './entities/common/tinh.entity';
import { Xa } from './entities/common/xa.entity';

import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { LoaiSan } from './entities/loai-san.entity';
import { San } from './entities/san.entity';
import { DoiTuong } from './entities/doi-tuong.entity';


import { QuanLyGia } from './entities/quan-ly-gia.entity';
import { ThuChi } from './entities/thu-chi.entity';
import { TrangThaiSan } from './entities/trang-thai-san.entity';
import { DatSan } from './entities/dat-san.entity';
import { DanhGia } from './entities/danh-gia.entity';
/*IMPORT_OTHER_ENTITY_HERE*/

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      NguoiDungThietBi,
      NguoiDung,
      VaiTro,
      CauHinhChung,
      Tinh,
      Xa,
      ThongBao,
      Log,
      LogThaoTac,
      CauHinhTrang,
      HeThong,
      QuanLyUpload,
      QuanLyUploadPermission,
      NguoiDungVaiTro,
      LoaiSan,
      San,
      DoiTuong,


      QuanLyGia,
      ThuChi,
      TrangThaiSan,
      DatSan,
      DanhGia,
      /*ADD_OTHER_ENTITY_HERE*/
    ]),
  ],
  providers: [DatabaseService],
  exports: [TypeOrmModule, DatabaseService],
})
export class DatabaseModule {}
