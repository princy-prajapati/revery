"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Ghost, Zap, Heart, RefreshCw, Palette, ArrowRight, Clock, Target, Plus, Camera, Check, X, Share2 } from "lucide-react"
import Link from "next/link"
import { OutfitSelector } from "@/components/outfit-selector"

interface OutfitSuggestion {
  id: string
  title: string
  description: string
  items: string[]
  occasion: string
  difficulty: "Easy" | "Medium" | "Advanced"
  ghostItemsUsed: number
  image: string
}

interface GhostChallenge {
  id: string
  title: string
  ghostItem: string
  description: string
  deadline: string
  progress: number
  suggestions: OutfitSuggestion[]
  completed: boolean
}

const mockOutfitSuggestions: OutfitSuggestion[] = [
  {
    id: "1",
    title: "Elevated Casual",
    description: "Transform your black velvet blazer into a chic casual look",
    items: ["Black Velvet Blazer", "White Cotton Shirt", "Dark Wash Jeans", "Black Ankle Boots"],
    occasion: "Brunch with friends",
    difficulty: "Easy",
    ghostItemsUsed: 1,
    image: "/outfit-elevated-casual.jpg",
  },
  {
    id: "2",
    title: "Layered Sophistication",
    description: "Create depth with unexpected layering combinations",
    items: ["Floral Summer Dress", "Vintage Denim Jacket", "Gray Cashmere Scarf", "White Sneakers"],
    occasion: "Weekend shopping",
    difficulty: "Medium",
    ghostItemsUsed: 2,
    image: "/outfit-layered-sophistication.jpg",
  },
  {
    id: "3",
    title: "Statement Accessory Focus",
    description: "Let your cashmere scarf be the star of this minimalist outfit",
    items: ["White Cotton Shirt", "Dark Wash Jeans", "Gray Cashmere Scarf", "Black Loafers"],
    occasion: "Coffee date",
    difficulty: "Easy",
    ghostItemsUsed: 1,
    image: "/outfit-statement-accessory.jpg",
  },
]

const mockGhostChallenges: GhostChallenge[] = [
  {
    id: "1",
    title: "Blazer Revival Challenge",
    ghostItem: "Black Velvet Blazer",
    description: "Style your black velvet blazer in 3 different ways this week",
    deadline: "3 days left",
    progress: 33,
    suggestions: mockOutfitSuggestions.slice(0, 1),
    completed: false,
  },
  {
    id: "2",
    title: "Scarf Styling Challenge",
    ghostItem: "Gray Cashmere Scarf",
    description: "Discover 5 creative ways to wear your cashmere scarf",
    deadline: "5 days left",
    progress: 0,
    suggestions: mockOutfitSuggestions.slice(2, 3),
    completed: false,
  },
]

interface SelectedOutfit {
  id: string;
  name: string;
  items: any[];
  occasion: string;
  confidence: number;
  image: string;
  description: string;
  tags: string[];
}

