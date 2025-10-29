export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  public_repos: number
  followers: number
  following: number
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface UserStats {
  username: string
  totalContributions: number
  contributionDays: ContributionDay[]
  commits: number
  pullRequests: number
  issues: number
  reviews: number
  user: GitHubUser
}

export interface ComparisonData {
  users: UserStats[]
  timeRange: "week" | "month" | "year" | "all"
}
