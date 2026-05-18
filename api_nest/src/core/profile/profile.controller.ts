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
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserReq } from '../decorators/user.decorator';
import { UserReqData } from '../users/interfaces/user-req.interface';
import {
  ChangePasswordDto,
  UpdatePasswordDto,
  UpdateSelfDto,
} from './dto/profile.dto';
import { UserService as ProfileService } from './profile.service';
import { UploadService } from 'src/upload/upload.service';
import { LOAI_FILE } from '@configs/contanst';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly uploadService: UploadService,
  ) {}

  //TODO: Import Excel
  @HttpCode(200)
  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './secret/uploads/avatar',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @UserReq() user: UserReqData,
  ) {
    const data = {
      original_name: file.originalname,
      file_path: file.destination.replace(/^./, '') + '/' + file.filename,
      mime_type: file.mimetype,
      destination: file.destination,
      file_name: file.filename,
      path: file.path,
      size: file.size,
      file_type: file.mimetype,
      loai_file: LOAI_FILE.SECRET,
      nguoi_tao: user.id,
      nguoi_cap_nhat: user.id,
    };
    this.uploadService.create(data);

    return this.profileService.updateAvatar(user.id, data.file_path);
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
