import { Redis } from "@upstash/redis"

let redis: Redis | null = null

export function getRedisClient(): Redis {
  if (!redis) {
    redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  }
  return redis
}

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const client = getRedisClient()
    const data = await client.get(key)
    return data as T | null
  } catch (error) {
    console.error("[v0] Redis get error:", error)
    return null
  }
}

export async function setCachedData<T>(key: string, data: T, expirationSeconds = 3600): Promise<void> {
  try {
    const client = getRedisClient()
    await client.setex(key, expirationSeconds, JSON.stringify(data))
  } catch (error) {
    console.error("[v0] Redis set error:", error)
  }
}
