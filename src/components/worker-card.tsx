"use client"

import Image from "next/image"
import type { WorkerType } from "@/types/workers"

interface WorkerCardProps {
  worker: WorkerType
  priority?: boolean
}

export default function WorkerCard({ worker, priority = false }: WorkerCardProps) {
  return (
    <article className="group bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover-glow focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 animate-fade-in-scale">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={worker.image || "/placeholder.svg?height=192&width=384&query=professional worker"}
          alt={`${worker.name} - ${worker.service} professional`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            Available
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-1 text-balance group-hover:text-primary transition-colors duration-200">
          {worker.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3">{worker.service}</p>
        <div className="flex items-center justify-between">
          <span
            className="text-lg font-bold text-primary group-hover:scale-105 transition-transform duration-200"
            aria-label={`Price: ${Math.round(worker.pricePerDay * 1.18)} rupees per day`}
          >
            ₹{Math.round(worker.pricePerDay * 1.18)}
          </span>
          <span className="text-xs text-muted-foreground">per day</span>
        </div>
      </div>
    </article>
  )
}
