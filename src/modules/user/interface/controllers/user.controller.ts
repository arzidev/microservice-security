import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  DeactivateUserUseCase,
  ActivateUserUseCase,
  FilterUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from '../../application/use-cases';
import { GenericResponses } from '@/shared/generic-responses';
import { isValidObjectId } from 'mongoose';
import { Permissions } from '@/shared/auth/decorator/permissions.decorator';
import { JwtAuthGuard } from '@/shared/auth/guards/jwt-auth.guard';
import { UpdateUserRequestDto } from '../dto/update-user-request.dto';
import { QueryParamsRequestDto } from '../dto/query-params-request.dto';
import { Response } from '@/shared/models/response.model';
import { UserOutputDto } from '../../application/dto/user-output.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly filterUsersUseCase: FilterUsersUseCase,
    private readonly deactivateUserUseCase: DeactivateUserUseCase,
    private readonly activateUserUseCase: ActivateUserUseCase,
  ) {}

  @Get(':id')
  @Permissions('VIEW_USER')
  async getUserById(
    @Param('id') id: string,
  ): Promise<Response<UserOutputDto | void>> {
    try {
      if (!isValidObjectId(id)) {
        return GenericResponses.GENERIC_BAD_REQUEST_MESSAGE('Invalid id');
      }
      const user = await this.getUserByIdUseCase.execute(id);
      if (!user) {
        return GenericResponses.GENERIC_NOT_FOUND('No se encontraron datos.');
      }
      return GenericResponses.GENERIC_FOUND_DATA('Usuario encontrado.', user);
    } catch (error) {
      return GenericResponses.GENERIC_BAD_REQUEST_MESSAGE(error);
    }
  }

  @Get()
  @Permissions('VIEW_USER')
  async getAllUsers(
    @Query() params: QueryParamsRequestDto,
  ): Promise<Response<UserOutputDto[] | void>> {
    try {
      const users = await this.filterUsersUseCase.execute(params);
      if (!users) {
        return GenericResponses.GENERIC_NOT_FOUND('No se encontraron datos.');
      }
      return GenericResponses.GENERIC_FOUND_DATA(
        'Informacion encontrada',
        users,
      );
    } catch (error) {
      return GenericResponses.GENERIC_BAD_REQUEST_MESSAGE(error);
    }
  }

  @Patch(':id')
  @Permissions('EDIT_USER')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<Response<UserOutputDto | void>> {
    try {
      const user = await this.updateUserUseCase.execute(id, updateUserDto);
      if (!user) {
        return GenericResponses.GENERIC_UPDATE_FAILED();
      }
      return GenericResponses.GENERIC_UPDATE_SUCCESS_DATA(user);
    } catch (error) {
      return GenericResponses.GENERIC_BAD_REQUEST_MESSAGE(error);
    }
  }

  @Patch(':id/activate')
  @Permissions('EDIT_USER')
  async activate(
    @Param('id') id: string,
  ): Promise<Response<UserOutputDto | void>> {
    try {
      const user = await this.activateUserUseCase.execute(id);
      if (!user) {
        return GenericResponses.GENERIC_UPDATE_FAILED();
      }
      return GenericResponses.GENERIC_UPDATE_SUCCESS_DATA(user);
    } catch (error) {
      return GenericResponses.GENERIC_UPDATE_FAILED_MESSAGE(error);
    }
  }

  @Patch(':id/deactivate')
  @Permissions('EDIT_USER')
  async deactivate(
    @Param('id') id: string,
  ): Promise<Response<UserOutputDto | void>> {
    try {
      const user = await this.deactivateUserUseCase.execute(id);
      if (!user) {
        return GenericResponses.GENERIC_UPDATE_FAILED();
      }
      return GenericResponses.GENERIC_UPDATE_SUCCESS_DATA(user);
    } catch (error) {
      return GenericResponses.GENERIC_UPDATE_FAILED_MESSAGE(error);
    }
  }
}
