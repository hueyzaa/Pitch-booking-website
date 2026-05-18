import { QuanLyUpload } from '@database/entities/system/quan-ly-upload.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as sharp from 'sharp';
import { LOAI_FILE, HTTP_CODE, CORE_COMMON_ERROR } from '@configs/contanst';
import { HttpCoreException } from '@core/exceptions/core.exception';
import { UPLOAD_DIR, FILE_SIZE_LIMIT } from './upload.config';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(
    @InjectRepository(QuanLyUpload)
    private readonly quanLyUploadRepository: Repository<QuanLyUpload>,
  ) {}

  async create(quanLyUpload: Partial<QuanLyUpload>[] | Partial<QuanLyUpload>) {
    return this.quanLyUploadRepository.insert(quanLyUpload);
  }

  /**
   * Process and save a file from memory (single file upload)
   */
  async saveFileFromMemory(
    file: Express.Multer.File,
    userId: number,
    isPublic = true,
  ) {
    if (!file) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.FILE_NOT_FOUND,
        HTTP_CODE.BAD_REQUEST,
      );
    }

    const isImage = file.mimetype.startsWith('image/');
    const maxSize = isImage ? FILE_SIZE_LIMIT.IMAGE : FILE_SIZE_LIMIT.DEFAULT;

    if (file.size > maxSize) {
      throw new HttpCoreException(
        `File vượt quá dung lượng cho phép ${isImage ? '25MB' : '5MB'}`,
        HTTP_CODE.BAD_REQUEST,
      );
    }

    const uploadDir = isPublic ? UPLOAD_DIR.PUBLIC : UPLOAD_DIR.SECRET;
    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const finalFilename =
      'upload-' +
      Date.now() +
      (isImage ? '.jpeg' : path.extname(file.originalname));
    const finalPath = path.join(uploadDir, finalFilename);

    if (isImage) {
      await sharp(file.buffer)
        .resize({ width: 1024, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(finalPath);
    } else {
      await fs.writeFile(finalPath, new Uint8Array(file.buffer));
    }

    const stat = await fs.stat(finalPath);

    // Standardize path: remove leading '.' to make it absolute-like related to root
    // ./public/uploads -> /public/uploads
    const relativePath = uploadDir.replace(/^\./, '');
    const webPath = path.join(relativePath, finalFilename).replace(/\\/g, '/');

    const data: Partial<QuanLyUpload> = {
      original_name: file.originalname,
      file_path: webPath,
      mime_type: isImage ? 'image/jpeg' : file.mimetype,
      destination: uploadDir,
      file_name: finalFilename,
      path: finalPath,
      size: stat.size,
      file_type: isImage ? 'image/jpeg' : file.mimetype,
      loai_file: isPublic ? LOAI_FILE.PUBLIC : LOAI_FILE.SECRET,
      nguoi_tao: userId,
      nguoi_cap_nhat: userId,
    };

    await this.create(data);
    return data;
  }

  /**
   * Save metadata for file already saved to disk (multiple upload)
   */
  async saveFileMetadata(
    file: Express.Multer.File,
    userId: number,
    loaiFile: string,
  ) {
    // file.destination is like './public/uploads'
    const relativePath = file.destination.replace(/^\./, '');
    const webPath = path.join(relativePath, file.filename).replace(/\\/g, '/');

    const data: Partial<QuanLyUpload> = {
      original_name: file.originalname,
      file_path: webPath,
      mime_type: file.mimetype,
      destination: file.destination,
      file_name: file.filename,
      path: file.path,
      size: file.size,
      file_type: file.mimetype,
      loai_file: loaiFile,
      nguoi_tao: userId,
      nguoi_cap_nhat: userId,
    };

    await this.create(data);
    return data;
  }
}
