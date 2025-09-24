import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import FadeIn from "@/components/fade-in"
import StaggerContainer from "@/components/stagger-container"
import { ArrowRight, Search, Users, Shield } from "lucide-react"

export default function HomePage() {
  const services = [
    "Electrician",
    "Plumber",
    "Carpenter",
    "Painter",
    "HVAC Technician",
    "Mechanic",
    "Gardener",
    "Cleaner",
  ]

  const features = [
    {
      icon: Search,
      title: "Easy Search",
      description: "Filter by service type, price range, and location to find exactly what you need.",
    },
    {
      icon: Users,
      title: "Skilled Professionals",
      description: "All workers are experienced professionals with verified skills and qualifications.",
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "Background-checked workers and secure payment processing for your peace of mind.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <FadeIn delay={100}>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Find the Perfect Worker for Your Project
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Connect with skilled professionals across various trades. From home repairs to specialized services, we
              have the right person for your job.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 hover-glow animate-fade-in-scale">
                <Link href="/workers">
                  Browse Workers
                  <ArrowRight
                    className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent hover-lift">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 id="features-heading" className="text-3xl font-bold text-foreground mb-4">
                Why Choose WorkerHub?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We make it easy to find and hire skilled professionals for any project.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={150}>
            {features.map((feature, index) => (
              <Card key={feature.title} className="text-center border-border hover-lift hover-glow group">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon
                      className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300"
                      aria-hidden="true"
                    />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16" aria-labelledby="services-heading">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 id="services-heading" className="text-3xl font-bold text-foreground mb-4">
                Popular Services
              </h2>
              <p className="text-lg text-muted-foreground">Find workers for these and many more services</p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto" role="list">
              {services.map((service, index) => (
                <div
                  key={service}
                  className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-md hover-lift transition-all duration-200 animate-slide-up"
                  role="listitem"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-card-foreground font-medium">{service}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="hover-lift bg-transparent">
                <Link href="/workers">View All Services</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse our network of skilled workers and find the perfect match for your project today.
            </p>
            <Button asChild size="lg" className="text-lg px-8 hover-glow animate-pulse-glow">
              <Link href="/workers">
                Find Workers Now
                <ArrowRight
                  className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
