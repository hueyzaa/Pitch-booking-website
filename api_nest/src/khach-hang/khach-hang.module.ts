import { Module, Global } from '@nestjs/common';
import { KhachHangService } from './khach-hang.service';
import { KhachHangController } from './khach-hang.controller';

@Global()
@Module({
  imports: [],
  controllers: [KhachHangController],
  providers: [KhachHangService],
  exports: [KhachHangService],
})
export class KhachHangModule {}
