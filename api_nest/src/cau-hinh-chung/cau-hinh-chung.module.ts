import { Module, Global } from '@nestjs/common';
import { CauHinhChungService } from './cau-hinh-chung.service';
import { CauHinhChungController } from './cau-hinh-chung.controller';

@Global()
@Module({
  imports: [],
  controllers: [CauHinhChungController],
  providers: [CauHinhChungService],
  exports: [CauHinhChungService],
})
export class CauHinhChungModule {}
