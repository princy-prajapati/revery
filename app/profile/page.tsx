"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  MapPin,
  LinkIcon,
  Settings,
  Share2,
  Trophy,
  Sparkles,
  TrendingUp,
  Heart,
  Users,
  Palette,
  Target,
  Star,
  Edit,
  Camera,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

interface StyleMilestone {
  id: string
  title: string
  description: string
  date: string
  image: string
  category: "outfit" | "challenge" | "collaboration" | "achievement"
  stats?: {
    likes: number
    saves: number
  }
}

interface StyleInsight {
  category: string
  value: number
  change: number
  description: string
}

const mockMilestones: StyleMilestone[] = [
  {
    id: "1",
    title: "First Ghost Item Revival",
    description: "Successfully styled the vintage blazer that had been sitting unworn for 8 months",
    date: "2024-01-15",
    image: "/milestone-ghost-revival.jpg",
    category: "achievement",
    stats: { likes: 89, saves: 34 },
  },
  {
    id: "2",
    title: "Monochrome Challenge Winner",
    description: "Won first place in the community monochrome styling challenge",
    date: "2024-01-10",
    image: "/milestone-challenge-win.jpg",
    category: "challenge",
    stats: { likes: 156, saves: 78 },
  },
  {
    id: "3",
    title: "Sustainable Style Streak",
    description: "Completed 30 days of sustainable outfit choices using only existing wardrobe items",
    date: "2024-01-05",
    image: "/milestone-sustainable-streak.jpg",
    category: "achievement",
  },
  {
    id: "4",
    title: "Collaborative Closet Launch",
    description: "Started first collaborative styling project with @emmastyle",
    date: "2023-12-28",
    image: "/milestone-collaboration.jpg",
    category: "collaboration",
  },
]

