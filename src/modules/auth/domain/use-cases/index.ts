import { LoginUserUseCase } from './login-user.use-case';
import { RegisterUserUseCase } from './register-user.use-case';

export const authUseCases = [RegisterUserUseCase, LoginUserUseCase];

// Si igual quieres, puedes exportar individuales:
export { RegisterUserUseCase, LoginUserUseCase };
