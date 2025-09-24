"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} retry={this.retry} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, retry }: { error?: Error; retry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button onClick={retry} className="flex items-center space-x-2">
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </Button>
    </div>
  )
}

export default ErrorBoundary
