import { User } from '../../model/type.user';

export interface UserRepository {
  save(user: User): Promise<void>;
}
