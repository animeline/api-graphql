import { v4 as uuid } from 'uuid';

import { UserToken } from '@modules/users/infra/database/typeorm/entities/UserToken';
import { IUserTokenRepository } from '@modules/users/repositories/IUserTokensRepository';

export class FakeUserTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      foundToken => foundToken.token === token,
    );

    return userToken;
  }
}
