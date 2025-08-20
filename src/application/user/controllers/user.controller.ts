import { GetUsersUseCase } from '@/domain/user/use-cases/get-users.use-case';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Get()
  async getAllUsers() {
    const users = await this.getUsersUseCase.execute();
    return users;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const users = await this.createUserUseCase.execute(createUserDto);
    return users;
  }
}
