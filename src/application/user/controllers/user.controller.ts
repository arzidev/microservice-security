import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ChangeStateUserDto } from '../dto/change-state-user.dto';
import {
  GetUsersUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  ChangeStateUserUseCase,
} from '@domain/user/use-cases';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly changeStateUserUseCase: ChangeStateUserUseCase,
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

  @Patch(':id/change-state')
  async changeState(@Param('id') id: string, @Body() body: ChangeStateUserDto) {
    const users = await this.changeStateUserUseCase.execute(id, body);
    return users;
  }
}
