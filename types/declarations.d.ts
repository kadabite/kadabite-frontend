declare module 'rate-limiter-flexible' {
  import { RedisClientType } from 'redis';

  interface RateLimiterRedisOptions {
    storeClient: RedisClientType;
    points: number;
    duration: number;
    keyPrefix?: string;
  }

  interface RateLimiterMemoryOptions {
    points: number;
    duration: number;
    keyPrefix?: string;
  }

  class RateLimiterRedis {
    constructor(options: RateLimiterRedisOptions);
    consume(key: string, points?: number): Promise<any>;
    penalty(key: string, points?: number): Promise<any>;
    reward(key: string, points?: number): Promise<any>;
  }

  class RateLimiterMemory {
    constructor(options: RateLimiterMemoryOptions);
    consume(key: string, points?: number): Promise<any>;
    penalty(key: string, points?: number): Promise<any>;
    reward(key: string, points?: number): Promise<any>;
  }

  export { RateLimiterRedis, RateLimiterMemory };
}
