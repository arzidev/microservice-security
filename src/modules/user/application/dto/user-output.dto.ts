export class UserOutputDto {
  id: string;
  email: string;
  username: string;
  roles: string[];
  state: string;
  permissions?: string[];
}
