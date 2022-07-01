import { Logger } from '../ports/library/logger';
import { UserRepository } from '../ports/repository/user_repository';

export class LoginUseCase {
  constructor(private readonly logger: Logger, private readonly userRepository: UserRepository) {}

  async login(email: string, password: string): Promise<string | null> {
    return this.userRepository.readByEmail(email).then((user) => {
      if (user && user.password === password) return user.name;
      return null;
    });
  }
}