const mockInsights: StyleInsight[] = [
  {
    category: "Color Palette",
    value: 85,
    change: 12,
    description: "You've expanded your color range significantly this month",
  },
  {
    category: "Versatility Score",
    value: 92,
    change: 8,
    description: "Your pieces work well together across different occasions",
  },
  {
    category: "Sustainability",
    value: 78,
    change: 15,
    description: "Great improvement in using existing wardrobe items",
  },
  {
    category: "Creativity Index",
    value: 88,
    change: 5,
    description: "Your styling combinations are becoming more innovative",
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

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
              <Link href="/community">
                <Button variant="ghost">Community</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" />
                <AvatarFallback className="text-2xl">AS</AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-serif text-3xl font-bold">Alex Rivera</h1>
                  <Badge variant="secondary">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Style Curator
                  </Badge>
                </div>
                <p className="text-muted-foreground">@alexstyles</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined January 2024
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href="#" className="text-primary hover:underline">
                    alexstyles.com
                  </a>
                </div>
              </div>

              <p className="max-w-md">
                Sustainable fashion enthusiast exploring the art of wardrobe revival. Helping others discover the hidden
                gems in their closets. 🌱✨
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:ml-auto">
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold mb-1">127</div>
              <div className="text-sm text-muted-foreground">Outfits Created</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold mb-1">2.4K</div>
              <div className="text-sm text-muted-foreground">Total Likes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold mb-1">18</div>
              <div className="text-sm text-muted-foreground">Ghosts Revived</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold mb-1">892</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="narrative">Style Narrative</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        action: "Created outfit",
                        title: "Autumn Layers",
                        time: "2 hours ago",
                        likes: 23,
                      },
                      {
                        action: "Joined challenge",
                        title: "Monochrome Magic",
                        time: "1 day ago",
                        participants: 1247,
                      },
                      {
                        action: "Revived ghost item",
                        title: "Vintage Silk Scarf",
                        time: "3 days ago",
                        saves: 45,
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <div className="text-right">
                          {activity.likes && (
                            <div className="flex items-center text-sm">
                              <Heart className="w-4 h-4 mr-1 text-red-500" />
                              {activity.likes}
                            </div>
                          )}
                          {activity.participants && (
                            <div className="flex items-center text-sm">
                              <Users className="w-4 h-4 mr-1 text-primary" />
                              {activity.participants}
                            </div>
                          )}
                          {activity.saves && (
                            <div className="flex items-center text-sm">
                              <Star className="w-4 h-4 mr-1 text-yellow-500" />
                              {activity.saves}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Outfits Created</span>
                        <span className="font-medium">12</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Ghost Items Used</span>
                        <span className="font-medium">8</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Community Engagement</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Style Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {["Minimalist", "Sustainable", "Vintage", "Casual Chic"].map((style) => (
                      <Badge key={style} variant="outline" className="mr-2">
                        {style}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="narrative" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Style Journey</CardTitle>
                <CardDescription>Track your fashion evolution and celebrate your styling milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {mockMilestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            milestone.category === "achievement"
                              ? "bg-primary text-primary-foreground"
                              : milestone.category === "challenge"
                                ? "bg-secondary text-secondary-foreground"
                                : milestone.category === "collaboration"
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {milestone.category === "achievement" && <Trophy className="w-6 h-6" />}
                          {milestone.category === "challenge" && <Target className="w-6 h-6" />}
                          {milestone.category === "collaboration" && <Users className="w-6 h-6" />}
                          {milestone.category === "outfit" && <Sparkles className="w-6 h-6" />}
                        </div>
                        {index < mockMilestones.length - 1 && <div className="w-px h-16 bg-border mt-4"></div>}
                      </div>

                      <div className="flex-1 pb-8">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{milestone.title}</h3>
                            <p className="text-sm text-muted-foreground">{milestone.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{milestone.date}</p>
                            {milestone.stats && (
                              <div className="flex items-center gap-3 mt-1">
                                <div className="flex items-center text-xs">
                                  <Heart className="w-3 h-3 mr-1 text-red-500" />
                                  {milestone.stats.likes}
                                </div>
                                <div className="flex items-center text-xs">
                                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                                  {milestone.stats.saves}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="w-full h-48 bg-muted rounded-lg overflow-hidden">
                          <img
                            src={milestone.image || "/placeholder.svg?height=192&width=400"}
                            alt={milestone.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockInsights.map((insight) => (
                <Card key={insight.category}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{insight.category}</CardTitle>
                      <div className="flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                        <span className="text-green-500">+{insight.change}%</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score</span>
                        <span className="font-medium">{insight.value}/100</span>
                      </div>
                      <Progress value={insight.value} className="h-3" />
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Style Analytics</CardTitle>
                <CardDescription>Your fashion data over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Style analytics chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Ghost Whisperer",
                  description: "Revived 10+ ghost items",
                  icon: "👻",
                  earned: true,
                  date: "Jan 15, 2024",
                },
                {
                  title: "Challenge Champion",
                  description: "Won 3 community challenges",
                  icon: "🏆",
                  earned: true,
                  date: "Jan 10, 2024",
                },
                {
                  title: "Sustainable Stylist",
                  description: "30-day sustainable streak",
                  icon: "🌱",
                  earned: true,
                  date: "Jan 5, 2024",
                },
                {
                  title: "Color Master",
                  description: "Use 20+ different colors",
                  icon: "🎨",
                  earned: false,
                  progress: 85,
                },
                {
                  title: "Community Leader",
                  description: "Help 50+ users with styling",
                  icon: "⭐",
                  earned: false,
                  progress: 62,
                },
                {
                  title: "Trendsetter",
                  description: "Create 5 viral outfits",
                  icon: "🔥",
                  earned: false,
                  progress: 40,
                },
              ].map((achievement) => (
                <Card key={achievement.title} className={achievement.earned ? "border-primary/50 bg-primary/5" : ""}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>

                    {achievement.earned ? (
                      <div>
                        <Badge variant="default" className="mb-2">
                          <Trophy className="w-3 h-3 mr-1" />
                          Earned
                        </Badge>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
