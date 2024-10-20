import { RateLimiterRedis, RateLimiterMemory } from 'rate-limiter-flexible';
import { redisClient } from '@/lib/initialize';

export let rateLimiter: RateLimiterRedis | RateLimiterMemory;

try {
  if (redisClient) {
    rateLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      points: 100, // Number of requests
      duration: 900, // Per 15 minutes
      keyPrefix: 'rate-limit',
    });
  } else {
    throw new Error('Redis not initialized');
  }
} catch (error) {
  console.warn('Falling back to in-memory rate limiting', error);
  rateLimiter = new RateLimiterMemory({
    points: 100, // Number of requests
    duration: 900, // Per 15 minutes
  });
}