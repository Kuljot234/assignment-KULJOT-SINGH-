"use client"

import type React from "react"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export default function StaggerContainer({ children, className, staggerDelay = 100 }: StaggerContainerProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className={cn("", className)}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "transition-all duration-600 ease-out",
                isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{
                transitionDelay: `${index * staggerDelay}ms`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
