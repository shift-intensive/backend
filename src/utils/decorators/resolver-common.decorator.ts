import type { NestInterceptor } from '@nestjs/common';

import { UseInterceptors } from '@nestjs/common';

export const ResolverCommon = (...interceptors: (any | NestInterceptor)[]) =>
  UseInterceptors(...interceptors);
