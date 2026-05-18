"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPermission = void 0;
const common_1 = require("@nestjs/common");
const CheckPermission = (action) => {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('action', action));
};
exports.CheckPermission = CheckPermission;
//# sourceMappingURL=check-permission.decorator.js.map