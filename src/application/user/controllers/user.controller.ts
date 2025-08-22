import { GetUsersUseCase } from '@/domain/user/use-cases/get-users.use-case';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user.use-case';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserUseCase } from '@/domain/user/use-cases/update-user.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
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

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const users = await this.updateUserUseCase.execute(id, updateUserDto);
    return users;
  }
}
