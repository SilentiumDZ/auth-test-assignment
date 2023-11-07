import { createParamDecorator } from '@nestjs/common';

export const HeadersAccessToken = createParamDecorator((data, request): string | undefined => {
  return request.headers?.authorization?.replace('Bearer ', '');
});
