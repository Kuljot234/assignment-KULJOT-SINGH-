import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Pagination from "@/components/pagination"
import { jest } from "@jest/globals"

const mockOnPageChange = jest.fn()

describe("Pagination", () => {
  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  it("does not render when totalPages is 1 or less", () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />)
    expect(container.firstChild).toBeNull()
  })

  it("renders pagination controls when totalPages > 1", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />)

    expect(screen.getByText("Previous")).toBeInTheDocument()
    expect(screen.getByText("Next")).toBeInTheDocument()
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("5")).toBeInTheDocument()
  })

  it("disables Previous button on first page", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />)

    const previousButton = screen.getByText("Previous").closest("button")
    expect(previousButton).toBeDisabled()
  })

  it("disables Next button on last page", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />)

    const nextButton = screen.getByText("Next").closest("button")
    expect(nextButton).toBeDisabled()
  })

  it("calls onPageChange when Previous button is clicked", async () => {
    const user = userEvent.setup()
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />)

    const previousButton = screen.getByText("Previous")
    await user.click(previousButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it("calls onPageChange when Next button is clicked", async () => {
    const user = userEvent.setup()
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />)

    const nextButton = screen.getByText("Next")
    await user.click(nextButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(4)
  })

  it("calls onPageChange when page number is clicked", async () => {
    const user = userEvent.setup()
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />)

    const pageButton = screen.getByText("3")
    await user.click(pageButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it("highlights current page", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />)

    const currentPageButton = screen.getByText("3").closest("button")
    expect(currentPageButton).toHaveClass("bg-primary") // Assuming default variant has this class
  })

  it("shows ellipsis for large page ranges", () => {
    render(<Pagination currentPage={10} totalPages={20} onPageChange={mockOnPageChange} />)

    const ellipsis = screen.getAllByText("...")
    expect(ellipsis.length).toBeGreaterThan(0)
  })
})
