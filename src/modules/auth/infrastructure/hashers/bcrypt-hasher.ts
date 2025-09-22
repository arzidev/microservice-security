import { IPasswordHasher } from '../../domain/hashers/password-hasher.interface';
import * as bcrypt from 'bcrypt';

export class BcryptHasher implements IPasswordHasher {
  private readonly saltRounds = 10;

  async hash(plain: string) {
    return bcrypt.hash(plain, this.saltRounds);
  }
  async compare(plain: string, hashed: string) {
    return bcrypt.compare(hashed, plain);
  }
}
