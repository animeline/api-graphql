import { GraphQLError } from 'graphql';
import { AuthChecker } from 'type-graphql';

import { JWTProvider } from '@modules/users/providers/TokenProvider/implementations/JWTProvider';

import {
  toMessageWithCode,
  TOKEN_WAS_NO_PROVIED,
  AUTHENTICATION_TOKEN_INVALID,
} from '@shared/lib/graphql/error-codes';

export interface AuthenticationContext {
  token: string;
}

export const AuthenticationAssurance: AuthChecker<AuthenticationContext> = ({
  context,
}): boolean => {
  const { token } = context;

  if (!token) {
    throw new GraphQLError(
      toMessageWithCode(
        TOKEN_WAS_NO_PROVIED,
        "The authentication token wasn't provided!",
      ),
    );
  }

  const provider = new JWTProvider();
  const verify = provider.verify(token);

  if (!verify) {
    throw new GraphQLError(
      toMessageWithCode(
        AUTHENTICATION_TOKEN_INVALID,
        "Couldn't validate authentication token!",
      ),
    );
  }

  return verify;
};
