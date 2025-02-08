import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would typically come from a database or API
const blogPosts = [
  {
    slug: "rise-of-vertical-forests",
    title: "The Rise of Vertical Forests: Urban Solutions to Climate Change",
    content: "Vertical forests are an innovative approach to urban greening...",
    date: "2023-06-15",
    author: "Emma Green",
    category: "Urban Planning",
    readTime: "5 min read",
  },
  {
    slug: "ocean-cleanup-drones",
    title: "Ocean Cleanup Drones: The Future of Marine Conservation",
    content: "Innovative autonomous drones are revolutionizing the way we clean our oceans...",
    date: "2023-06-10",
    author: "Michael Blue",
    category: "Technology",
    readTime: "7 min read",
  },
  // Add more blog posts...
]

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-2">{post.title}</CardTitle>
          <div className="flex justify-between items-center text-muted-foreground">
            <span>
              {post.date} • {post.readTime}
            </span>
            <Badge>{post.category}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">By {post.author}</p>
          <div className="prose max-w-none">{post.content}</div>
        </CardContent>
      </Card>
    </div>
  )
}

