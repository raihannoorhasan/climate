"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// This would typically come from a database or API
const discussions = [
  {
    id: "1",
    title: "Innovative Urban Farming Techniques",
    content:
      "I've been exploring vertical gardening and hydroponics for small urban spaces. What are your experiences with these methods?",
    author: "GreenThumb",
    date: "2023-06-15",
    likes: 24,
    comments: [
      {
        id: 1,
        author: "UrbanGardener",
        content: "I've had great success with vertical gardening in my apartment!",
        date: "2023-06-16",
      },
      {
        id: 2,
        author: "HydroFan",
        content: "Hydroponics has been a game-changer for me. It's so efficient!",
        date: "2023-06-17",
      },
    ],
    tags: ["Urban Farming", "Sustainability"],
  },
  // Add more discussions...
]

export default function ForumPost({ params }: { params: { id: string } }) {
  const router = useRouter()
  const discussion = discussions.find((d) => d.id === params.id)
  const [newComment, setNewComment] = useState("")

  if (!discussion) {
    router.push("/forum")
    return null
  }

  const handleNewComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value)
  }

  const submitNewComment = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the new comment to your backend
    console.log("New comment:", newComment)
    setNewComment("")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="outline" onClick={() => router.push("/forum")} className="mb-6">
        Back to Forum
      </Button>
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold">{discussion.title}</CardTitle>
              <CardDescription>
                Posted by {discussion.author} on {discussion.date}
              </CardDescription>
            </div>
            <div className="space-x-2">
              {discussion.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">{discussion.content}</p>
          <div className="flex space-x-4 text-muted-foreground">
            <span>
              <ThumbsUp className="inline mr-1" /> {discussion.likes} Likes
            </span>
            <span>
              <MessageSquare className="inline mr-1" /> {discussion.comments.length} Comments
            </span>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {discussion.comments.map((comment) => (
        <Card key={comment.id} className="mb-4">
          <CardHeader>
            <div className="flex items-center">
              <Avatar className="mr-2">
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{comment.author}</CardTitle>
                <CardDescription>{comment.date}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{comment.content}</p>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Add a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitNewComment}>
            <Textarea
              placeholder="What are your thoughts?"
              value={newComment}
              onChange={handleNewComment}
              className="mb-4"
            />
            <Button type="submit">Post Comment</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

