import { InjectModel } from '@nestjs/mongoose';
import { RoleRepositoryInterface } from '../../domain/repositories/role.repository.interface';
import { HydratedDocument, Model } from 'mongoose';
import { Role } from '../schemas/role.schema';
import { Module as ModuleModel } from '../schemas/module.schema';
import { Permission } from '../schemas/permission.schema';
import { RoleEntity } from '../../domain/entities/role.entity';

export class RoleRepository implements RoleRepositoryInterface {
  constructor(
    @InjectModel(Role.name)
    private roleCollection: Model<Role>,
    @InjectModel(Permission.name)
    private permissionCollection: Model<Permission>,
    @InjectModel(ModuleModel.name)
    private moduleCollection: Model<ModuleModel>,
  ) {}

  async getPermissionsByRoles(roles: string[]): Promise<string[]> {
    const rolesFound = await this.roleCollection
      .find({ code: { $in: roles } })
      .populate({
        path: 'permissions',
        select: 'code module',
        populate: {
          path: 'module',
          select: 'code',
        },
      })
      .exec();
    let rolePermissions: string[] = [];
    for (const role of rolesFound) {
      for (const permission of role.permissions as Permission[]) {
        rolePermissions.push(permission.code);
      }
    }
    return rolePermissions;
  }

  async getAll(): Promise<RoleEntity[]> {
    const rolesFound = await this.roleCollection
      .find()
      .populate({
        path: 'permissions',
        select: 'code name',
      })
      .exec();
    return rolesFound.map(
      (e) =>
        new RoleEntity({
          id: e._id as string,
          code: e.code,
          name: e.name,
          permissions: e.permissions.map((e) => e.code),
        }),
    );
  }

  async search(filters: Partial<RoleEntity>): Promise<RoleEntity[]> {
    const rolesFound = await this.roleCollection
      .find(filters)
      .populate({
        path: 'permissions',
        select: 'code name',
      })
      .exec();
    console.log('buscando', filters);
    return rolesFound.map(
      (e) =>
        new RoleEntity({
          id: e._id as string,
          code: e.code,
          name: e.name,
          permissions: e.permissions.map((e) => e.code),
        }),
    );
  }

  // async populateCollections() {
  //   // 1️⃣ Crear módulos
  //   const modulesData = [
  //     { name: 'Usuarios', code: 'USERS', description: 'Gestión de usuarios' },
  //     {
  //       name: 'Facturación',
  //       code: 'BILLING',
  //       description: 'Gestión de facturas',
  //     },
  //     {
  //       name: 'Reportes',
  //       code: 'REPORTS',
  //       description: 'Generación de reportes',
  //     },
  //   ];

  //   const createdModules = [];
  //   for (const m of modulesData) {
  //     let mod = await this.moduleCollection.findOne({ code: m.code });
  //     if (!mod) mod = await this.moduleCollection.create(m);
  //     createdModules[m.code] = mod._id;
  //   }
  //   console.log('Módulos creados ✅');

  //   // 1️⃣ Crear permisos
  //   const permissionsData = [
  //     {
  //       name: 'Crear usuario',
  //       code: 'CREATE_USER',
  //       module: createdModules['USERS']._id,
  //     },
  //     {
  //       name: 'Editar usuario',
  //       code: 'EDIT_USER',
  //       module: createdModules['USERS']._id,
  //     },
  //     {
  //       name: 'Ver usuarios',
  //       code: 'VIEW_USER',
  //       module: createdModules['USERS']._id,
  //     },
  //   ];

  //   const createdPermissions: any[] = [];
  //   for (const p of permissionsData) {
  //     let perm = await this.permissionCollection.findOne({ code: p.code });
  //     if (!perm) perm = await this.permissionCollection.create(p);
  //     createdPermissions.push(perm);
  //   }
  //   console.log('Permisos creados ✅');

  //   // 2️⃣ Crear roles
  //   const rolesData = [
  //     {
  //       name: 'Administrador',
  //       code: 'admin',
  //       permissions: createdPermissions.map((p) => p._id),
  //     },
  //     {
  //       name: 'Usuario',
  //       code: 'user',
  //       permissions: createdPermissions
  //         .filter((p) => p.code.startsWith('VIEW'))
  //         .map((p) => p._id),
  //     },
  //   ];

  //   for (const r of rolesData) {
  //     let role = await this.roleCollection.findOne({ name: r.name });
  //     if (!role) await this.roleCollection.create(r);
  //   }
  //   console.log('Roles creados ✅');
  // }
}
