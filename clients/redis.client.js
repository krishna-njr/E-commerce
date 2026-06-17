import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const redisClient = new Redis(REDIS_URL);

redisClient.on("connect", () => {
  console.log(REDIS_URL);
  console.log("Redis connecting...");
});

redisClient.on("ready", () => {
  console.log("Redis is ready to use");
});

redisClient.on("error", (err) => {
  console.error("Redis error :", err.message);
});

redisClient.on("reconnecting", (time) => {
  console.log(`Redis reconnecting in ${time}ms...`);
});

redisClient.on("close", () => {
  console.log("Redis connection closed");
});

export default redisClient;
