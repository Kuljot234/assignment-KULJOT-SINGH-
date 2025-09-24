export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg overflow-hidden animate-pulse"
          style={{
            animationDelay: `${index * 100}ms`,
            animationDuration: "1.5s",
          }}
        >
          <div className="w-full h-48 bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer"></div>
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer rounded"></div>
            <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer rounded w-2/3"></div>
            <div className="flex items-center justify-between pt-2">
              <div className="h-6 bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer rounded w-20"></div>
              <div className="h-3 bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer rounded w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
