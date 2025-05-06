import Redis from "ioredis"

export function createRedisClient() {
	const client = new Redis("rediss://default:AYLWAAIjcDFiNzA5ODQ3NzY3NjY0ODFkOGZkYmE2ODZmYTBiMDA0ZnAxMA@relevant-jawfish-33494.upstash.io:6379");
	return client;
}