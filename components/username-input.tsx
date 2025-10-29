"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface UsernameInputProps {
  onSubmit: (usernames: string[], timeRange: string) => void
  isLoading?: boolean
}

export function UsernameInput({ onSubmit, isLoading }: UsernameInputProps) {
  const [input, setInput] = useState("")
  const [timeRange, setTimeRange] = useState("year")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const usernames = input
      .split(",")
      .map((u) => u.trim())
      .filter((u) => u.length > 0)

    if (usernames.length > 0) {
      onSubmit(usernames, timeRange)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">GitHub Usernames</label>
        <Input
          placeholder="Enter usernames separated by commas (e.g., torvalds, gvanrossum)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="bg-input border-border"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Time Range</label>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          disabled={isLoading}
          className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <Button
        type="submit"
        disabled={isLoading || input.trim().length === 0}
        className="w-full bg-primary hover:bg-primary/90"
      >
        <Search className="w-4 h-4 mr-2" />
        {isLoading ? "Loading..." : "Compare Developers"}
      </Button>
    </form>
  )
}
