import { HttpCoreException } from '@core/exceptions/core.exception';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';
import * as moment from 'moment';
import { ALLOWED_EXCEL_MIME_TYPES } from '../constants/users.constants';

/**
 * Multer storage configuration for Excel file uploads
 */
export const excelFileUploadConfig = {
  storage: diskStorage({
    destination: 'public/imports',
    filename: (_req, file, cb) => {
      // Validate MIME type
      if (!ALLOWED_EXCEL_MIME_TYPES.includes(file.mimetype as any)) {
        return cb(
          new HttpCoreException(
            'Sai định dạng file. Chỉ được phép upload file Excel.',
          ),
          null,
        );
      }

      // Generate unique filename
      const filename = basename(
        file.originalname,
        extname(file.originalname),
      ).replace(/[^a-zA-Z0-9]/g, '');
      const extName = extname(file.originalname);
      const timestamp = moment().format('YYYYMMDDHHmmss');

      cb(null, `${filename}_${timestamp}${extName}`);
    },
  }),
};
