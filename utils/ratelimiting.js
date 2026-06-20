import redisClient from "../clients/redis.client.js";

const customRateLimit = async (key, limit, windowSeconds) => {
  const current = await redisClient.incr(key);

  if (current === 1) {
    await redisClient.expire(key, windowSeconds);
  }

  const expireTimeSeconds = await redisClient.ttl(key);

  const result = {
    allowed: current <= limit,
    current,
    remaining: Math.max(0, limit - current),
    resetAt: expireTimeSeconds,
  };

  return result;
};

export default customRateLimit;
