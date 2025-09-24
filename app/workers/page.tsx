import { Suspense } from "react"
import type { Metadata } from "next"
import WorkersContent from "./workers-content"
import { LoadingSkeleton } from "@/components/loading-skeleton"

export const metadata: Metadata = {
  title: "Find Workers",
  description: "Browse and filter skilled workers for your projects. Find the perfect professional for your needs.",
}

export default function WorkersPage() {
  return (
    <div className="min-h-screen bg-background">
      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Workers</h1>
          <p className="text-muted-foreground">
            Browse our network of skilled professionals and find the perfect match for your project.
          </p>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <WorkersContent />
        </Suspense>
      </main>
    </div>
  )
}
