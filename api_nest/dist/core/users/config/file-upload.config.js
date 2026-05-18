"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excelFileUploadConfig = void 0;
const core_exception_1 = require("../../exceptions/core.exception");
const multer_1 = require("multer");
const path_1 = require("path");
const moment = require("moment");
const users_constants_1 = require("../constants/users.constants");
exports.excelFileUploadConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: 'public/imports',
        filename: (_req, file, cb) => {
            if (!users_constants_1.ALLOWED_EXCEL_MIME_TYPES.includes(file.mimetype)) {
                return cb(new core_exception_1.HttpCoreException('Sai định dạng file. Chỉ được phép upload file Excel.'), null);
            }
            const filename = (0, path_1.basename)(file.originalname, (0, path_1.extname)(file.originalname)).replace(/[^a-zA-Z0-9]/g, '');
            const extName = (0, path_1.extname)(file.originalname);
            const timestamp = moment().format('YYYYMMDDHHmmss');
            cb(null, `${filename}_${timestamp}${extName}`);
        },
    }),
};
//# sourceMappingURL=file-upload.config.js.map