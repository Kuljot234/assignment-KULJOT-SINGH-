"use client"

import { useState, useCallback } from "react"
import { WorkerCard } from "@/components/worker-card"
import { FilterBar } from "@/components/filter-bar"
import { Pagination } from "@/components/pagination"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { useDebounce } from "@/hooks/use-debounce"
import { useWorkers } from "@/hooks/use-workers"
import { motion, AnimatePresence } from "framer-motion"
import type { WorkerFilters } from "@/types/worker"

const WORKERS_PER_PAGE = 12

export default function WorkersContent() {
  const [filters, setFilters] = useState<Partial<WorkerFilters>>({
    search: "",
    service: "all",
    minPrice: 0,
    maxPrice: 200,
    page: 1,
    limit: WORKERS_PER_PAGE,
  })

  const debouncedFilters = useDebounce(filters, 300)

  const { workers, pagination, services, isLoading, error, refetch } = useWorkers(debouncedFilters)

  const updateFilters = useCallback((newFilters: Partial<WorkerFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }, [])

  if (isLoading && !workers.length) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <motion.div className="text-center py-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-destructive mb-4">Error: {error.message || "Failed to load workers"}</p>
        <button
          onClick={() => refetch()}
          className="text-primary hover:underline hover:text-primary/80 transition-colors"
        >
          Try again
        </button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <FilterBar
          searchTerm={filters.search || ""}
          onSearchChange={(search) => updateFilters({ search })}
          selectedService={filters.service || "all"}
          onServiceChange={(service) => updateFilters({ service })}
          priceRange={[filters.minPrice || 0, filters.maxPrice || 200]}
          onPriceRangeChange={([minPrice, maxPrice]) => updateFilters({ minPrice, maxPrice })}
          services={services}
        />
      </motion.div>

      {/* Results count */}
      {pagination && (
        <motion.div
          className="flex items-center justify-between text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} workers
          </p>
          {isLoading && <div className="text-primary">Loading...</div>}
        </motion.div>
      )}

      {workers.length === 0 && !isLoading ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No workers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find more results.
            </p>
            <button
              onClick={() => updateFilters({ search: "", service: "all", minPrice: 0, maxPrice: 200 })}
              className="text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <AnimatePresence mode="popLayout">
              {workers.map((worker, index) => (
                <motion.div
                  key={worker.id}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.2 },
                  }}
                  layout
                >
                  <WorkerCard worker={worker} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {pagination && pagination.totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}
