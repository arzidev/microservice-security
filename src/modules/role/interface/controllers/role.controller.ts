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
import { Response } from '@/shared/models/response.model';
import { GenericResponses } from '@/shared/generic-responses';
import { FilterRolesUseCase } from '../../application/use-cases/filter-roles.use-case';
import { RoleOutputDto } from '../../application/dto/role-output.dto';
import { QueryParamsRequestDto } from '../dto/query-params-request.dto';
import { isValidObjectId } from 'mongoose';
import {
  CreateRoleUseCase,
  GetRoleByIdUseCase,
  UpdateRoleUseCase,
} from '../../application/use-cases';
import { Permissions } from '@/shared/auth/decorator/permissions.decorator';
import { CreateRoleInputDto } from '../../application/dto/create-role-input.dto';
import { JwtAuthGuard } from '@/shared/auth/guards/jwt-auth.guard';
import { UpdateRoleInputDto } from '../../application/dto/update-role-input.dto';

// @UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(
    private readonly filterRolesUseCase: FilterRolesUseCase,
    private readonly getRoleByIdUseCase: GetRoleByIdUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
  ) {}

  @Get()
  // @Permissions('VIEW_USERS')
  async getAllRoles(
    @Query() params: QueryParamsRequestDto,
  ): Promise<Response<RoleOutputDto[] | void>> {
    try {
      const roles = await this.filterRolesUseCase.execute(params);
      if (!roles) {
        return GenericResponses.GENERIC_NOT_FOUND('No se encontraron datos.');
      }
      return GenericResponses.GENERIC_FOUND_DATA(
        'Informacion encontrada',
        roles,
      );
    } catch (error) {
      return GenericResponses.GENERIC_BAD_REQUEST_MESSAGE(error);
    }
  }

  @Get(':id')
  // @Permissions('VIEW_USERR')
  async getRoleById(
    @Param('id') id: string,
  ): Promise<Response<RoleOutputDto | void>> {
    try {
      if (!isValidObjectId(id)) {
        return GenericResponses.GENERIC_BAD_REQUEST_MESSAGE('Invalid id');
      }
      const role = await this.getRoleByIdUseCase.execute(id);
      if (!role) {
        return GenericResponses.GENERIC_NOT_FOUND('No se encontraron datos.');
      }
      return GenericResponses.GENERIC_FOUND_DATA('Role encontrado.', role);
    } catch (error) {
      return GenericResponses.GENERIC_BAD_REQUEST_MESSAGE(error);
    }
  }

  @Patch(':id')
  // @Permissions('EDIT_USER')
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleInputDto,
  ): Promise<Response<RoleOutputDto | void>> {
    try {
      const role = await this.updateRoleUseCase.execute(id, updateRoleDto);
      if (!role) {
        return GenericResponses.GENERIC_UPDATE_FAILED();
      }
      return GenericResponses.GENERIC_UPDATE_SUCCESS_DATA(role);
    } catch (error) {
      return GenericResponses.GENERIC_BAD_REQUEST_MESSAGE(error);
    }
  }

  @Post()
  // @Permissions('EDIT_USER')
  async createRole(
    @Body() createRoleDto: CreateRoleInputDto,
  ): Promise<Response<RoleOutputDto | void>> {
    try {
      const role = await this.createRoleUseCase.execute(createRoleDto);
      if (!role) {
        return GenericResponses.GENERIC_SAVE_FAILED();
      }
      return GenericResponses.GENERIC_SAVE_SUCCESS(role);
    } catch (error) {
      return GenericResponses.GENERIC_BAD_REQUEST_MESSAGE(error);
    }
  }
}
