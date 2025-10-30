export async function GET() {
  const hasGitHubToken = !!process.env.GITHUB_TOKEN
  const hasRedisUrl = !!process.env.KV_REST_API_URL
  const hasRedisToken = !!process.env.KV_REST_API_TOKEN

  return Response.json({
    github: {
      available: hasGitHubToken,
      message: hasGitHubToken
        ? "GitHub token configured"
        : "GitHub token not configured - using public API (60 req/hour limit)",
    },
    redis: {
      available: hasRedisUrl && hasRedisToken,
      message: hasRedisUrl && hasRedisToken ? "Redis caching enabled" : "Redis not configured - caching disabled",
    },
  })
}
