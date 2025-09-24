import { renderHook, act } from "@testing-library/react"
import { useDebounce } from "@/hooks/use-debounce"
import jest from "jest" // Declare the jest variable

// Mock timers
jest.useFakeTimers()

describe("useDebounce", () => {
  afterEach(() => {
    jest.clearAllTimers()
  })

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500))
    expect(result.current).toBe("initial")
  })

  it("debounces value changes", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: "initial", delay: 500 },
    })

    expect(result.current).toBe("initial")

    // Change the value
    rerender({ value: "updated", delay: 500 })
    expect(result.current).toBe("initial") // Should still be initial

    // Fast-forward time by 250ms (less than delay)
    act(() => {
      jest.advanceTimersByTime(250)
    })
    expect(result.current).toBe("initial") // Should still be initial

    // Fast-forward time by another 250ms (total 500ms)
    act(() => {
      jest.advanceTimersByTime(250)
    })
    expect(result.current).toBe("updated") // Should now be updated
  })

  it("resets timer on rapid value changes", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: "initial", delay: 500 },
    })

    // Change value multiple times rapidly
    rerender({ value: "first", delay: 500 })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    rerender({ value: "second", delay: 500 })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    rerender({ value: "final", delay: 500 })

    // Should still be initial value
    expect(result.current).toBe("initial")

    // Complete the debounce period
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Should now be the final value
    expect(result.current).toBe("final")
  })

  it("works with different data types", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 42, delay: 300 },
    })

    expect(result.current).toBe(42)

    rerender({ value: 100, delay: 300 })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(result.current).toBe(100)
  })
})
