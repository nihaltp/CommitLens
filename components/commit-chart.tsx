"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CommitChartProps {
  data: Array<{
    date: string
    commits: number
    pullRequests: number
    issues: number
  }>
  username: string
}

export function CommitChart({ data, username }: CommitChartProps) {
  const [chartType, setChartType] = useState<"line" | "bar">("line")

  const ChartComponent = chartType === "line" ? LineChart : BarChart

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{username} - Activity Trend</h3>
        <div className="flex gap-2">
          <Button
            variant={chartType === "line" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("line")}
            className={chartType === "line" ? "bg-primary" : ""}
          >
            Line
          </Button>
          <Button
            variant={chartType === "bar" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("bar")}
            className={chartType === "bar" ? "bg-primary" : ""}
          >
            Bar
          </Button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="commits" stroke="var(--chart-1)" dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="pullRequests" stroke="var(--chart-2)" dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="issues" stroke="var(--chart-3)" dot={false} isAnimationActive={false} />
          {chartType === "bar" && (
            <>
              <Bar dataKey="commits" fill="var(--chart-1)" />
              <Bar dataKey="pullRequests" fill="var(--chart-2)" />
              <Bar dataKey="issues" fill="var(--chart-3)" />
            </>
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  )
}
