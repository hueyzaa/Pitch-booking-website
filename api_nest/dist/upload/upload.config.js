"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemoryMulterOptions = exports.createMulterOptions = exports.FILE_SIZE_LIMIT = exports.ALLOWED_MIME_TYPES = exports.UPLOAD_DIR = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const multer = require("multer");
exports.UPLOAD_DIR = {
    PUBLIC: './public/uploads',
    SECRET: './secret/uploads',
};
exports.ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'application/pdf',
];
exports.FILE_SIZE_LIMIT = {
    DEFAULT: 5 * 1024 * 1024,
    IMAGE: 25 * 1024 * 1024,
};
const createMulterOptions = (destination, fileSizeLimit = exports.FILE_SIZE_LIMIT.DEFAULT) => ({
    storage: (0, multer_1.diskStorage)({
        destination,
        filename: (req, file, cb) => {
            const randomName = Date.now();
            cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (!exports.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return cb(new Error('File type not supported'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: fileSizeLimit,
    },
});
exports.createMulterOptions = createMulterOptions;
const createMemoryMulterOptions = () => ({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (!exports.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return cb(new Error('Chỉ hỗ trợ jpeg, png, pdf'), false);
        }
        cb(null, true);
    },
});
exports.createMemoryMulterOptions = createMemoryMulterOptions;
//# sourceMappingURL=upload.config.js.map