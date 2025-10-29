"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileJson, FileText } from "lucide-react"
import type { UserStats } from "@/lib/types"

interface ExportMenuProps {
  users: UserStats[]
  timeRange: string
}

export function ExportMenu({ users, timeRange }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const exportCSV = () => {
    const csv = [
      ["Username", "Total Contributions", "Commits", "Pull Requests", "Code Reviews"],
      ...users.map((u) => [u.username, u.totalContributions, u.commits, u.pullRequests, u.reviews]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    downloadFile(blob, `commitlens-comparison-${new Date().toISOString().split("T")[0]}.csv`)
  }

  const exportJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      timeRange,
      users: users.map((u) => ({
        username: u.username,
        totalContributions: u.totalContributions,
        commits: u.commits,
        pullRequests: u.pullRequests,
        reviews: u.reviews,
        followers: u.user.followers,
        following: u.user.following,
      })),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    downloadFile(blob, `commitlens-comparison-${new Date().toISOString().split("T")[0]}.json`)
  }

  const downloadFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="border-border bg-transparent hover:bg-muted"
      >
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          <button
            onClick={exportCSV}
            className="w-full text-left px-4 py-2 hover:bg-muted flex items-center gap-2 first:rounded-t-lg"
          >
            <FileText className="w-4 h-4" />
            Export as CSV
          </button>
          <button
            onClick={exportJSON}
            className="w-full text-left px-4 py-2 hover:bg-muted flex items-center gap-2 last:rounded-b-lg"
          >
            <FileJson className="w-4 h-4" />
            Export as JSON
          </button>
        </div>
      )}
    </div>
  )
}
