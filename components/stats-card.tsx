import type React from "react"
interface StatsCardProps {
  label: string
  value: number
  icon?: React.ReactNode
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold mt-1">{value.toLocaleString()}</p>
        </div>
        {icon && <div className="text-primary opacity-50">{icon}</div>}
      </div>
    </div>
  )
}
