import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { UserReq } from '../decorators/user.decorator';
import { UserReqData } from '../users/interfaces/user-req.interface';
import {
  ChangePasswordDto,
  UpdatePasswordDto,
  UpdateSelfDto,
} from './dto/profile.dto';
import { UserService as ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  //TODO: Import Excel
  @HttpCode(200)
  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
    }),
  )
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @UserReq() user: UserReqData,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    // Chuyển file sang Base64 data URI
    const sharp = require('sharp');
    const resizedBuffer = await sharp(file.buffer)
      .resize({ width: 512, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();
    const base64Avatar = `data:image/jpeg;base64,${resizedBuffer.toString(
      'base64',
    )}`;

    return this.profileService.updateAvatar(user.id, base64Avatar);
  }

  @HttpCode(200)
  @Get()
  getProfile(@UserReq() user: UserReqData) {
    return this.profileService.findOneByUsernameOrEmailOrSDT(user.tai_khoan);
  }

  @HttpCode(200)
  @Patch()
  update(@UserReq() user: UserReqData, @Body() updateSelfDto: UpdateSelfDto) {
    return this.profileService.update(user.id, updateSelfDto);
  }

  @HttpCode(200)
  @Patch('/change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @UserReq() user: UserReqData,
  ) {
    return this.profileService.changePassword(
      user.tai_khoan,
      changePasswordDto,
    );
  }

  @HttpCode(200)
  @Patch('/update-password')
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @UserReq() user: UserReqData,
  ) {
    return this.profileService.updatePassword(user, updatePasswordDto);
  }

  @HttpCode(200)
  @Delete('')
  remove(@UserReq() user: UserReqData) {
    return this.profileService.remove(user.id);
  }
}
