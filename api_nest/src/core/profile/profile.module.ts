import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { UserService as ProfileService } from './profile.service';
import { UploadService } from 'src/upload/upload.service';
@Module({
  controllers: [ProfileController],
  providers: [ProfileService, UploadService],
  exports: [ProfileService],
})
export class ProfileModule {}
