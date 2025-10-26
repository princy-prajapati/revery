"use client"

import { doc, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Palette, Ghost, Sparkles, Plus, Camera, Heart, Share2, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import SignOutButton from "@/components/signout-button"
import { SetupActivator } from "@/components/setup-activator"
import { auth, db } from "@/lib/firebase"

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  photoURL: string | null;
  isOnboarded?: boolean; // Add this to track setup completion
}

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true)
  const [setupCompleted, setSetupCompleted] = useState(false)

  const handleSetupComplete = () => {
    setSetupCompleted(true)
    alert('🎉 Setup completed! Your dashboard is now fully personalized!')
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in.
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        const userDataPayload: UserData = {
            id: user.uid,
            firstName: user.displayName?.split(' ')[0] || 'User',
            lastName: user.displayName?.split(' ')[1] || '',
            email: user.email,
            photoURL: user.photoURL,
        };

        if (userDoc.exists() && userDoc.data().isOnboarded) {
            userDataPayload.isOnboarded = true;
            setSetupCompleted(true);
        } else {
            userDataPayload.isOnboarded = false;
            setSetupCompleted(false);
        }
        setUserData(userDataPayload);
      } else {
        // User is signed out, redirect to login.
        router.push('/auth/login');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Mock data for dashboard
  const mockData = {
    ghostItem: {
      name: "Red Cardigan",
      lastWorn: "3 weeks ago",
      image: "/placeholder.svg",
      challenge: "Try styling it this week!"
    },
    dailyOutfit: {
      items: [
        { name: "White Shirt", image: "/white-cotton-shirt.jpg" },
        { name: "Dark Jeans", image: "/dark-wash-jeans.jpg" },
        { name: "Black Shoes", image: "/placeholder.svg" }
      ],
      occasion: "Casual Friday",
      confidence: 92
    },
    styleStats: {
      totalItems: 12,
      outfitsCreated: 8,
      ghostItems: 3,
      styleScore: 85
    },
    recentActivity: [
      { action: "Created outfit", item: "Summer Casual", time: "2 hours ago" },
      { action: "Uploaded item", item: "Blue Dress", time: "1 day ago" },
      { action: "Completed challenge", item: "Red Cardigan", time: "3 days ago" }
    ]
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Palette className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (userData && !setupCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-serif text-2xl">Welcome to Revery, {userData?.firstName}!</CardTitle>
            <CardDescription>
              Let's personalize your fashion experience. Complete the setup to unlock your AI-powered dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SetupActivator onComplete={handleSetupComplete} />
            <p className="text-xs text-muted-foreground mt-4">
              This will help us tailor outfit suggestions to your unique style.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!userData) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
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
              <Link href="/neckline-image-manager">
                <Button variant="ghost">Manage Neckline Images</Button>
              </Link>
              <Avatar className="h-8 w-8">
                <AvatarImage src={userData.photoURL || "/placeholder.svg"} />
                <AvatarFallback>{userData.firstName?.[0]}{userData.lastName?.[0]}</AvatarFallback>
              </Avatar>
              <SignOutButton onSignOut={() => router.push('/auth/login')} />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold mb-2">
                Hi, {userData.firstName}! 👋
              </h1>
              <p className="text-muted-foreground">
                Ready to discover new outfit combinations with your wardrobe?
              </p>
            </div>
            <SetupActivator onComplete={handleSetupComplete} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ghost Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Ghost className="h-5 w-5 text-orange-500" />
                  <span>Wardrobe Ghost Challenge</span>
                </CardTitle>
                <CardDescription>
                  Rediscover items that haven't been worn in a while
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <img
                    src={mockData.ghostItem.image}
                    alt={mockData.ghostItem.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{mockData.ghostItem.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Last worn {mockData.ghostItem.lastWorn}
                    </p>
                    <p className="text-sm font-medium text-orange-600">
                      {mockData.ghostItem.challenge}
                    </p>
                  </div>
                  <Button size="sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Suggestions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Daily Outfit Inspiration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Today's Outfit Inspiration</span>
                </CardTitle>
                <CardDescription>
                  AI-generated outfit using your wardrobe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{mockData.dailyOutfit.occasion}</h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {mockData.dailyOutfit.confidence}% Match
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {mockData.dailyOutfit.items.map((item, index) => (
                      <div key={index} className="text-center space-y-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-20 object-cover rounded"
                        />
                        <p className="text-xs font-medium">{item.name}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Save Outfit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>✨ Continue Your Fashion Journey</CardTitle>
                <p className="text-sm text-muted-foreground">Explore more features and keep building your style</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/wardrobe/upload">
                    <Button variant="outline" className="w-full h-20 flex-col space-y-2 hover:bg-primary/5 transition-colors">
                      <Plus className="h-6 w-6 text-primary" />
                      <span className="font-medium">Add New Items</span>
                    </Button>
                  </Link>
                  <Link href="/styling">
                    <Button variant="outline" className="w-full h-20 flex-col space-y-2 hover:bg-primary/5 transition-colors">
                      <Sparkles className="h-6 w-6 text-primary" />
                      <span className="font-medium">Create Outfits</span>
                    </Button>
                  </Link>
                  <Link href="/wardrobe">
                    <Button variant="outline" className="w-full h-20 flex-col space-y-2 hover:bg-primary/5 transition-colors">
                      <Camera className="h-6 w-6 text-primary" />
                      <span className="font-medium">View My Closet</span>
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-20 flex-col space-y-2 hover:bg-primary/5 transition-colors">
                    <Ghost className="h-6 w-6 text-primary" />
                    <span className="font-medium">Ghost Challenge</span>
                  </Button>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-3">
                    <Link href="/styling">
                      <Button className="w-full h-12 text-base font-semibold">
                        🚀 Start Your Fashion Journey
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      className="w-full h-10 text-sm"
                      onClick={() => {
                        // Show demo functionality with more details
                        const demoInfo = `
🎬 Fashion Journey Demo

🚀 What you can do:
• Upload more clothing items (50+ types)
• Try different style combinations
• Complete Ghost Challenges
• Explore outfit variations
• Track your style evolution

🎯 Your dashboard is ready to explore!
Click "Start Your Fashion Journey" to begin styling!
                        `
                        alert(demoInfo)
                      }}
                    >
                      📺 Watch Demo
                    </Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Discover new outfit combinations and style tips
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Style Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Style Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Style Score</span>
                    <span>{mockData.styleStats.styleScore}%</span>
                  </div>
                  <Progress value={mockData.styleStats.styleScore} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{mockData.styleStats.totalItems}</div>
                    <div className="text-xs text-muted-foreground">Items</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{mockData.styleStats.outfitsCreated}</div>
                    <div className="text-xs text-muted-foreground">Outfits</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.item}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Style Narrative Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Your Style Narrative</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Minimalist</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Classic</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
