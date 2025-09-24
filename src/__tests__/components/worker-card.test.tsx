import { render, screen } from "@testing-library/react"
import WorkerCard from "@/components/worker-card"
import type { WorkerType } from "@/types/workers"

const mockWorker: WorkerType = {
  id: 1,
  name: "John Doe",
  service: "Electrician",
  pricePerDay: 1000,
  image: "/test-image.jpg",
}

describe("WorkerCard", () => {
  it("renders worker information correctly", () => {
    render(<WorkerCard worker={mockWorker} />)

    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("Electrician")).toBeInTheDocument()
    expect(screen.getByText("₹1,180")).toBeInTheDocument() // 1000 * 1.18
    expect(screen.getByText("per day")).toBeInTheDocument()
  })

  it("renders worker image with correct alt text", () => {
    render(<WorkerCard worker={mockWorker} />)

    const image = screen.getByRole("img")
    expect(image).toHaveAttribute("alt", "John Doe - Electrician professional")
  })

  it("applies priority loading when priority prop is true", () => {
    render(<WorkerCard worker={mockWorker} priority={true} />)

    const image = screen.getByRole("img")
    expect(image).toHaveAttribute("loading", "eager")
  })

  it("applies lazy loading when priority prop is false", () => {
    render(<WorkerCard worker={mockWorker} priority={false} />)

    const image = screen.getByRole("img")
    expect(image).toHaveAttribute("loading", "lazy")
  })

  it("uses placeholder image when worker image is not provided", () => {
    const workerWithoutImage = { ...mockWorker, image: "" }
    render(<WorkerCard worker={workerWithoutImage} />)

    const image = screen.getByRole("img")
    expect(image.src).toContain("placeholder.svg")
  })

  it("calculates price with 18% markup correctly", () => {
    const workerWithDifferentPrice = { ...mockWorker, pricePerDay: 2000 }
    render(<WorkerCard worker={workerWithDifferentPrice} />)

    expect(screen.getByText("₹2,360")).toBeInTheDocument() // 2000 * 1.18
  })

  it("has proper accessibility attributes", () => {
    render(<WorkerCard worker={mockWorker} />)

    const article = screen.getByRole("article")
    expect(article).toBeInTheDocument()

    const priceElement = screen.getByLabelText("Price: 1180 rupees per day")
    expect(priceElement).toBeInTheDocument()
  })
})
