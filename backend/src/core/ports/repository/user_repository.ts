import { User } from '../../model/type.user';

export interface UserRepository {
  save(user: User): Promise<void>;
  readByName(userName: string): Promise<User | null>;
  readByEmail(userName: string): Promise<User | null>;
}
