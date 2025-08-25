import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { QueryParamsDto } from '../dto/query-params.dto';
import {
  ChangeStateUserUseCase,
  CreateUserUseCase,
  FilterUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from '../../application/use-cases';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly changeStateUserUseCase: ChangeStateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly filterUsersUseCase: FilterUsersUseCase,
  ) {}

  @Get()
  async getAllUsers(@Query() params: QueryParamsDto) {
    const users = await this.filterUsersUseCase.execute(params);
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const users = await this.getUserByIdUseCase.execute(id);
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

  @Patch(':id/activate')
  async activate(@Param('id') id: string) {
    const users = await this.changeStateUserUseCase.execute(id, {
      state: 'active',
    });
    return users;
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    const users = await this.changeStateUserUseCase.execute(id, {
      state: 'inactive',
    });
    return users;
  }
}
