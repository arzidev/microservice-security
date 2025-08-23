import { Controller, Get, Patch, Post } from '@nestjs/common';
@Controller('roles')
export class AuthController {
  constructor() {}

  @Get()
  async getRoles() {}

  @Post('login')
  async login() {}

  @Patch(':id/reset-password')
  async resetPassword() {}
}
