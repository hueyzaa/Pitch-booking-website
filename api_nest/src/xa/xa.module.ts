import { Module, Global } from '@nestjs/common';
import { XaService } from './xa.service';
import { XaController } from './xa.controller';

@Global()
@Module({
  imports: [],
  controllers: [XaController],
  providers: [XaService],
  exports: [XaService],
})
export class XaModule {}