export default function StylingPage() {
  const [activeTab, setActiveTab] = useState("suggestions")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedOutfit, setSelectedOutfit] = useState<SelectedOutfit | null>(null)
  const [showOutfitSelector, setShowOutfitSelector] = useState(false)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...imageUrls].slice(0, 15)); // Limit to 15 images
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerateOutfits = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      setShowOutfitSelector(true)
    }, 2000)
  }

  const handleOutfitSelect = (outfit: SelectedOutfit) => {
    setSelectedOutfit(outfit);
    setShowOutfitSelector(false);
    alert(`Selected outfit: ${outfit.name}! This outfit has been saved to your favorites.`);
  };

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
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/wardrobe">
                <Button variant="ghost">Wardrobe</Button>
              </Link>
              <Link href="/community">
                <Button variant="ghost">Community</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold mb-2">AI Styling Studio</h1>
            <p className="text-muted-foreground">
              Discover new outfit combinations and revive your wardrobe ghosts with AI-powered styling
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="styling-image-select"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('styling-image-select')?.click()}
              disabled={selectedImages.length >= 15}
            >
              <Camera className="w-4 h-4 mr-2" />
              {selectedImages.length === 0 ? 'Select Images' : `Add More (${selectedImages.length}/15)`}
            </Button>
            <Button onClick={handleGenerateOutfits} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate New Outfits
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Challenges</p>
                  <p className="text-2xl font-bold">{mockGhostChallenges.filter((c) => !c.completed).length}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outfits Created</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Sparkles className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ghosts Revived</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Ghost className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Style Score</p>
                  <p className="text-2xl font-bold">87</p>
                </div>
                <Zap className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Images Display */}
        {selectedImages.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Selected Images ({selectedImages.length}/15)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-3">
                {selectedImages.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl}
                      alt={`Selected item ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg border"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {showOutfitSelector ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Choose Your Perfect Outfit</h2>
              <Button 
                variant="outline" 
                onClick={() => setShowOutfitSelector(false)}
              >
                <X className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
            
            <OutfitSelector 
              selectedImages={selectedImages}
              onOutfitSelect={handleOutfitSelect}
            />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
              <TabsTrigger value="challenges">Ghost Challenges</TabsTrigger>
              <TabsTrigger value="history">Styling History</TabsTrigger>
            </TabsList>

          <TabsContent value="suggestions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Personalized Outfit Suggestions</h2>
              <Badge variant="secondary">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Generated
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockOutfitSuggestions.map((outfit) => (
                <Card key={outfit.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-[4/5] bg-muted rounded-t-lg overflow-hidden">
                      <img
                        src={outfit.image || "/placeholder.svg"}
                        alt={outfit.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{outfit.title}</h3>
                          <p className="text-sm text-muted-foreground">{outfit.description}</p>
                        </div>
                        {outfit.ghostItemsUsed > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            <Ghost className="w-3 h-3 mr-1" />
                            {outfit.ghostItemsUsed}
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Occasion:</span>
                          <span>{outfit.occasion}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Difficulty:</span>
                          <Badge
                            variant={
                              outfit.difficulty === "Easy"
                                ? "secondary"
                                : outfit.difficulty === "Medium"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {outfit.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Items needed:</p>
                        <div className="flex flex-wrap gap-1">
                          {outfit.items.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <Heart className="w-4 h-4 mr-2" />
                          Save Outfit
                        </Button>
                        <Button variant="outline" size="sm">
                          Try On
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Active Ghost Challenges</h2>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create Challenge
              </Button>
            </div>

            <div className="space-y-6">
              {mockGhostChallenges.map((challenge) => (
                <Card key={challenge.id} className="border-destructive/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Ghost className="h-5 w-5 text-destructive" />
                          <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        </div>
                        <CardDescription>{challenge.description}</CardDescription>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{challenge.deadline}</span>
                          </div>
                          <Badge variant="outline">{challenge.ghostItem}</Badge>
                        </div>
                      </div>
                      <Badge variant={challenge.progress > 0 ? "default" : "secondary"}>
                        {challenge.progress}% Complete
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>

                    {challenge.suggestions.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium">Suggested Outfits:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {challenge.suggestions.map((suggestion) => (
                            <Card key={suggestion.id} className="border-muted">
                              <CardContent className="p-4">
                                <div className="flex space-x-3">
                                  <div className="w-16 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                                    <img
                                      src={suggestion.image || "/placeholder.svg"}
                                      alt={suggestion.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-medium text-sm mb-1">{suggestion.title}</h5>
                                    <p className="text-xs text-muted-foreground mb-2">{suggestion.description}</p>
                                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                      Try This Look
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Button variant="outline">Skip Challenge</Button>
                      <Button>
                        Complete Challenge
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="text-center py-12">
              <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-2">Your Styling Journey</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Track your outfit creations and see how your style has evolved over time.
              </p>
              <Button>View Style Timeline</Button>
            </div>
          </TabsContent>
        </Tabs>
        )}

        {selectedOutfit && (
          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                Selected Outfit: {selectedOutfit.name}
              </CardTitle>
              <CardDescription>{selectedOutfit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">
                    {selectedOutfit.occasion}
                  </Badge>
                  <Badge variant="outline">
                    {Math.round(selectedOutfit.confidence * 100)}% Match
                  </Badge>
                  <div className="flex space-x-1">
                    {selectedOutfit.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
