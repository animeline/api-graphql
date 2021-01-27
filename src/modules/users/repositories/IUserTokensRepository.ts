import { UserToken } from '../infra/database/typeorm/entities/UserToken';

export interface IUserTokenRepository {
  generate(userId: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
