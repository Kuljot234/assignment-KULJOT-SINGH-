import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, Award, Clock } from "lucide-react"
import FadeIn from "@/components/fade-in"
import StaggerContainer from "@/components/stagger-container"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about WorkerHub's mission to connect skilled professionals with clients who need their services.",
}

export default function AboutPage() {
  const stats = [
    { label: "Active Workers", value: "10,000+", icon: Users },
    { label: "Projects Completed", value: "50,000+", icon: Award },
    { label: "Average Response Time", value: "< 2 hours", icon: Clock },
    { label: "Customer Satisfaction", value: "98%", icon: Shield },
  ]

  const values = [
    {
      title: "Quality First",
      description:
        "We thoroughly vet all workers to ensure they meet our high standards for skill and professionalism.",
    },
    {
      title: "Trust & Safety",
      description:
        "Background checks, insurance verification, and secure payment processing protect both clients and workers.",
    },
    {
      title: "Fair Pricing",
      description:
        "Transparent pricing with no hidden fees. Workers set their own rates based on their expertise and market demand.",
    },
    {
      title: "Community Focus",
      description:
        "We're building a community where skilled professionals can thrive and clients can find reliable help.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main id="main-content" className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">About WorkerHub</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              We're on a mission to connect skilled professionals with clients who need their services, creating
              opportunities and building trust in every interaction.
            </p>
          </FadeIn>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={100}>
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center hover-lift">
                <CardHeader className="pb-2">
                  <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-2">
                    <stat.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{stat.label}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    WorkerHub was founded with a simple belief: everyone deserves access to skilled, reliable
                    professionals for their projects, and every skilled worker deserves the opportunity to build a
                    thriving business.
                  </p>
                  <p>
                    We started as a small team frustrated by the difficulty of finding trustworthy contractors and the
                    challenges skilled workers faced in reaching new clients. Today, we've grown into a platform that
                    serves thousands of professionals and clients across the country.
                  </p>
                  <p>
                    Our platform combines cutting-edge technology with human-centered design to create meaningful
                    connections between people who need work done and the skilled professionals who can do it.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground mb-6">
                  To empower skilled professionals and make quality services accessible to everyone, while building a
                  community based on trust, fairness, and mutual respect.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Empowerment</Badge>
                  <Badge variant="secondary">Quality</Badge>
                  <Badge variant="secondary">Trust</Badge>
                  <Badge variant="secondary">Community</Badge>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Values Section */}
        <section>
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do and shape how we build our platform and community.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={150}>
            {values.map((value) => (
              <Card key={value.title} className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </section>
      </main>
    </div>
  )
}
