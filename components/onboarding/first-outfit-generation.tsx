"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Heart, Share2, ArrowRight, ArrowLeft } from "lucide-react"

interface FirstOutfitGenerationProps {
  userData: any
  onboardingData: any
  onComplete: (data: any) => void
  onBack: () => void
}

export default function FirstOutfitGeneration({ userData, onboardingData, onComplete }: FirstOutfitGenerationProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [outfitGenerated, setOutfitGenerated] = useState(false)
  const [generatedOutfit, setGeneratedOutfit] = useState<any>(null)
  const [isCompleting, setIsCompleting] = useState(false)

  // Function to generate outfit based on user's actual selections
  const generateOutfitFromUserData = () => {
    const uploadedItems = onboardingData?.uploadedItems || []
    const stylePreferences = onboardingData?.profileAnswers || {}
    
    // Use actual uploaded items if available
    if (uploadedItems.length > 0) {
      // Create outfit from user's uploaded items
      const outfitItems = uploadedItems.slice(0, 3).map((item: any) => ({
        name: item.name || item.type,
        type: item.type,
        color: item.color,
        category: item.category,
        image: item.image
      }))
      
      // Determine occasion based on style preference
      let occasion = "Casual Day Out"
      if (stylePreferences.preferredStyle === "Traditional Wear") {
        occasion = "Traditional Elegance"
      } else if (stylePreferences.preferredStyle === "Business Casual") {
        occasion = "Professional Look"
      } else if (stylePreferences.preferredStyle === "Vintage") {
        occasion = "Vintage Style"
      } else if (stylePreferences.preferredStyle === "Athletic") {
        occasion = "Active Lifestyle"
      }
      
      return {
        items: outfitItems,
        occasion: occasion,
        confidence: 95,
        basedOnUserSelection: true
      }
    }
    
    // Fallback to style-based templates if no uploaded items
    const styleTemplates = {
      "Traditional Wear": {
        items: [
          { name: "Cotton Kurta", type: "Traditional Top", color: "Cream", category: "Traditional Tops", image: "/placeholder.svg" },
          { name: "White Churidar", type: "Traditional Bottom", color: "White", category: "Traditional Bottoms", image: "/placeholder.svg" },
          { name: "Embroidered Dupatta", type: "Traditional Accessory", color: "Gold", category: "Traditional Accessories", image: "/placeholder.svg" }
        ],
        occasion: "Traditional Elegance",
        confidence: 90
      },
      "Business Casual": {
        items: [
          { name: "Gray Long Sleeve Shirt", type: "Top", color: "Gray", category: "Tops", image: "/placeholder.svg" },
          { name: "Black Trousers", type: "Bottom", color: "Black", category: "Bottoms", image: "/placeholder.svg" },
          { name: "Brown Loafers", type: "Shoes", color: "Brown", category: "Footwear", image: "/placeholder.svg" }
        ],
        occasion: "Professional Look",
        confidence: 92
      },
      "Vintage": {
        items: [
          { name: "Vintage Blouse", type: "Top", color: "Burgundy", category: "Tops", image: "/placeholder.svg" },
          { name: "High-Waist Skirt", type: "Bottom", color: "Navy Blue", category: "Bottoms", image: "/placeholder.svg" },
          { name: "Classic Heels", type: "Shoes", color: "Black", category: "Footwear", image: "/placeholder.svg" }
        ],
        occasion: "Vintage Style",
        confidence: 88
      }
    }
    
    const selectedStyle = stylePreferences.preferredStyle || "Minimalist"
    return styleTemplates[selectedStyle as keyof typeof styleTemplates] || styleTemplates["Traditional Wear"]
  }

  const handleGenerateOutfit = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Generate outfit based on user's actual selections
    const outfit = generateOutfitFromUserData()
    setGeneratedOutfit(outfit)
    
    setIsGenerating(false)
    setOutfitGenerated(true)
  }

  const handleComplete = () => {
    setIsCompleting(true)
    
    // Show completion feedback
    const completionData = {
      firstOutfitGenerated: true,
      completedAt: new Date().toISOString(),
      userStyle: onboardingData?.profileAnswers?.preferredStyle,
      itemsUploaded: onboardingData?.uploadedItems?.length || 0
    }
    
    // Simulate a brief completion process
    setTimeout(() => {
      onComplete(completionData)
    }, 1500)
  }

  // Use the generated outfit from user data, or show a default message
  const displayOutfit = generatedOutfit || {
    items: [],
    occasion: "No outfit generated yet",
    confidence: 0
  }

  return (
    <Card>
      <CardHeader>

        <CardTitle className="text-center">✨ First Outfit Reveal</CardTitle>
        <p className="text-center text-muted-foreground">
          Get ready to see your first AI-generated outfit using your uploaded clothes and style preferences!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!outfitGenerated ? (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Ready to see the magic?</h3>
              <p className="text-muted-foreground">
                Our AI will analyze your uploaded items and style preferences to create your first personalized outfit.
              </p>
            </div>

            <Button
              onClick={handleGenerateOutfit}
              disabled={isGenerating}
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Generating your outfit...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate My First Outfit
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Success Message */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg">Your first look is ready!</h3>
              <p className="text-muted-foreground">
                Here's an outfit we styled just for you using your {onboardingData?.profileAnswers?.preferredStyle || 'selected'} style preferences and uploaded items.
              </p>
            </div>

            {/* Generated Outfit */}
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{displayOutfit.occasion}</h4>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {displayOutfit.confidence}% Match
                </Badge>
              </div>
              
              {displayOutfit.basedOnUserSelection && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">
                    ✨ Generated from your uploaded items and style preferences!
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-3">
                {displayOutfit.items.map((item, index) => (
                  <div key={index} className="text-center space-y-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-20 object-cover rounded"
                    />
                    <div className="space-y-1">
                      <p className="text-xs font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.color}</p>
                      <p className="text-xs text-blue-600 font-medium">{item.category}</p>
                    </div>
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

            {/* Next Steps */}
            <div className="space-y-4">
              <h4 className="font-semibold">What's next?</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Explore your personalized dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Try the Ghost Challenge to rediscover forgotten items</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Upload more items to expand your styling options</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleComplete} 
              size="lg" 
              className="w-full"
              disabled={isCompleting}
            >
              {isCompleting ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Completing Setup...
                </>
              ) : (
                <>
                  Complete Setup
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
            
            {isCompleting && (
              <div className="text-center mt-2">
                <p className="text-sm text-muted-foreground">
                  🎉 Setting up your personalized dashboard...
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
