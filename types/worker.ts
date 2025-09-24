export interface Worker {
  id: number
  name: string
  service: string
  pricePerDay: number
  image: string
  hourlyRate: number
  rating: number
  location: string
  availability: string
}

export interface WorkersResponse {
  workers: Worker[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: {
    services: string[]
  }
}

export interface WorkerFilters {
  search: string
  service: string
  minPrice: number
  maxPrice: number
  page: number
  limit: number
}
