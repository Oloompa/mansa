import { User } from '../../core/model/type.user';
import { UserRepository } from '../../core/ports/repository/user_repository';

export class InMemoryUserRepository implements UserRepository {
  private userList = new Set<User>();

  async save(user: User) {
    this.userList.add(user);
  }

  getAllUsers() {
    return Array.from(this.userList);
  }
}
