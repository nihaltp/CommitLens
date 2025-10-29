"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { UserStats } from "@/lib/types"
import { ContributionGrid } from "./contribution-grid"
import { CommitChart } from "./commit-chart"
import { StatsCard } from "./stats-card"
import { GitBranch, GitCommit, GitPullRequest } from "lucide-react"

interface DashboardTabsProps {
  users: UserStats[]
}

export function DashboardTabs({ users }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<"contributions" | "commits">("contributions")

  // Generate mock commit data for charts
  const generateChartData = (user: UserStats) => {
    const data = []
    const today = new Date()
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        commits: Math.floor(Math.random() * 20),
        pullRequests: Math.floor(Math.random() * 5),
        issues: Math.floor(Math.random() * 3),
      })
    }
    return data
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border">
        <Button
          variant={activeTab === "contributions" ? "default" : "ghost"}
          onClick={() => setActiveTab("contributions")}
          className={`${
            activeTab === "contributions"
              ? "bg-primary text-primary-foreground border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          } rounded-b-none`}
        >
          Contributions
        </Button>
        <Button
          variant={activeTab === "commits" ? "default" : "ghost"}
          onClick={() => setActiveTab("commits")}
          className={`${
            activeTab === "commits"
              ? "bg-primary text-primary-foreground border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          } rounded-b-none`}
        >
          Activity Trends
        </Button>
      </div>

      {activeTab === "contributions" && (
        <div className="space-y-6">
          {users.map((user) => (
            <Card key={user.username} className="bg-card border-border p-6">
              <ContributionGrid contributions={user.contributionDays} username={user.username} />

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatsCard
                  label="Total Contributions"
                  value={user.totalContributions}
                  icon={<GitCommit className="w-5 h-5" />}
                />
                <StatsCard label="Commits" value={user.commits} icon={<GitBranch className="w-5 h-5" />} />
                <StatsCard
                  label="Pull Requests"
                  value={user.pullRequests}
                  icon={<GitPullRequest className="w-5 h-5" />}
                />
                <StatsCard label="Code Reviews" value={user.reviews} icon={<GitCommit className="w-5 h-5" />} />
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "commits" && (
        <div className="space-y-6">
          {users.map((user) => (
            <Card key={user.username} className="bg-card border-border p-6">
              <CommitChart data={generateChartData(user)} username={user.username} />
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
