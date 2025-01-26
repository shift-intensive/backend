import { BadRequestException, Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver, PrismaService } from '@/utils/services';

import { OTP_EXPIRED_TIME, OtpsService, RETRY_DELAY } from '../otps';
import { CreateOtpDto } from '../otps/dto';
import { OtpResponse } from '../otps/otps.model';
import { User, UsersService } from '../users';
import { SignInDto, UpdateProfileDto } from '../users/dto';
import { SessionResponse, SignInResponse, UpdateProfileResponse } from '../users/users.model';

@ApiTags('🧪 tester')
@Controller('/tester')
export class TesterController extends BaseResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly otpsService: OtpsService,
    private readonly prismaService: PrismaService
  ) {
    super();
  }

  @ApiAuthorizedOnly()
  @Get('/session')
  @ApiOperation({ summary: 'получить сессию пользователя' })
  @ApiResponse({
    status: 200,
    description: 'session',
    type: SessionResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async session(@Req() request: Request): Promise<SessionResponse> {
    const token = request.headers.authorization.split(' ')[1];

    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    const mongoUser = await this.usersService.findOne({
      phone: decodedJwtAccessToken.phone
    });
    const postgresUser = await this.prismaService.user.findFirst({
      where: { phone: decodedJwtAccessToken.phone }
    });

    if (!mongoUser && !postgresUser) {
      throw new BadRequestException(this.wrapFail('Пользователь не найден'));
    }

    return this.wrapSuccess({ user: mongoUser });
  }

  @ApiAuthorizedOnly()
  @Patch('/profile')
  @ApiOperation({ summary: 'обновить профиль пользователя' })
  @ApiResponse({
    status: 200,
    description: 'update profile',
    type: UpdateProfileResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async updateProfile(@Body() updateProfileDto: UpdateProfileDto): Promise<UpdateProfileResponse> {
    const isError = Math.random() < 0.3;
    if (isError) {
      throw new BadRequestException(this.wrapFail('Произошла ошибка'));
    }

    const mongoUser = await this.usersService.findOne({ phone: updateProfileDto.phone });
    const postgresUser = await this.prismaService.user.findFirst({
      where: { phone: updateProfileDto.phone }
    });

    if (!mongoUser && !postgresUser) {
      throw new BadRequestException(this.wrapFail('Пользователь не существует'));
    }

    await this.usersService.findOneAndUpdate(
      { phone: mongoUser.phone },
      {
        $set: { ...updateProfileDto.profile }
      }
    );
    await this.prismaService.user.update({
      where: { phone: postgresUser.phone },
      data: updateProfileDto.profile
    });

    const profileChangeHistory = await this.prismaService.profileChangeHistory.create({
      data: {
        userId: postgresUser.id,
        change: JSON.parse(JSON.stringify(updateProfileDto.profile))
      }
    });
    await this.prismaService.userActions.create({
      data: {
        userId: postgresUser.id,
        action: 'PROFILE_CHANGE',
        historyType: 'PROFILE_CHANGE_HISTORY',
        historyId: profileChangeHistory.id
      }
    });

    return this.wrapSuccess({ user: mongoUser });
  }

  @Post('/auth/otp')
  @ApiOperation({ summary: 'создание отп кода' })
  @ApiResponse({
    status: 200,
    description: 'create otp',
    type: OtpResponse
  })
  async createOtp(@Body() createOtpDto: CreateOtpDto): Promise<OtpResponse> {
    const mongoOtp = await this.otpsService.findOne({ phone: createOtpDto.phone });
    const postgresOtp = await this.prismaService.otp.findFirst({
      where: { phone: createOtpDto.phone }
    });

    if (mongoOtp && postgresOtp) {
      const { retryDelay, created } = mongoOtp;
      const now = new Date().getTime();

      if (new Date(created).getTime() + retryDelay > now) {
        return this.wrapSuccess({ retryDelay: RETRY_DELAY - (now - new Date(created).getTime()) });
      }

      await Promise.all([
        this.otpsService.delete({ phone: createOtpDto.phone }),
        this.prismaService.otp.delete({ where: { phone: createOtpDto.phone } })
      ]);
    }

    const retryDelay = Math.random() > 0.5 ? RETRY_DELAY * 10 : RETRY_DELAY;

    const code = Math.floor(100000 + Math.random() * 900000);
    const newOtp = {
      phone: createOtpDto.phone,
      code,
      retryDelay
    };

    await Promise.all([
      this.otpsService.create(newOtp),
      this.prismaService.otp.create({ data: newOtp })
    ]);

    return this.wrapSuccess({ retryDelay });
  }

  @Post('/signin')
  @ApiOperation({ summary: 'авторизация' })
  @ApiResponse({
    status: 200,
    description: 'signin',
    type: SignInResponse
  })
  async signin(@Req() request: Request, @Body() signInDto: SignInDto): Promise<SignInResponse> {
    let mongoUser = await this.usersService.findOne({ phone: signInDto.phone });
    let postgresUser = await this.prismaService.user.findFirst({
      where: { phone: signInDto.phone }
    });

    if (!mongoUser && !postgresUser) {
      mongoUser = await this.usersService.create({ phone: signInDto.phone });
      postgresUser = await this.prismaService.user.create({ data: { phone: signInDto.phone } });
    }

    const mongoOtp = await this.otpsService.findOne({
      phone: signInDto.phone,
      code: signInDto.code
    });
    const postgresOtp = await this.prismaService.otp.findFirst({
      where: { phone: signInDto.phone, code: signInDto.code }
    });

    if (!mongoOtp && !postgresOtp) {
      throw new BadRequestException(this.wrapFail('Неправильный отп код'));
    }
    await Promise.all([
      this.otpsService.delete({ _id: mongoOtp._id }),
      this.prismaService.otp.delete({ where: { id: postgresOtp.id } })
    ]);

    const { token } = await this.authService.login({ phone: signInDto.phone });

    const loginHistory = await this.prismaService.loginHistory.create({
      data: {
        userId: postgresUser.id,
        loginTime: new Date(),
        ipAddress: request.ip
      }
    });
    await this.prismaService.userActions.create({
      data: {
        userId: postgresUser.id,
        action: 'LOGIN',
        historyType: 'LOGIN_HISTORY',
        historyId: loginHistory.id
      }
    });

    return this.wrapSuccess({ user: mongoUser, token });
  }

  @Cron('0 0 * * * *')
  async handleCron() {
    console.log('TESTER OTP CRON:', new Date());
    const otps = await this.prismaService.otp.findMany();

    const expiredOtpsIds = otps
      .filter((otp) => new Date(otp.createdAt).getTime() + OTP_EXPIRED_TIME < new Date().getTime())
      .map((otp) => otp.id);

    await this.prismaService.otp.deleteMany({
      where: {
        id: { in: expiredOtpsIds }
      }
    });
  }
}
