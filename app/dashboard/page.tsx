"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { DashboardTabs } from "@/components/dashboard-tabs"
import { ComparisonSummary } from "@/components/comparison-summary"
import { ExportMenu } from "@/components/export-menu"
import type { UserStats } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [users, setUsers] = useState<UserStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  const usernames = useMemo(() => searchParams.get("users")?.split(",") || [], [searchParams])
  const timeRange = searchParams.get("range") || "year"

  useEffect(() => {
    if (isFetching) return

    const fetchData = async () => {
      try {
        setIsFetching(true)
        setIsLoading(true)
        setError(null)
        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usernames, timeRange }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || "Failed to fetch user data")
        }

        const data = await response.json()
        setUsers(data.users)
        setError(null)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred"
        setError(errorMessage)
        setUsers([])
        if (errorMessage.includes("rate limit") || errorMessage.includes("401") || errorMessage.includes("403")) {
          console.warn("[v0] Stopping retries due to:", errorMessage)
        }
      } finally {
        setIsLoading(false)
        setIsFetching(false)
      }
    }

    if (usernames.length > 0) {
      fetchData()
    }
  }, [usernames, timeRange])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading developer data...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="bg-destructive/10 border border-destructive rounded-lg p-6">
            <p className="text-destructive font-semibold">Error: {error}</p>
            <p className="text-sm text-destructive/80 mt-2">Please check the usernames and try again.</p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="mb-4 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Developer Comparison</h1>
            <p className="text-muted-foreground mt-1">
              Comparing {users.length} developer{users.length !== 1 ? "s" : ""} • Last {timeRange}
            </p>
          </div>
          <ExportMenu users={users} timeRange={timeRange} />
        </div>

        <ComparisonSummary users={users} />
        <DashboardTabs users={users} />
      </div>
    </main>
  )
}
