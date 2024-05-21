import { BadRequestException, Body, Controller, Next, Patch, Post, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { ApiAuthorizedOnly } from '@/utils/guards';
import { BaseResolver } from '@/utils/services';

import { OtpsService, RETRY_DELAY } from '../otps';
import { CreateOtpDto } from '../otps/dto';
import type { OtpResponse } from '../otps/otps.model';

@ApiTags('🧪 tester')
@Controller()
export class TesterController extends BaseResolver {
  constructor(private readonly otpsService: OtpsService) {
    super();
  }

  @ApiAuthorizedOnly()
  @Patch('/users/profile')
  @ApiOperation({ summary: 'обновить профиль пользователя' })
  @ApiHeader({
    name: 'tester'
  })
  @ApiBearerAuth()
  async updateProfile(@Req() request: Request, @Next() next) {
    const isTester = request.headers.tester;
    if (!isTester) return next();

    const isError = Math.random() > 0.3;
    if (isError) throw new BadRequestException(this.wrapFail('Произошла ошибка'));

    return next();
  }

  @Post('/auth/otp')
  @ApiOperation({ summary: 'создание отп кода' })
  @ApiHeader({
    name: 'tester'
  })
  async createOtp(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createOtpDto: CreateOtpDto,
    @Next() next
  ): Promise<OtpResponse> {
    const isTester = request.headers.tester;
    if (!isTester) return next();

    const isError = Math.random() > 0.5;
    if (isError) return next();

    const existingOtp = await this.otpsService.findOne({ phone: createOtpDto.phone });

    if (existingOtp) {
      const { retryDelay, created } = existingOtp;
      const now = new Date().getTime();

      if (new Date(created).getTime() + retryDelay > now) {
        const result = this.wrapSuccess({
          retryDelay: RETRY_DELAY * 10 - (now - new Date(created).getTime())
        });
        response.json(result);
        return result;
      }
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    await this.otpsService.create({
      phone: createOtpDto.phone,
      code,
      retryDelay: RETRY_DELAY * 10
    });

    const result = this.wrapSuccess({ retryDelay: RETRY_DELAY * 10 });
    response.json(result);
    return result;
  }
}
