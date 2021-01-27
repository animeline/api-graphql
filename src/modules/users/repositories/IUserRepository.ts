import { User } from '../infra/database/typeorm/entities/User';
import { CreateUserDTO } from '../useCases/CreateUser';

export interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create({ name, email, password }: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
