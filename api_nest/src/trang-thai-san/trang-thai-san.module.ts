import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrangThaiSanService } from './trang-thai-san.service';
import { TrangThaiSanController } from './trang-thai-san.controller';
import { TrangThaiSan } from '../database/entities/trang-thai-san.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TrangThaiSan])],
  controllers: [TrangThaiSanController],
  providers: [TrangThaiSanService],
  exports: [TrangThaiSanService],
})
export class TrangThaiSanModule {}
