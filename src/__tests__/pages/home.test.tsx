import { render, screen } from "@testing-library/react"
import HomePage from "@/app/page"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock the Navbar component
jest.mock("@/components/navbar", () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Navbar</nav>
  }
})

describe("HomePage", () => {
  it("renders the main heading", () => {
    render(<HomePage />)

    expect(screen.getByText("Find the Perfect Worker for Your Project")).toBeInTheDocument()
  })

  it("renders the hero section with description", () => {
    render(<HomePage />)

    expect(screen.getByText(/Connect with skilled professionals across various trades/)).toBeInTheDocument()
  })

  it("renders Browse Workers button", () => {
    render(<HomePage />)

    const browseButton = screen.getByRole("link", { name: /Browse Workers/ })
    expect(browseButton).toBeInTheDocument()
    expect(browseButton).toHaveAttribute("href", "/workers")
  })

  it("renders Learn More button", () => {
    render(<HomePage />)

    const learnMoreButton = screen.getByRole("link", { name: "Learn More" })
    expect(learnMoreButton).toBeInTheDocument()
    expect(learnMoreButton).toHaveAttribute("href", "/about")
  })

  it("renders features section", () => {
    render(<HomePage />)

    expect(screen.getByText("Why Choose WorkerHub?")).toBeInTheDocument()
    expect(screen.getByText("Easy Search")).toBeInTheDocument()
    expect(screen.getByText("Skilled Professionals")).toBeInTheDocument()
    expect(screen.getByText("Trusted & Secure")).toBeInTheDocument()
  })

  it("renders popular services", () => {
    render(<HomePage />)

    expect(screen.getByText("Popular Services")).toBeInTheDocument()
    expect(screen.getByText("Electrician")).toBeInTheDocument()
    expect(screen.getByText("Plumber")).toBeInTheDocument()
    expect(screen.getByText("Carpenter")).toBeInTheDocument()
  })

  it("renders CTA section", () => {
    render(<HomePage />)

    expect(screen.getByText("Ready to Get Started?")).toBeInTheDocument()

    const ctaButton = screen.getByRole("link", { name: /Find Workers Now/ })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute("href", "/workers")
  })

  it("has proper semantic structure", () => {
    render(<HomePage />)

    const sections = screen.getAllByRole("region", { hidden: true })
    expect(sections.length).toBeGreaterThan(0)
  })
})
