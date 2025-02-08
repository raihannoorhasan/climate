import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

const teamMembers = [
  {
    name: "Dr. Emily Green",
    role: "Founder & Executive Director",
    bio: "Environmental scientist with 15 years of experience in climate research.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "John Rivers",
    role: "Head of Community Outreach",
    bio: "Former city planner passionate about sustainable urban development.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  // Add more team members...
]

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">About Climate Action Hub</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            Climate Action Hub is dedicated to empowering individuals and communities to take meaningful action against
            climate change. We believe that through education, innovation, and collaboration, we can create a
            sustainable future for generations to come.
          </p>
          <p>
            Our approach combines cutting-edge research, practical solutions, and community engagement to address the
            complex challenges posed by climate change.
          </p>
        </div>
        <div className="relative h-64 md:h-full">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Climate Action"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <h2 className="text-3xl font-semibold mb-8 text-center">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-col items-center">
              <Avatar className="w-24 h-24">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4 text-center">{member.name}</CardTitle>
              <CardDescription className="text-center">{member.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

