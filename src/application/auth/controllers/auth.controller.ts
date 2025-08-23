import { CreateUserDto } from '@/application/user/dto/create-user.dto';
import { LoginUserDto } from '@/application/user/dto/login-user.dto';
import { LoginUserUseCase } from '@/domain/auth/use-cases/login-user.use-case';
import { Body, Controller, Patch, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '@/domain/auth/use-cases';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const users = await this.registerUserUseCase.execute(createUserDto);
    return users;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const users = await this.loginUserUseCase.execute(loginUserDto);
    return users;
  }

  @Patch(':id/reset-password')
  async resetPassword() {}
}
