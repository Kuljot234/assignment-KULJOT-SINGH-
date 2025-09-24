import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Shield, Clock, Star } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: "Skilled Professionals",
      description: "Access to a network of verified and experienced workers across various trades and services.",
    },
    {
      icon: Shield,
      title: "Trusted & Verified",
      description: "All workers are background-checked and verified to ensure quality and reliability.",
    },
    {
      icon: Clock,
      title: "Quick Booking",
      description: "Find and book workers quickly with our streamlined platform and instant availability.",
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description: "We maintain high standards and customer satisfaction through our rating system.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">About WorkerHub</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We connect you with skilled professionals for all your project needs. From home repairs to specialized
            services, find the right worker for any job.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-border">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-muted/50 rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Skilled Workers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Service Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            At WorkerHub, we believe that finding skilled professionals for your projects should be simple, reliable,
            and transparent. We've built a platform that connects homeowners and businesses with verified workers who
            take pride in their craft. Whether you need a plumber, electrician, carpenter, or any other skilled
            professional, we're here to make the process seamless.
          </p>
        </div>
      </main>
    </div>
  )
}
