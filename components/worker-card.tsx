"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, User } from "lucide-react"
import type { Worker } from "@/types/worker"

interface WorkerCardProps {
  worker: Worker
}

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <Card className="worker-card group overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
        <Image
          src={worker.image || "/placeholder.svg?height=300&width=400&query=professional worker portrait"}
          alt={`${worker.name} - ${worker.service}`}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Service badge */}
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm text-foreground border border-border/50 font-medium"
          >
            {worker.service}
          </Badge>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 border border-border/50">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{worker.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Worker name and service */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-1 text-foreground group-hover:text-primary transition-colors">
              {worker.name}
            </h3>
            <User className="h-4 w-4 text-muted-foreground mt-1 opacity-60" />
          </div>
        </div>

        {/* Location and availability */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{worker.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="text-green-400">{worker.availability}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-end justify-between pt-2 border-t border-border/30">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">${worker.hourlyRate}</span>
              <span className="text-sm text-muted-foreground">/hour</span>
            </div>
            <div className="text-xs text-muted-foreground">${worker.pricePerDay}/day</div>
          </div>

          <div className="text-right">
            <div className="text-xs text-muted-foreground">Experience</div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{worker.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
          size="sm"
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  )
}
