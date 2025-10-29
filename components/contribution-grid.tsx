"use client"

import type { ContributionDay } from "@/lib/types"

interface ContributionGridProps {
  contributions: ContributionDay[]
  username: string
}

const LEVEL_COLORS = {
  0: "bg-muted",
  1: "bg-chart-1/30",
  2: "bg-chart-1/60",
  3: "bg-chart-1/80",
  4: "bg-chart-1",
}

export function ContributionGrid({ contributions, username }: ContributionGridProps) {
  // Group contributions by week
  const weeks: ContributionDay[][] = []
  let currentWeek: ContributionDay[] = []

  contributions.forEach((day) => {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{username}</h3>
        <span className="text-sm text-muted-foreground">{totalContributions} contributions</span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1 pb-2">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((day, dayIdx) => (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className={`w-3 h-3 rounded-sm ${
                    LEVEL_COLORS[day.level]
                  } cursor-pointer hover:ring-2 hover:ring-primary transition-all`}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`w-2 h-2 rounded-sm ${LEVEL_COLORS[level as any]}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
