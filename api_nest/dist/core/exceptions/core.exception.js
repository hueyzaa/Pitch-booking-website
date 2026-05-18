"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCoreException = void 0;
const common_1 = require("@nestjs/common");
class HttpCoreException extends common_1.HttpException {
    constructor(message, errorCode) {
        super(`${message}||${errorCode}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.HttpCoreException = HttpCoreException;
//# sourceMappingURL=core.exception.js.map