"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HomeHeader } from "@/components/home-header"
import { UsernameInput } from "@/components/username-input"
import { Card } from "@/components/ui/card"
import { SetupGuide } from "@/components/setup-guide"

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (usernames: string[], timeRange: string) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        users: usernames.join(","),
        range: timeRange,
      })
      router.push(`/dashboard?${params.toString()}`)
    } catch (error) {
      console.error("Error:", error)
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        <HomeHeader />

        <SetupGuide missingVars={["GITHUB_TOKEN", "KV_REST_API_URL", "KV_REST_API_TOKEN"]} />

        <Card className="bg-card border-border p-6 md:p-8 mb-12">
          <UsernameInput onSubmit={handleSubmit} isLoading={isLoading} />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <h3 className="font-semibold mb-2">Compare Activity</h3>
            <p className="text-sm text-muted-foreground">View side-by-side contribution graphs and statistics</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <h3 className="font-semibold mb-2">Track Trends</h3>
            <p className="text-sm text-muted-foreground">Analyze commit patterns and contribution streaks</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <h3 className="font-semibold mb-2">Export Data</h3>
            <p className="text-sm text-muted-foreground">Download comparison reports in multiple formats</p>
          </div>
        </div>
      </div>
    </main>
  )
}
