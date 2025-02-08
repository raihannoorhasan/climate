import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const projects = [
  {
    title: "Solar-Powered Community Center",
    description:
      "A net-zero energy community center powered entirely by solar panels and utilizing innovative energy storage solutions.",
    image: "/placeholder.svg?height=200&width=300",
    location: "Austin, TX",
    impact: "Reduced carbon emissions by 50 tons annually",
    category: "Renewable Energy",
  },
  {
    title: "Urban Reforestation Initiative",
    description: "Transformed 10 acres of unused urban land into thriving mini-forests using the Miyawaki method.",
    image: "/placeholder.svg?height=200&width=300",
    location: "Seattle, WA",
    impact: "Increased local biodiversity by 200%",
    category: "Ecosystem Restoration",
  },
  // Add more projects...
]

export default function Portfolio() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Our Impact Portfolio</h1>
      <p className="text-xl mb-12 text-center max-w-2xl mx-auto">
        Explore our completed projects and their positive impact on the environment and communities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                <Badge>{project.category}</Badge>
              </div>
              <CardDescription>{project.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{project.description}</p>
              <p className="font-semibold text-green-600">Impact: {project.impact}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

