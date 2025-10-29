import { Redis } from "@upstash/redis"

let redis: Redis | null = null
let redisInitialized = false
let redisWarningLogged = false

export function getRedisClient(): Redis | null {
  if (!redisInitialized) {
    const url = process.env.KV_REST_API_URL || process.env.KV_URL || process.env.REDIS_URL
    const token = process.env.KV_REST_API_TOKEN

    if (url && token) {
      redis = new Redis({
        url,
        token,
      })
      console.log("[v0] Redis client initialized successfully")
    } else {
      if (!redisWarningLogged) {
        console.warn(
          "[v0] Redis environment variables missing. Caching disabled. Add KV_REST_API_URL and KV_REST_API_TOKEN in Vars.",
        )
        redisWarningLogged = true
      }
    }
    redisInitialized = true
  }
  return redis
}

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const client = getRedisClient()
    if (!client) return null
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
    if (!client) return
    await client.setex(key, expirationSeconds, JSON.stringify(data))
  } catch (error) {
    console.error("[v0] Redis set error:", error)
  }
}
