"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Users,
  Trophy,
  Sparkles,
  Search,
  Filter,
  Plus,
  Palette,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react"
import Link from "next/link"

interface CommunityPost {
  id: string
  user: {
    name: string
    username: string
    avatar: string
    verified: boolean
  }
  outfit: {
    title: string
    description: string
    image: string
    items: string[]
    occasion: string
  }
  stats: {
    likes: number
    comments: number
    remixes: number
    saves: number
  }
  timestamp: string
  isLiked: boolean
  isSaved: boolean
  tags: string[]
}

interface Challenge {
  id: string
  title: string
  description: string
  theme: string
  participants: number
  deadline: string
  prize: string
  image: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

const mockPosts: CommunityPost[] = [
  {
    id: "1",
    user: {
      name: "Emma Chen",
      username: "@emmastyle",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    outfit: {
      title: "Vintage Meets Modern",
      description:
        "Transformed my grandmother's vintage blazer with contemporary pieces for a fresh take on professional wear.",
      image: "/community-outfit-vintage-modern.jpg",
      items: ["Vintage Blazer", "White Turtleneck", "High-waisted Trousers", "Gold Accessories"],
      occasion: "Work Meeting",
    },
    stats: {
      likes: 234,
      comments: 18,
      remixes: 12,
      saves: 89,
    },
    timestamp: "2 hours ago",
    isLiked: false,
    isSaved: true,
    tags: ["vintage", "professional", "sustainable"],
  },
  {
    id: "2",
    user: {
      name: "Marcus Johnson",
      username: "@marcusfashion",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    outfit: {
      title: "Streetwear Remix Challenge",
      description: "Taking the #ColorBlockChallenge to the next level with unexpected color combinations.",
      image: "/community-outfit-streetwear.jpg",
      items: ["Oversized Hoodie", "Cargo Pants", "Chunky Sneakers", "Bucket Hat"],
      occasion: "Weekend Casual",
    },
    stats: {
      likes: 156,
      comments: 24,
      remixes: 8,
      saves: 45,
    },
    timestamp: "4 hours ago",
    isLiked: true,
    isSaved: false,
    tags: ["streetwear", "colorblock", "challenge"],
  },
  {
    id: "3",
    user: {
      name: "Sofia Rodriguez",
      username: "@sofiasstyle",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    outfit: {
      title: "Sustainable Sunday",
      description: "100% thrifted outfit proving that sustainable fashion can be absolutely stunning!",
      image: "/community-outfit-sustainable.jpg",
      items: ["Thrifted Midi Dress", "Vintage Cardigan", "Secondhand Boots", "Upcycled Bag"],
      occasion: "Brunch Date",
    },
    stats: {
      likes: 312,
      comments: 31,
      remixes: 19,
      saves: 127,
    },
    timestamp: "6 hours ago",
    isLiked: true,
    isSaved: true,
    tags: ["sustainable", "thrifted", "vintage"],
  },
]

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Monochrome Magic",
    description: "Create stunning outfits using only one color family",
    theme: "Color Theory",
    participants: 1247,
    deadline: "5 days left",
    prize: "$500 Shopping Credit",
    image: "/challenge-monochrome.jpg",
    difficulty: "Beginner",
  },
  {
    id: "2",
    title: "Remix Revolution",
    description: "Take someone else's outfit and make it your own",
    theme: "Collaboration",
    participants: 892,
    deadline: "2 weeks left",
    prize: "Featured on Homepage",
    image: "/challenge-remix.jpg",
    difficulty: "Intermediate",
  },
  {
    id: "3",
    title: "Ghost Item Glow-Up",
    description: "Transform your most neglected wardrobe piece",
    theme: "Sustainability",
    participants: 2156,
    deadline: "1 week left",
    prize: "Personal Styling Session",
    image: "/challenge-ghost-item.jpg",
    difficulty: "Advanced",
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("trending")

  const handleLike = (postId: string) => {
    // Handle like functionality
    console.log("Liked post:", postId)
  }

  const handleSave = (postId: string) => {
    // Handle save functionality
    console.log("Saved post:", postId)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-primary" />
              <span className="font-serif text-2xl font-bold text-foreground">Revery</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/wardrobe">
                <Button variant="ghost">Wardrobe</Button>
              </Link>
              <Link href="/styling">
                <Button variant="ghost">Styling</Button>
              </Link>
              <Button variant="ghost">Profile</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold mb-2">Community Hub</h1>
            <p className="text-muted-foreground">
              Share your style, discover new looks, and collaborate with fashion enthusiasts worldwide
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Share Outfit
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search outfits, users, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending
                </div>
              </SelectItem>
              <SelectItem value="recent">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Most Recent
                </div>
              </SelectItem>
              <SelectItem value="popular">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Most Popular
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                {mockPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {post.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-1">
                              <p className="font-semibold">{post.user.name}</p>
                              {post.user.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {post.user.username} • {post.timestamp}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{post.outfit.title}</h3>
                        <p className="text-muted-foreground mb-3">{post.outfit.description}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden">
                        <img
                          src={post.outfit.image || "/placeholder.svg?height=400&width=320"}
                          alt={post.outfit.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Occasion:</span>
                          <Badge variant="outline">{post.outfit.occasion}</Badge>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Items used:</p>
                          <div className="flex flex-wrap gap-1">
                            {post.outfit.items.map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={post.isLiked ? "text-red-500" : ""}
                          >
                            <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                            {post.stats.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.stats.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Users className="w-4 h-4 mr-1" />
                            {post.stats.remixes}
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSave(post.id)}
                          className={post.isSaved ? "text-primary" : ""}
                        >
                          <Bookmark className={`w-4 h-4 ${post.isSaved ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Trending Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Trending Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {["#sustainablefashion", "#vintagevibes", "#colorblock", "#minimalist", "#streetstyle"].map(
                      (tag) => (
                        <div key={tag} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{tag}</span>
                          <Badge variant="secondary" className="text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Hot
                          </Badge>
                        </div>
                      ),
                    )}
                  </CardContent>
                </Card>

                {/* Featured Stylists */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Featured Stylists</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Alex Rivera", username: "@alexstyles", followers: "12.5K" },
                      { name: "Jordan Kim", username: "@jordanfashion", followers: "8.2K" },
                      { name: "Taylor Swift", username: "@taylorstyle", followers: "15.1K" },
                    ].map((stylist) => (
                      <div key={stylist.username} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>
                              {stylist.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{stylist.name}</p>
                            <p className="text-xs text-muted-foreground">{stylist.followers} followers</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Follow
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Active Challenges</h2>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create Challenge
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockChallenges.map((challenge) => (
                <Card key={challenge.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    <img
                      src={challenge.image || "/placeholder.svg?height=240&width=320"}
                      alt={challenge.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{challenge.theme}</Badge>
                        <Badge
                          variant={
                            challenge.difficulty === "Beginner"
                              ? "secondary"
                              : challenge.difficulty === "Intermediate"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Participants:</span>
                        <span className="font-medium">{challenge.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Deadline:</span>
                        <span className="font-medium">{challenge.deadline}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Prize:</span>
                        <span className="font-medium text-primary">{challenge.prize}</span>
                      </div>
                    </div>

                    <Button className="w-full">
                      <Trophy className="w-4 h-4 mr-2" />
                      Join Challenge
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collaborations">
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-2">Collaborative Closets</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Team up with other users to create shared wardrobes and styling projects.
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Start Collaboration
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
