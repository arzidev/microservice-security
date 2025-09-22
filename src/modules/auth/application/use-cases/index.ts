import { LoginUserUseCase } from './login-user.use-case';
// import { PopulateCollectionsUseCase } from './populate-collections.use-case';
import { RegisterUserUseCase } from './register-user.use-case';

export const authUseCases = [RegisterUserUseCase, LoginUserUseCase];

export { RegisterUserUseCase, LoginUserUseCase };
