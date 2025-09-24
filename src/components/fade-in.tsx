"use client"

import type React from "react"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  duration?: number
}

export default function FadeIn({ children, className, delay = 0, direction = "up", duration = 600 }: FadeInProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const directionClasses = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isIntersecting ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${directionClasses[direction]}`,
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
