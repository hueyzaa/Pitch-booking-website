import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BangGiaService } from './bang-gia.service';
import { BangGiaController } from './bang-gia.controller';
import { BangGia } from '../database/entities/bang-gia.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([BangGia])],
  controllers: [BangGiaController],
  providers: [BangGiaService],
  exports: [BangGiaService],
})
export class BangGiaModule {}
