import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserReqData } from '../users/interfaces/user-req.interface';

export const UserReq = createParamDecorator(
  (data: UserReqData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const DeviceID = request.headers['device_id'];
    const reCaptchaToken = request.headers['re_capcha_token'] || request.body['re_capcha_token'] || request.body['reCapchaValue'];

    data = {
      ...request.user,
      device_id: DeviceID,
      re_capcha_token: reCaptchaToken,
    };
    return data;
  },
);
