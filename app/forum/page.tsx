"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import Link from "next/link"

const initialDiscussions = [
  {
    id: 1,
    title: "Innovative Urban Farming Techniques",
    content:
      "I've been exploring vertical gardening and hydroponics for small urban spaces. What are your experiences with these methods?",
    author: "GreenThumb",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2023-06-15",
    likes: 24,
    comments: 8,
    tags: ["Urban Farming", "Sustainability"],
  },
  {
    id: 2,
    title: "The Future of Electric Vehicles",
    content: "With advancements in battery technology, how do you see the EV landscape evolving in the next 5 years?",
    author: "TechEnthusiast",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2023-06-14",
    likes: 31,
    comments: 12,
    tags: ["Electric Vehicles", "Clean Energy"],
  },
  // Add more discussions...
]

export default function Forum() {
  const [discussions, setDiscussions] = useState(initialDiscussions)
  const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "" })
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const handleNewDiscussion = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewDiscussion({ ...newDiscussion, [e.target.name]: e.target.value })
  }

  const submitNewDiscussion = (e: React.FormEvent) => {
    e.preventDefault()
    const newPost = {
      id: discussions.length + 1,
      ...newDiscussion,
      author: "CurrentUser",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      comments: 0,
      tags: ["New Discussion"],
    }
    setDiscussions([newPost, ...discussions])
    setNewDiscussion({ title: "", content: "" })
  }

  const filteredDiscussions = selectedTag
    ? discussions.filter((discussion) => discussion.tags.includes(selectedTag))
    : discussions

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">
        Climate Action Forum
      </h1>
      <p className="text-xl mb-12 text-center max-w-2xl mx-auto">
        Join the conversation and share your ideas for a sustainable future.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Start a New Discussion</CardTitle>
          <CardDescription>Share your thoughts, ideas, or questions with the community</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitNewDiscussion} className="space-y-4">
            <Input
              placeholder="Discussion Title"
              name="title"
              value={newDiscussion.title}
              onChange={handleNewDiscussion}
              required
            />
            <Textarea
              placeholder="What's on your mind?"
              name="content"
              value={newDiscussion.content}
              onChange={handleNewDiscussion}
              required
            />
            <Button type="submit">Post Discussion</Button>
          </form>
        </CardContent>
      </Card>

      <div className="mb-8 flex flex-wrap gap-2">
        <Button variant={selectedTag === null ? "default" : "outline"} onClick={() => setSelectedTag(null)}>
          All
        </Button>
        {Array.from(new Set(discussions.flatMap((d) => d.tags))).map((tag) => (
          <Button key={tag} variant={selectedTag === tag ? "default" : "outline"} onClick={() => setSelectedTag(tag)}>
            {tag}
          </Button>
        ))}
      </div>

      <div className="space-y-8">
        {filteredDiscussions.map((discussion) => (
          <Card key={discussion.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={discussion.avatar} alt={discussion.author} />
                    <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl font-bold">{discussion.title}</CardTitle>
                    <CardDescription>
                      Posted by {discussion.author} on {discussion.date}
                    </CardDescription>
                  </div>
                </div>
                <div className="space-x-2">
                  {discussion.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{discussion.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center bg-slate-50 dark:bg-slate-800">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="hover:text-green-600">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {discussion.likes}
                </Button>
                <Button variant="ghost" size="sm" className="hover:text-blue-600">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {discussion.comments}
                </Button>
                <Button variant="ghost" size="sm" className="hover:text-purple-600">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-800 dark:hover:text-green-100"
              >
                <Link href={`/forum/${discussion.id}`}>View Discussion</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

