export function LoadingSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading workers">
      {/* Search and filters skeleton */}
      <div className="space-y-4">
        <div className="h-10 bg-muted rounded-md animate-pulse" />
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
        </div>
      </div>

      {/* Workers grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded animate-pulse" />
              <div className="h-3 bg-muted rounded w-4/5 animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
              <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 w-16 bg-muted rounded animate-pulse" />
              <div className="h-8 w-20 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-10 bg-muted rounded animate-pulse" />
        ))}
      </div>

      <span className="sr-only">Loading workers data...</span>
    </div>
  )
}
