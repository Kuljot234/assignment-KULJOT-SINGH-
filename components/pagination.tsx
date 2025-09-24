"use client"

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { motion } from "framer-motion"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showQuickJump?: boolean
}

export function Pagination({ currentPage, totalPages, onPageChange, showQuickJump = true }: PaginationProps) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page info */}
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>

      {/* Main pagination */}
      <PaginationRoot>
        <PaginationContent className="gap-1">
          {/* First page button */}
          {showQuickJump && currentPage > 3 && (
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(1)}
                className="h-9 w-9 p-0 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-primary/10"
                aria-label="Go to first page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>
          )}

          {/* Previous button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              className={`${
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-primary/10"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Previous</span>
            </PaginationPrevious>
          </PaginationItem>

          {/* Page numbers */}
          {visiblePages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis className="bg-card/50 backdrop-blur-sm" />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(page as number)
                  }}
                  isActive={currentPage === page}
                  className={`cursor-pointer h-9 w-9 ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                      : "bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-primary/10"
                  }`}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
              className={`${
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-primary/10"
              }`}
            >
              <span className="hidden sm:inline mr-2">Next</span>
              <ChevronRight className="h-4 w-4" />
            </PaginationNext>
          </PaginationItem>

          {/* Last page button */}
          {showQuickJump && currentPage < totalPages - 2 && (
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(totalPages)}
                className="h-9 w-9 p-0 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-primary/10"
                aria-label="Go to last page"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          )}
        </PaginationContent>
      </PaginationRoot>

      {/* Page size options */}
      <div className="text-sm text-muted-foreground">{/* Could add page size selector here if needed */}</div>
    </motion.div>
  )
}
