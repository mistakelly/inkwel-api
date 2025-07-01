import { Controller, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { TypedRoute } from '@nestia/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @TypedRoute.Get()
  async getHello() {
    return this.appService.getHello();
  }
}
