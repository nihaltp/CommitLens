import { getUserStats } from "@/lib/github"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { usernames, timeRange } = await request.json()

    if (!usernames || !Array.isArray(usernames) || usernames.length === 0) {
      return NextResponse.json({ error: "Invalid usernames" }, { status: 400 })
    }

    const users = await Promise.all(usernames.map((username: string) => getUserStats(username)))

    return NextResponse.json({ users })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
}
