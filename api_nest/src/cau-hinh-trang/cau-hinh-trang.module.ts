import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CauHinhTrang } from '@database/entities/system/cau-hinh-trang.entity';
import { CauHinhTrangController } from './cau-hinh-trang.controller';
import { CauHinhTrangService } from './cau-hinh-trang.service';

@Module({
  imports: [TypeOrmModule.forFeature([CauHinhTrang])],
  controllers: [CauHinhTrangController],
  providers: [CauHinhTrangService],
})
export class CauHinhTrangModule {}
