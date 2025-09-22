import { Body, Controller, Patch, Post } from '@nestjs/common';

import { Public } from '@/shared/auth/decorator/public.decorator';
import { GenericResponses } from '@/shared/generic-responses';
import {
  LoginUserUseCase,
  RegisterUserUseCase,
} from '../../application/use-cases';
import { UserLoginInputDto } from '../../application/dto/auth/user-login-input.dto';
import { UserRegisterInputDto } from '../../application/dto/auth/user-register-input.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    // private readonly populateCollectionsUseCase: PopulateCollectionsUseCase,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: UserRegisterInputDto) {
    const user = await this.registerUserUseCase.execute(createUserDto);
    return GenericResponses.GENERIC_SUCCESS(
      'Usuario registrado con éxito.',
      user,
    );
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: UserLoginInputDto) {
    const user = await this.loginUserUseCase.execute(loginUserDto);
    if (!user) {
      return GenericResponses.GENERIC_UNAUTHORIZED();
    }
    return GenericResponses.GENERIC_SUCCESS(
      'Inicio de sessión correcto.',
      user,
    );
  }

  @Public()
  @Patch(':id/reset-password')
  async resetPassword() {}

  // @Get('populate')
  // async populateCollection() {
  //   await this.populateCollectionsUseCase.execute();
  // }
}
