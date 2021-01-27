import { Request } from 'express';
import { GraphQLError } from 'graphql';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { RedisClient } from 'redis';
import { MiddlewareFn } from 'type-graphql';

import {
  MANY_REQUESTS,
  toMessageWithCode,
} from '@shared/lib/graphql/error-codes';

interface Context {
  req: Request;
  redis: RedisClient;
}

export const RateLimiter: MiddlewareFn<Context> = async (
  { context: { req, redis } },
  next,
) => {
  try {
    const limiter = new RateLimiterRedis({
      storeClient: redis,
      keyPrefix: 'rate-limit',
      points: 5,
      duration: 1,
    });

    await limiter.consume(req.ip);

    return next();
  } catch {
    throw new GraphQLError(
      toMessageWithCode(MANY_REQUESTS, 'Too many requests.'),
    );
  }
};
