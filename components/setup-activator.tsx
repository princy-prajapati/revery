"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Settings, 
  Zap, 
  Camera, 
  Palette, 
  Heart,
  Users,
  Target,
  Wand2,
  RefreshCw
} from "lucide-react"

interface SetupStep {
  id: string
  title: string
  description: string
  completed: boolean
  icon: React.ReactNode
}

interface SetupActivatorProps {
  onComplete: () => void
}

export function SetupActivator({ onComplete }: SetupActivatorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isActivating, setIsActivating] = useState(false)
  const [setupData, setSetupData] = useState({
    stylePreferences: [] as string[],
    wardrobeSize: "",
    favoriteColors: [] as string[],
    occasions: [] as string[],
    aiLevel: "balanced",
    notifications: true,
    privacy: "public"
  })

  const setupSteps: SetupStep[] = [
    {
      id: "style-preferences",
      title: "Style Preferences",
      description: "Tell us about your fashion style",
      completed: setupData.stylePreferences.length > 0,
      icon: <Palette className="w-5 h-5" />
    },
    {
      id: "wardrobe-setup",
      title: "Wardrobe Setup",
      description: "Configure your digital wardrobe",
      completed: setupData.wardrobeSize !== "",
      icon: <Camera className="w-5 h-5" />
    },
    {
      id: "ai-configuration",
      title: "AI Configuration",
      description: "Set up AI styling preferences",
      completed: setupData.aiLevel !== "",
      icon: <Wand2 className="w-5 h-5" />
    },
    {
      id: "final-activation",
      title: "Activate Complete Setup",
      description: "Complete your fashion journey setup",
      completed: false,
      icon: <Zap className="w-5 h-5" />
    }
  ]

  const styleOptions = [
    "Minimalist", "Bohemian", "Classic", "Edgy", "Romantic", 
    "Streetwear", "Vintage", "Preppy", "Artsy", "Casual"
  ]

  const colorOptions = [
    "Black", "White", "Gray", "Navy", "Brown", "Beige",
    "Red", "Blue", "Green", "Purple", "Pink", "Yellow"
  ]

  const occasionOptions = [
    "Work/Professional", "Casual Day Out", "Date Night", 
    "Party/Event", "Workout/Active", "Travel", "Staying Home"
  ]

  const handleStyleToggle = (style: string) => {
    setSetupData(prev => ({
      ...prev,
      stylePreferences: prev.stylePreferences.includes(style)
        ? prev.stylePreferences.filter(s => s !== style)
        : [...prev.stylePreferences, style]
    }))
  }

  const handleColorToggle = (color: string) => {
    setSetupData(prev => ({
      ...prev,
      favoriteColors: prev.favoriteColors.includes(color)
        ? prev.favoriteColors.filter(c => c !== color)
        : [...prev.favoriteColors, color]
    }))
  }

  const handleOccasionToggle = (occasion: string) => {
    setSetupData(prev => ({
      ...prev,
      occasions: prev.occasions.includes(occasion)
        ? prev.occasions.filter(o => o !== occasion)
        : [...prev.occasions, occasion]
    }))
  }

  const handleActivate = async () => {
    setIsActivating(true)
    // Simulate setup activation
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsActivating(false)
    setIsOpen(false)
    onComplete()
  }

  const progress = (currentStep + 1) / setupSteps.length * 100

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
      >
        <Zap className="w-5 h-5 mr-2" />
        Activate Complete Setup
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    Complete Setup Activation
                  </CardTitle>
                  <CardDescription>
                    Configure your fashion app for the best experience
                  </CardDescription>
                </div>
                <Button variant="ghost" onClick={() => setIsOpen(false)}>
                  ×
                </Button>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Setup Progress</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step Navigation */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {setupSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      index === currentStep
                        ? 'border-primary bg-primary/5'
                        : step.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-muted'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {step.completed ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        step.icon
                      )}
                      <span className="font-medium text-sm">{step.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="min-h-[400px]">
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">What's your style?</h3>
                      <p className="text-muted-foreground mb-4">
                        Select all styles that resonate with you (you can choose multiple)
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {styleOptions.map((style) => (
                          <div key={style} className="flex items-center space-x-2">
                            <Checkbox
                              id={style}
                              checked={setupData.stylePreferences.includes(style)}
                              onCheckedChange={() => handleStyleToggle(style)}
                            />
                            <Label htmlFor={style} className="text-sm">{style}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Favorite Colors</h4>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map((color) => (
                          <Button
                            key={color}
                            variant={setupData.favoriteColors.includes(color) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleColorToggle(color)}
                          >
                            {color}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Wardrobe Size</h3>
                      <p className="text-muted-foreground mb-4">
                        How many clothing items do you typically have?
                      </p>
                      <Select value={setupData.wardrobeSize} onValueChange={(value) => 
                        setSetupData(prev => ({ ...prev, wardrobeSize: value }))
                      }>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select wardrobe size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (20-50 items)</SelectItem>
                          <SelectItem value="medium">Medium (50-100 items)</SelectItem>
                          <SelectItem value="large">Large (100-200 items)</SelectItem>
                          <SelectItem value="extensive">Extensive (200+ items)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Frequent Occasions</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {occasionOptions.map((occasion) => (
                          <div key={occasion} className="flex items-center space-x-2">
                            <Checkbox
                              id={occasion}
                              checked={setupData.occasions.includes(occasion)}
                              onCheckedChange={() => handleOccasionToggle(occasion)}
                            />
                            <Label htmlFor={occasion} className="text-sm">{occasion}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">AI Styling Level</h3>
                      <p className="text-muted-foreground mb-4">
                        How creative should the AI be with your outfit suggestions?
                      </p>
                      <Select value={setupData.aiLevel} onValueChange={(value) => 
                        setSetupData(prev => ({ ...prev, aiLevel: value }))
                      }>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select AI level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservative">Conservative - Safe, classic combinations</SelectItem>
                          <SelectItem value="balanced">Balanced - Mix of safe and creative</SelectItem>
                          <SelectItem value="creative">Creative - Bold, experimental combinations</SelectItem>
                          <SelectItem value="adventurous">Adventurous - Very bold, unique styling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Push Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Get notified about new outfit suggestions and style tips
                          </p>
                        </div>
                        <Checkbox
                          checked={setupData.notifications}
                          onCheckedChange={(checked) => 
                            setSetupData(prev => ({ ...prev, notifications: !!checked }))
                          }
                        />
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Privacy Level</h4>
                        <Select value={setupData.privacy} onValueChange={(value) => 
                          setSetupData(prev => ({ ...prev, privacy: value }))
                        }>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select privacy level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="private">Private - Only you can see your outfits</SelectItem>
                            <SelectItem value="friends">Friends - Share with friends only</SelectItem>
                            <SelectItem value="public">Public - Share with the community</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Ready to Activate!</h3>
                      <p className="text-muted-foreground mb-6">
                        Your fashion app is configured and ready to provide personalized styling experiences.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Palette className="w-5 h-5 text-primary" />
                          <span className="font-medium">Style Profile</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {setupData.stylePreferences.length} styles selected
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Camera className="w-5 h-5 text-primary" />
                          <span className="font-medium">Wardrobe</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {setupData.wardrobeSize} wardrobe configured
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Wand2 className="w-5 h-5 text-primary" />
                          <span className="font-medium">AI Level</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {setupData.aiLevel} styling mode
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                
                {currentStep < setupSteps.length - 1 ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!setupSteps[currentStep].completed}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleActivate}
                    disabled={isActivating}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isActivating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Activating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Activate Complete Setup
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
