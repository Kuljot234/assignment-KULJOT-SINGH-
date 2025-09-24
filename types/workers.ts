export interface Worker {
  id: number
  name: string
  service: string
  pricePerDay: number
  image: string
  hourlyRate?: number
  rating?: number
  location?: string
  availability?: string
}

export interface WorkerType {
  id: number
  name: string
  service: string
  pricePerDay: number
  image: string
}
