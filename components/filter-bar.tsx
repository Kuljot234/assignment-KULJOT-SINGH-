"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Filter, X, SlidersHorizontal, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FilterBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedService: string
  onServiceChange: (value: string) => void
  priceRange: number[]
  onPriceRangeChange: (value: number[]) => void
  services: string[]
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  selectedService,
  onServiceChange,
  priceRange,
  onPriceRangeChange,
  services,
}: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const hasActiveFilters = selectedService !== "all" || priceRange[0] > 0 || priceRange[1] < 200

  const clearFilters = () => {
    onServiceChange("all")
    onPriceRangeChange([0, 200])
    onSearchChange("")
  }

  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
  ]

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Main search and filter row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Enhanced Search Input */}
        <div className="relative lg:col-span-5">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search by name, service, or skills..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-12 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-destructive/10"
              onClick={() => onSearchChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Service Filter */}
        <div className="lg:col-span-3">
          <Select value={selectedService} onValueChange={onServiceChange}>
            <SelectTrigger className="h-12 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="All Services" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-sm border-border/50">
              <SelectItem value="all">All Services</SelectItem>
              {services.map((service) => (
                <SelectItem key={service} value={service}>
                  {service} ({Math.floor(Math.random() * 50) + 5})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Options */}
        <div className="lg:col-span-2">
          <Select defaultValue="relevance">
            <SelectTrigger className="h-12 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-sm border-border/50">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters */}
        <div className="lg:col-span-2">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="relative h-12 w-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-primary/5"
              >
                <Filter className="h-4 w-4 mr-2" />
                Advanced
                {hasActiveFilters && (
                  <Badge variant="default" className="ml-2 h-5 w-5 p-0 text-xs bg-primary text-primary-foreground">
                    {[selectedService !== "all" ? 1 : 0, priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0].reduce(
                      (a, b) => a + b,
                      0,
                    )}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 bg-card/95 backdrop-blur-sm border-border/50" align="end">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">Filter Options</h4>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-auto p-2 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                {/* Price Range Filter */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Hourly Rate Range</label>
                    <span className="text-sm text-primary font-medium">
                      ${priceRange[0]} - ${priceRange[1] === 200 ? "200+" : priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={onPriceRangeChange}
                    max={200}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$0/hr</span>
                    <span>$200+/hr</span>
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="space-y-4 pt-4 border-t border-border/30">
                  <h5 className="text-sm font-medium text-foreground">Availability</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="justify-start bg-transparent">
                      Available Now
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start bg-transparent">
                      This Week
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start bg-transparent">
                      Remote Only
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start bg-transparent">
                      Top Rated
                    </Button>
                  </div>
                </div>
              </motion.div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active Filters Display */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
            {selectedService !== "all" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Badge variant="secondary" className="gap-2 bg-primary/10 text-primary border-primary/20">
                  Service: {selectedService}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-primary/20"
                    onClick={() => onServiceChange("all")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </motion.div>
            )}
            {(priceRange[0] > 0 || priceRange[1] < 200) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Badge variant="secondary" className="gap-2 bg-primary/10 text-primary border-primary/20">
                  Rate: ${priceRange[0]} - ${priceRange[1] === 200 ? "200+" : priceRange[1]}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-primary/20"
                    onClick={() => onPriceRangeChange([0, 200])}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </motion.div>
            )}
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Badge variant="secondary" className="gap-2 bg-primary/10 text-primary border-primary/20">
                  Search: "{searchTerm}"
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-primary/20"
                    onClick={() => onSearchChange("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
