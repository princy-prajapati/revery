"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Sparkles, Zap, RefreshCw, Wand2 } from "lucide-react"

interface StylingPreferences {
  occasion: string
  weather: string
  colorPreference: string
  styleVibe: string
  creativityLevel: number[]
  includeGhosts: boolean
}

export function AIStylingEngine() {
  const [preferences, setPreferences] = useState<StylingPreferences>({
    occasion: "",
    weather: "",
    colorPreference: "",
    styleVibe: "",
    creativityLevel: [50],
    includeGhosts: true,
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Wand2 className="h-5 w-5 text-primary" />
          <CardTitle>AI Styling Engine</CardTitle>
        </div>
        <CardDescription>Customize your styling preferences to get personalized outfit suggestions</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Occasion Selection */}
        <div className="space-y-2">
          <Label>Occasion</Label>
          <Select
            value={preferences.occasion}
            onValueChange={(value) => setPreferences({ ...preferences, occasion: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="What's the occasion?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work/Professional</SelectItem>
              <SelectItem value="casual">Casual Day Out</SelectItem>
              <SelectItem value="date">Date Night</SelectItem>
              <SelectItem value="party">Party/Event</SelectItem>
              <SelectItem value="workout">Workout/Active</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="home">Staying Home</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Weather */}
        <div className="space-y-2">
          <Label>Weather</Label>
          <Select
            value={preferences.weather}
            onValueChange={(value) => setPreferences({ ...preferences, weather: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="What's the weather like?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hot">Hot & Sunny</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="mild">Mild</SelectItem>
              <SelectItem value="cool">Cool</SelectItem>
              <SelectItem value="cold">Cold</SelectItem>
              <SelectItem value="rainy">Rainy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Style Vibe */}
        <div className="space-y-2">
          <Label>Style Vibe</Label>
          <Select
            value={preferences.styleVibe}
            onValueChange={(value) => setPreferences({ ...preferences, styleVibe: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="What vibe are you going for?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimalist">Minimalist</SelectItem>
              <SelectItem value="bohemian">Bohemian</SelectItem>
              <SelectItem value="edgy">Edgy/Rock</SelectItem>
              <SelectItem value="romantic">Romantic</SelectItem>
              <SelectItem value="streetwear">Streetwear</SelectItem>
              <SelectItem value="vintage">Vintage</SelectItem>
              <SelectItem value="preppy">Preppy</SelectItem>
              <SelectItem value="artsy">Artsy/Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Color Preference */}
        <div className="space-y-2">
          <Label>Color Preference</Label>
          <Select
            value={preferences.colorPreference}
            onValueChange={(value) => setPreferences({ ...preferences, colorPreference: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any color preferences?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neutral">Neutral Tones</SelectItem>
              <SelectItem value="bold">Bold & Bright</SelectItem>
              <SelectItem value="monochrome">Monochrome</SelectItem>
              <SelectItem value="pastels">Pastels</SelectItem>
              <SelectItem value="earth">Earth Tones</SelectItem>
              <SelectItem value="jewel">Jewel Tones</SelectItem>
              <SelectItem value="any">No Preference</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Creativity Level */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>Creativity Level</Label>
            <Badge variant="outline">{preferences.creativityLevel[0]}%</Badge>
          </div>
          <Slider
            value={preferences.creativityLevel}
            onValueChange={(value) => setPreferences({ ...preferences, creativityLevel: value })}
            max={100}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Safe & Classic</span>
            <span>Bold & Experimental</span>
          </div>
        </div>

        {/* Include Ghost Items Toggle */}
        <div className="flex items-center justify-between p-4 bg-destructive/5 rounded-lg border border-destructive/20">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-destructive" />
            <div>
              <p className="font-medium text-sm">Include Ghost Items</p>
              <p className="text-xs text-muted-foreground">Prioritize underutilized wardrobe pieces</p>
            </div>
          </div>
          <Button
            variant={preferences.includeGhosts ? "destructive" : "outline"}
            size="sm"
            onClick={() => setPreferences({ ...preferences, includeGhosts: !preferences.includeGhosts })}
          >
            {preferences.includeGhosts ? "Enabled" : "Disabled"}
          </Button>
        </div>

        {/* Generate Button */}
        <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating Outfits...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Generate AI Outfits
            </>
          )}
        </Button>

        {isGenerating && (
          <div className="text-center space-y-2">
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
            <p className="text-sm text-muted-foreground">AI is analyzing your wardrobe...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
