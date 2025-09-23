export class RoleEntity {
  public readonly id: string;
  public name: string;
  public code: string;
  public permissions: string[];

  constructor(props: {
    id?: string;
    name: string;
    code: string;
    permissions: string[];
  }) {
    this.id = props.id ? props.id : '';
    this.name = props.name;
    this.code = props.code;
    this.permissions = props.permissions ?? [];
  }
}
