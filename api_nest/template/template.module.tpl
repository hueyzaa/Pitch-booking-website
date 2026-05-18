import { Module, Global } from '@nestjs/common';
import { [ModuleName]Service } from './[module-name].service';
import { [ModuleName]Controller } from './[module-name].controller';

@Global()
@Module({
  imports: [],
  controllers: [[ModuleName]Controller],
  providers: [[ModuleName]Service],
  exports: [[ModuleName]Service],
})
export class [ModuleName]Module {}
