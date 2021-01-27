import { DecodeOptions, SignOptions, VerifyOptions } from 'jsonwebtoken';

export interface ITokenProvider {
  create(payload: object, options?: SignOptions): string;
  verify(token: string, options?: VerifyOptions): boolean;
  decode<R>(token: string, options?: DecodeOptions): R;
}
