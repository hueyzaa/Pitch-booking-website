import * as multer from 'multer';
export declare const UPLOAD_DIR: {
    PUBLIC: string;
    SECRET: string;
};
export declare const ALLOWED_MIME_TYPES: string[];
export declare const FILE_SIZE_LIMIT: {
    DEFAULT: number;
    IMAGE: number;
};
export declare const createMulterOptions: (destination: string, fileSizeLimit?: number) => {
    storage: multer.StorageEngine;
    fileFilter: (req: any, file: any, cb: any) => any;
    limits: {
        fileSize: number;
    };
};
export declare const createMemoryMulterOptions: () => {
    storage: multer.StorageEngine;
    fileFilter: (req: any, file: any, cb: any) => any;
};
