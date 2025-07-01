import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Req } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';

@Controller('/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TypedRoute.Post('register/')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, description: 'Registers a user' })
  async register(@TypedBody() dto: AuthDto.RegisterUserDto): Promise<String> {
    const res = await this.authService.registerUser(dto);

    return res;
  }

  @TypedRoute.Post('login/')
  async loginUser(@TypedBody() dto: AuthDto.LoginUserDto, @Req() req: any) {
    console.log('controller', req);
    const res = await this.authService.login(dto);

    return res;
  }
}
