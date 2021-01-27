import { User } from '@modules/users/infra/database/typeorm/entities/User';

export interface AuthenticateUserResponseDTO {
  user: User;
  token: string;
}
