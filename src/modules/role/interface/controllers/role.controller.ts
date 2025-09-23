import { Controller, Get, Query } from '@nestjs/common';
import { Response } from '@/shared/models/response.model';
import { GenericResponses } from '@/shared/generic-responses';
import { FilterRolesUseCase } from '../../application/use-cases/filter-roles.use-case';
import { RoleOutputDto } from '../../application/dto/role-output.dto';
import { QueryParamsRequestDto } from '../dto/query-params-request.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly filterRolesUseCase: FilterRolesUseCase) {}

  @Get()
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
}
