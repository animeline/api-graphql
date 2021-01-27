import { sign, verify, decode, SignOptions, VerifyOptions } from 'jsonwebtoken';

import { authConfig } from '@config';

import { ITokenProvider } from '../models/ITokenProvider';

export class JWTProvider implements ITokenProvider {
  private get secret(): string {
    return authConfig.jwt.secret;
  }

  public create(payload: object, options?: SignOptions): string {
    return sign(payload, this.secret, options);
  }

  public verify(token: string, options?: VerifyOptions): boolean {
    try {
      verify(token, this.secret, options);

      return true;
    } catch {
      return false;
    }
  }

  public decode<R>(token: string): R {
    const isValid = this.verify(token);

    if (!isValid) {
      throw new Error('The token entered is not valid.');
    }

    return decode(token) as R;
  }
}
