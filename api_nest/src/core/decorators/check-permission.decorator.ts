import { applyDecorators, SetMetadata } from '@nestjs/common';

export const CheckPermission = (action: string) => {
  return applyDecorators(SetMetadata('action', action));
};
