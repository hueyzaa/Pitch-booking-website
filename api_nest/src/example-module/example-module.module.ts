import { Module } from '@nestjs/common';
import { ExampleModuleController } from './example-module.controller';
import { ExampleModuleService } from './example-module.service';

@Module({
  controllers: [ExampleModuleController],
  providers: [ExampleModuleService],
})
export class ExampleModuleModule {}
