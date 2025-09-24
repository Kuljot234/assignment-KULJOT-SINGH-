import { type NextRequest, NextResponse } from "next/server"
import workersData from "../../../workers.json"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const search = searchParams.get("search") || ""
    const service = searchParams.get("service") || "all"
    const minPrice = Number.parseInt(searchParams.get("minPrice") || "0")
    const maxPrice = Number.parseInt(searchParams.get("maxPrice") || "200")

    // Transform the data to include hourlyRate calculation
    let transformedData = workersData.map((worker) => ({
      ...worker,
      hourlyRate: Math.round(worker.pricePerDay / 8), // Assuming 8-hour workday
      rating: Number.parseFloat((4 + Math.random()).toFixed(1)), // Generate random rating
      location: "Remote", // Default location
      availability: "Available", // Default availability
    }))

    // Apply filters
    if (search) {
      transformedData = transformedData.filter(
        (worker) =>
          worker.name.toLowerCase().includes(search.toLowerCase()) ||
          worker.service.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (service !== "all") {
      transformedData = transformedData.filter((worker) => worker.service === service)
    }

    if (minPrice > 0 || maxPrice < 200) {
      transformedData = transformedData.filter(
        (worker) => worker.hourlyRate >= minPrice && worker.hourlyRate <= maxPrice,
      )
    }

    // Calculate pagination
    const total = transformedData.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const paginatedData = transformedData.slice(startIndex, startIndex + limit)

    // Get unique services for filter options
    const services = Array.from(new Set(workersData.map((worker) => worker.service)))

    return NextResponse.json({
      workers: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      filters: {
        services,
      },
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch workers data" }, { status: 500 })
  }
}
