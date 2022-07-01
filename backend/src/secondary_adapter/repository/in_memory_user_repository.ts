import { User } from '../../core/model/type.user';
import { UserRepository } from '../../core/ports/repository/user_repository';

export class InMemoryUserRepository implements UserRepository {
  private userList: User[] = [];

  async save(user: User) {
    this.userList.push(user);
  }

  async read(name: string) {
    const user = this.userList.find((user) => user.name === name);
    return user || null;
  }

  async readByEmail(email: string) {
    const user = this.userList.find((user) => user.email === email);
    return user || null;
  }

  feedWith(users: User[]) {
    this.userList = users;
  }

  getAllUsers() {
    return Array.from(this.userList);
  }
}
