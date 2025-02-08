import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    title: "The Rise of Vertical Forests: Urban Solutions to Climate Change",
    excerpt: "Discover how cities are turning skyscrapers into lush, green ecosystems...",
    date: "2023-06-15",
    author: "Emma Green",
    category: "Urban Planning",
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Ocean Cleanup Drones: The Future of Marine Conservation",
    excerpt: "Innovative autonomous drones are revolutionizing the way we clean our oceans...",
    date: "2023-06-10",
    author: "Michael Blue",
    category: "Technology",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  // Add more blog posts...
]

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">
        Climate Action Insights
      </h1>
      <p className="text-xl mb-12 text-center max-w-2xl mx-auto">
        Explore the latest news, breakthroughs, and ideas in the fight against climate change.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{post.date}</span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                >
                  {post.category}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center bg-slate-50 dark:bg-slate-800">
              <div className="text-sm text-muted-foreground">
                <span>{post.author}</span> • <span>{post.readTime}</span>
              </div>
              <Button
                variant="outline"
                asChild
                className="hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-800 dark:hover:text-green-100"
              >
                <Link href={`/blog/${encodeURIComponent(post.title.toLowerCase().replace(/ /g, "-"))}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

