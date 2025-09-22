export class UserEntity {
  public readonly id: string;
  public email: string;
  public roles: string[];
  public username: string;
  public state: string;
  public password: string;
  public permissions?: string[];

  constructor(props: {
    id?: string;
    email: string;
    roles: string[];
    username: string;
    state: string;
    password: string;
    permissions?: string[];
  }) {
    if (!props.email.includes('@')) {
      throw new Error('Email inválido');
    }
    if (!props.username) {
      throw new Error('El usuario debe tener username');
    }
    this.id = props.id ? props.id : '';
    this.email = props.email;
    this.roles = props.roles;
    this.username = props.username;
    this.state = props.state;
    this.password = props.password;
    this.permissions = props.permissions ?? [];
  }

  activate() {
    this.state = 'activo';
  }

  deactivate() {
    this.state = 'inactivo';
  }

  changePassword(newPassword: string) {
    this.password = newPassword;
  }

  assignRole(role: string) {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
    }
  }

  removeRole(role: string) {
    this.roles = this.roles.filter((r) => r !== role);
  }
}
