"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/workers", label: "Workers" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border animate-slide-up">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 animate-float">
              <span className="text-primary-foreground font-bold text-lg">W</span>
            </div>
            <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-200">
              WorkerHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-1",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300",
                  "hover:after:w-full",
                  pathname === item.href && "text-primary after:w-full",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors duration-200 focus-ring"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={cn(
                  "bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm",
                  isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5",
                )}
              />
              <span
                className={cn(
                  "bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5",
                  isMenuOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm",
                  isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5",
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-out",
            isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-foreground hover:text-primary transition-colors duration-200 font-medium px-2 py-1 rounded-md hover:bg-accent",
                    "animate-slide-up",
                    pathname === item.href && "text-primary bg-accent",
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
