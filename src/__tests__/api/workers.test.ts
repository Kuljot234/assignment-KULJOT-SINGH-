import { GET } from "@/app/api/workers/route"
import { NextRequest } from "next/server"
import jest from "jest"

// Mock the workers data
jest.mock("../../../../workers.json", () => [
  {
    id: 1,
    name: "John Doe",
    service: "Electrician",
    pricePerDay: 1000,
    image: "/test-image.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    service: "Plumber",
    pricePerDay: 1200,
    image: "/test-image2.jpg",
  },
])

describe("/api/workers", () => {
  it("returns workers data successfully", async () => {
    const request = new NextRequest("http://localhost:3000/api/workers")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toHaveLength(2)
    expect(data.data[0]).toMatchObject({
      id: 1,
      name: "John Doe",
      service: "Electrician",
      pricePerDay: 1000,
    })
  })

  it("handles errors gracefully", async () => {
    // Mock console.error to avoid noise in test output
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {})

    // Mock the import to throw an error
    jest.doMock("../../../../workers.json", () => {
      throw new Error("File not found")
    })

    // Re-import the route handler to get the mocked version
    const { GET: ErrorGET } = await import("@/app/api/workers/route")

    const response = await ErrorGET()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe("Failed to fetch workers data")

    consoleSpy.mockRestore()
  })
})
