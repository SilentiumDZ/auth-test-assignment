import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InUserDataDTO } from './dto/in/in.user-data.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { HeadersAccessToken } from './decorator/acess-token.decorator';

@Controller()
export class AppController {

  @Inject(AppService)
  private readonly appService: AppService;

  @Post('auth/login')
  @ApiOperation({ summary: 'login' })
  async login(
    @Body() body: InUserDataDTO,
  ) {
    return this.appService.login(body);
  }

  @Post('auth/register')
  @ApiOperation({ summary: 'register' })
  async register(
      @Body() body: InUserDataDTO,
  ) {
    return this.appService.register(body);
  }

  @Post('auth/get-user')
  @ApiOperation({ summary: 'getUserInfo' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUserInfo(
      @Body() body: InUserDataDTO,
      @HeadersAccessToken() accessToken: string | undefined,
  ) {
    return this.appService.getUserInfo(body);
  }
}
