export function HomeHeader() {
  return (
    <div className="space-y-2 mb-12">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">CL</span>
        </div>
        <h1 className="text-4xl font-bold text-balance">CommitLens</h1>
      </div>
      <p className="text-muted-foreground text-lg">Compare GitHub activity and contributions across developers</p>
    </div>
  )
}
