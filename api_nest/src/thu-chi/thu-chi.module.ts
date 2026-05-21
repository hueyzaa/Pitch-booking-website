import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThuChiService } from './thu-chi.service';
import { ThuChiController } from './thu-chi.controller';
import { ThuChi } from '../database/entities/thu-chi.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ThuChi])],
  controllers: [ThuChiController],
  providers: [ThuChiService],
  exports: [ThuChiService],
})
export class ThuChiModule {}
