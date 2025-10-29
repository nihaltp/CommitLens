import { getUserStats } from "@/lib/github"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { usernames, timeRange } = await request.json()

    if (!usernames || !Array.isArray(usernames) || usernames.length === 0) {
      return NextResponse.json({ error: "Invalid usernames" }, { status: 400 })
    }

    const users = await Promise.allSettled(usernames.map((username: string) => getUserStats(username)))

    // Check if all requests failed
    const errors = users
      .map((result, index) => (result.status === "rejected" ? result.reason.message : null))
      .filter(Boolean)

    if (errors.length === usernames.length) {
      // All requests failed
      return NextResponse.json({ error: errors[0] || "Failed to fetch user data" }, { status: 500 })
    }

    // Map results, handling both successful and failed requests
    const successfulUsers = users.map((result) => (result.status === "fulfilled" ? result.value : null)).filter(Boolean)

    return NextResponse.json({ users: successfulUsers })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch user data" },
      { status: 500 },
    )
  }
}
