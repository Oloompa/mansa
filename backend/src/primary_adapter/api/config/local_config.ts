import { InMemoryUserRepository } from '../../../secondary_adapter/repository/in_memory_user_repository';
import { JsonLogger } from '../../../secondary_adapter/library/json_logger';
import { LoginUseCase } from '../../../core/use_case/login';
import { RegisterUseCase } from '../../../core/use_case/register';

export const logger = new JsonLogger({});
export const userRepository = new InMemoryUserRepository();
export const registerUseCase = new RegisterUseCase(logger, userRepository);
export const loginUseCase = new LoginUseCase(logger, userRepository);
