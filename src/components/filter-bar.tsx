"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDebounce } from "@/hooks/use-debounce"

interface FilterBarProps {
  services: string[]
  onFilterChange: (filters: {
    service: string
    minPrice: number
    maxPrice: number
    search: string
  }) => void
}

export default function FilterBar({ services, onFilterChange }: FilterBarProps) {
  const [service, setService] = useState<string>("all")
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")
  const [search, setSearch] = useState<string>("")

  const debouncedSearch = useDebounce(search, 300)

  const handleFilterChange = useCallback(() => {
    onFilterChange({
      service,
      minPrice: minPrice ? Number.parseInt(minPrice) : 0,
      maxPrice: maxPrice ? Number.parseInt(maxPrice) : Number.POSITIVE_INFINITY,
      search: debouncedSearch.trim(),
    })
  }, [service, minPrice, maxPrice, debouncedSearch, onFilterChange])

  // Apply filters when debounced search changes
  useState(() => {
    handleFilterChange()
  }, [debouncedSearch])

  const clearFilters = useCallback(() => {
    setService("all")
    setMinPrice("")
    setMaxPrice("")
    setSearch("")
    onFilterChange({
      service: "all",
      minPrice: 0,
      maxPrice: Number.POSITIVE_INFINITY,
      search: "",
    })
  }, [onFilterChange])

  return (
    <section className="bg-card border border-border rounded-lg p-4 mb-6" aria-label="Filter workers">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label htmlFor="worker-search" className="sr-only">
            Search workers by name or service
          </label>
          <Input
            id="worker-search"
            placeholder="Search workers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
            aria-describedby="search-help"
          />
          <div id="search-help" className="sr-only">
            Search by worker name or service type
          </div>
        </div>

        {/* Service Filter */}
        <div>
          <label htmlFor="service-filter" className="sr-only">
            Filter by service type
          </label>
          <Select
            value={service}
            onValueChange={(value) => {
              setService(value)
              setTimeout(handleFilterChange, 0)
            }}
          >
            <SelectTrigger id="service-filter" aria-label="Select service type">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {services.map((serviceOption) => (
                <SelectItem key={serviceOption} value={serviceOption}>
                  {serviceOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <label htmlFor="min-price" className="sr-only">
            Minimum price per day
          </label>
          <Input
            id="min-price"
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={handleFilterChange}
            className="w-full"
            min="0"
            aria-label="Minimum price per day"
          />
        </div>
        <div>
          <label htmlFor="max-price" className="sr-only">
            Maximum price per day
          </label>
          <Input
            id="max-price"
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={handleFilterChange}
            className="w-full"
            min="0"
            aria-label="Maximum price per day"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <Button variant="outline" onClick={clearFilters} size="sm">
          Clear Filters
        </Button>
      </div>
    </section>
  )
}
