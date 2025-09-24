"use client"

import type { WorkerType } from "@/types/workers"
import { useState, useEffect, useMemo } from "react"
import Navbar from "@/components/navbar"
import WorkerCard from "@/components/worker-card"
import FilterBar from "@/components/filter-bar"
import Pagination from "@/components/pagination"
import LoadingSkeleton from "@/components/loading-skeleton"
import ErrorBoundary from "@/components/error-boundary"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

const WORKERS_PER_PAGE = 12

interface Filters {
  service: string
  minPrice: number
  maxPrice: number
  search: string
}

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [services, setServices] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Filters>({
    service: "all",
    minPrice: 0,
    maxPrice: Number.POSITIVE_INFINITY,
    search: "",
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch workers and services in parallel
      const [workersResponse, servicesResponse] = await Promise.all([fetch("/api/workers"), fetch("/api/services")])

      if (!workersResponse.ok || !servicesResponse.ok) {
        throw new Error("Failed to fetch data")
      }

      const workersResult = await workersResponse.json()
      const servicesResult = await servicesResponse.json()

      if (!workersResult.success || !servicesResult.success) {
        throw new Error("API returned error")
      }

      // Filter valid workers
      const validWorkers = workersResult.data.filter(
        (worker: WorkerType) => worker.pricePerDay > 0 && worker.id !== null,
      )

      setWorkersData(validWorkers)
      setServices(servicesResult.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Filter and search workers
  const filteredWorkers = useMemo(() => {
    return workersData
      .filter((worker) => {
        const matchesService = filters.service === "all" || worker.service === filters.service
        const matchesPrice = worker.pricePerDay >= filters.minPrice && worker.pricePerDay <= filters.maxPrice
        const matchesSearch =
          filters.search === "" ||
          worker.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          worker.service.toLowerCase().includes(filters.search.toLowerCase())

        return matchesService && matchesPrice && matchesSearch
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [workersData, filters])

  // Pagination
  const totalPages = Math.ceil(filteredWorkers.length / WORKERS_PER_PAGE)
  const paginatedWorkers = filteredWorkers.slice((currentPage - 1) * WORKERS_PER_PAGE, currentPage * WORKERS_PER_PAGE)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-6 max-w-md">{error}. Please try again.</p>
            <Button onClick={fetchData} className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Browse Our Workers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Find skilled professionals for your projects. Filter by service type, price range, or search by name.
          </p>
        </div>

        <ErrorBoundary>
          {!loading && (
            <>
              <FilterBar services={services} onFilterChange={handleFilterChange} />

              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground" aria-live="polite">
                  Showing {paginatedWorkers.length} of {filteredWorkers.length} workers
                </p>
              </div>
            </>
          )}

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {paginatedWorkers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">No workers found matching your criteria.</p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        service: "all",
                        minPrice: 0,
                        maxPrice: Number.POSITIVE_INFINITY,
                        search: "",
                      })
                    }
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                    {paginatedWorkers.map((worker, index) => (
                      <div key={worker.id} role="listitem">
                        <WorkerCard
                          worker={worker}
                          priority={index < 6} // Prioritize first 6 images
                        />
                      </div>
                    ))}
                  </div>

                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
              )}
            </>
          )}
        </ErrorBoundary>
      </main>
    </div>
  )
}
