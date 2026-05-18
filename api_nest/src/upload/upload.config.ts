import { diskStorage } from 'multer';
import { extname } from 'path';
import * as multer from 'multer';

export const UPLOAD_DIR = {
  PUBLIC: './public/uploads',
  SECRET: './secret/uploads',
};

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
];

export const FILE_SIZE_LIMIT = {
  DEFAULT: 5 * 1024 * 1024, // 5MB
  IMAGE: 25 * 1024 * 1024, // 25MB
};

export const createMulterOptions = (
  destination: string,
  fileSizeLimit = FILE_SIZE_LIMIT.DEFAULT,
) => ({
  storage: diskStorage({
    destination,
    filename: (req, file, cb) => {
      const randomName = Date.now();
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error('File type not supported'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: fileSizeLimit,
  },
});

export const createMemoryMulterOptions = () => ({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error('Chỉ hỗ trợ jpeg, png, pdf'), false);
    }
    cb(null, true);
  },
});
