"use client"

import type { UserStats } from "@/lib/types"
import { Card } from "@/components/ui/card"

interface ComparisonSummaryProps {
  users: UserStats[]
}

export function ComparisonSummary({ users }: ComparisonSummaryProps) {
  if (users.length < 2) return null

  const totalContributions = users.map((u) => u.totalContributions)
  const maxContributions = Math.max(...totalContributions)
  const leader = users.find((u) => u.totalContributions === maxContributions)

  const avgCommits = Math.round(users.reduce((sum, u) => sum + u.commits, 0) / users.length)
  const avgPRs = Math.round(users.reduce((sum, u) => sum + u.pullRequests, 0) / users.length)

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Most Active Developer</p>
          <p className="text-lg font-semibold text-primary">{leader?.username}</p>
          <p className="text-xs text-muted-foreground mt-1">{maxContributions} contributions</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Average Commits</p>
          <p className="text-lg font-semibold">{avgCommits}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Average Pull Requests</p>
          <p className="text-lg font-semibold">{avgPRs}</p>
        </div>
      </div>
    </Card>
  )
}
