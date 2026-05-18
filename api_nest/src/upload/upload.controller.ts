import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { LOAI_FILE } from '@configs/contanst';
import { UserReq } from '@core/decorators/user.decorator';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import {
  createMulterOptions,
  createMemoryMulterOptions,
  UPLOAD_DIR,
} from './upload.config';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @HttpCode(200)
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, createMulterOptions(UPLOAD_DIR.PUBLIC)),
  )
  async createMultifile(
    @UserReq() user: UserReqData,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (!files || files.length === 0) {
      throw new Error('No files uploaded');
    }

    const result = await Promise.all(
      files.map((file) =>
        this.uploadService.saveFileMetadata(file, user.id, LOAI_FILE.PUBLIC),
      ),
    );

    return {
      message: 'Tải lên thành công',
      files: result,
    };
  }

  @HttpCode(200)
  @Post()
  @UseInterceptors(FileInterceptor('file', createMemoryMulterOptions()))
  async create(
    @UserReq() user: UserReqData,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Service handles validation, resizing, saving logic for memory file
    return this.uploadService.saveFileFromMemory(file, user.id, true);
  }

  @HttpCode(200)
  @Post('secret/multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, createMulterOptions(UPLOAD_DIR.SECRET)),
  )
  async createMultifileSecret(
    @UserReq() user: UserReqData,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (!files || files.length === 0) {
      throw new Error('No files uploaded');
    }

    const result = await Promise.all(
      files.map((file) =>
        this.uploadService.saveFileMetadata(file, user.id, LOAI_FILE.SECRET),
      ),
    );

    return {
      message: 'Tải lên thành công',
      files: result,
    };
  }

  @HttpCode(200)
  @Post('secret')
  @UseInterceptors(
    FileInterceptor('file', createMulterOptions(UPLOAD_DIR.SECRET)),
  )
  async createSecret(
    @UserReq() user: UserReqData,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    return this.uploadService.saveFileMetadata(file, user.id, LOAI_FILE.SECRET);
  }
}
