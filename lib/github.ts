import { getCachedData, setCachedData } from "./redis"
import type { UserStats, GitHubUser, ContributionDay } from "./types"

const GITHUB_API_BASE = "https://api.github.com"

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const cacheKey = `github:user:${username}`
  const cached = await getCachedData<GitHubUser>(cacheKey)

  if (cached) return cached

  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }

  const user = await response.json()
  await setCachedData(cacheKey, user, 3600)
  return user
}

export async function fetchUserContributions(username: string): Promise<ContributionDay[]> {
  const cacheKey = `github:contributions:${username}`
  const cached = await getCachedData<ContributionDay[]>(cacheKey)

  if (cached) return cached

  // Parse GitHub contributions from GraphQL or REST API
  // For now, return mock data structure
  const contributions: ContributionDay[] = []
  const today = new Date()

  for (let i = 365; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    contributions.push({
      date: date.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 20),
      level: Math.floor(Math.random() * 5) as any,
    })
  }

  await setCachedData(cacheKey, contributions, 3600)
  return contributions
}

export async function getUserStats(username: string): Promise<UserStats> {
  const cacheKey = `github:stats:${username}`
  const cached = await getCachedData<UserStats>(cacheKey)

  if (cached) return cached

  const user = await fetchGitHubUser(username)
  const contributionDays = await fetchUserContributions(username)

  const stats: UserStats = {
    username,
    totalContributions: contributionDays.reduce((sum, day) => sum + day.count, 0),
    contributionDays,
    commits: Math.floor(Math.random() * 500),
    pullRequests: Math.floor(Math.random() * 100),
    issues: Math.floor(Math.random() * 50),
    reviews: Math.floor(Math.random() * 200),
    user,
  }

  await setCachedData(cacheKey, stats, 3600)
  return stats
}
