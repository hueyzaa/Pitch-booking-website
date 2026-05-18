"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReq = void 0;
const common_1 = require("@nestjs/common");
exports.UserReq = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const DeviceID = request.headers['device_id'];
    const reCaptchaToken = request.headers['re_capcha_token'] || request.body['re_capcha_token'] || request.body['reCapchaValue'];
    data = Object.assign(Object.assign({}, request.user), { device_id: DeviceID, re_capcha_token: reCaptchaToken });
    return data;
});
//# sourceMappingURL=user.decorator.js.map