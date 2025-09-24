"use client"

import useSWR from "swr"
import type { WorkersResponse, WorkerFilters } from "@/types/worker"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useWorkers(filters: Partial<WorkerFilters> = {}) {
  const params = new URLSearchParams()

  if (filters.search) params.append("search", filters.search)
  if (filters.service && filters.service !== "all") params.append("service", filters.service)
  if (filters.minPrice !== undefined) params.append("minPrice", filters.minPrice.toString())
  if (filters.maxPrice !== undefined) params.append("maxPrice", filters.maxPrice.toString())
  if (filters.page) params.append("page", filters.page.toString())
  if (filters.limit) params.append("limit", filters.limit.toString())

  const queryString = params.toString()
  const url = `/api/workers${queryString ? `?${queryString}` : ""}`

  const { data, error, isLoading, mutate } = useSWR<WorkersResponse>(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Cache for 1 minute
  })

  return {
    workers: data?.workers || [],
    pagination: data?.pagination,
    services: data?.filters?.services || [],
    isLoading,
    error,
    refetch: mutate,
  }
}
