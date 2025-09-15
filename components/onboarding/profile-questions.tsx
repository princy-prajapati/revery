"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface ProfileQuestionsProps {
  userData: any
  onComplete: (data: any) => void
  onBack: () => void
}

export default function ProfileQuestions({ onComplete, onBack }: ProfileQuestionsProps) {
  const [answers, setAnswers] = useState({
    preferredStyle: "",
    bodyType: "",
    avoidColors: [] as string[],
    avoidFabrics: [] as string[]
  })

  const styleOptions = [
    "Minimalist",
    "Bohemian", 
    "Classic",
    "Edgy",
    "Romantic",
    "Athletic",
    "Preppy",
    "Vintage",
    "Streetwear",
    "Business Casual",
    "Trendy",
    "Eco-Friendly",
    "Traditional Wear",
    "Ethnic Fashion",
    "Cultural Style",
    "Heritage Fashion"
  ]

  const bodyTypeOptions = [
    "Pear-shaped",
    "Apple-shaped",
    "Hourglass",
    "Rectangle",
    "Inverted Triangle",
    "Prefer not to say"
  ]

  const colorOptions = [
    "Orange",
    "Yellow", 
    "Purple",
    "Pink",
    "Brown",
    "Gray",
    "Navy Blue",
    "Burgundy",
    "Olive Green",
    "Beige",
    "Maroon",
    "Teal"
  ]

  const fabricOptions = [
    "Polyester",
    "Nylon",
    "Acrylic",
    "Leather",
    "Fur",
    "Sequins",
    "Denim",
    "Wool",
    "Silk",
    "Linen",
    "Cotton",
    "Spandex"
  ]

  const handleStyleChange = (value: string) => {
    setAnswers(prev => ({ ...prev, preferredStyle: value }))
  }

  const handleBodyTypeChange = (value: string) => {
    setAnswers(prev => ({ ...prev, bodyType: value }))
  }

  const handleColorToggle = (color: string) => {
    setAnswers(prev => ({
      ...prev,
      avoidColors: prev.avoidColors.includes(color)
        ? prev.avoidColors.filter(c => c !== color)
        : [...prev.avoidColors, color]
    }))
  }

  const handleFabricToggle = (fabric: string) => {
    setAnswers(prev => ({
      ...prev,
      avoidFabrics: prev.avoidFabrics.includes(fabric)
        ? prev.avoidFabrics.filter(f => f !== fabric)
        : [...prev.avoidFabrics, fabric]
    }))
  }

  const handleContinue = () => {
    onComplete({ profileAnswers: answers })
  }

  const isComplete = answers.preferredStyle && answers.bodyType

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">🎨 Answer Your Style Preferences</CardTitle>
        <p className="text-center text-muted-foreground">
          Help us understand your style so we can create perfect outfit suggestions for you
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Preferred Style */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">What's your preferred style?</Label>
          <RadioGroup value={answers.preferredStyle} onValueChange={handleStyleChange}>
            {styleOptions.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <RadioGroupItem value={style} id={style} />
                <Label htmlFor={style}>{style}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Body Type */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">What's your body type?</Label>
          <RadioGroup value={answers.bodyType} onValueChange={handleBodyTypeChange}>
            {bodyTypeOptions.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={type} />
                <Label htmlFor={type}>{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Avoid Colors */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Are there any colors you want to avoid?</Label>
          <div className="grid grid-cols-2 gap-3">
            {colorOptions.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={color}
                  checked={answers.avoidColors.includes(color)}
                  onCheckedChange={() => handleColorToggle(color)}
                />
                <Label htmlFor={color} className="text-sm">{color}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Avoid Fabrics */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Are there any fabrics you want to avoid?</Label>
          <div className="grid grid-cols-2 gap-3">
            {fabricOptions.map((fabric) => (
              <div key={fabric} className="flex items-center space-x-2">
                <Checkbox
                  id={fabric}
                  checked={answers.avoidFabrics.includes(fabric)}
                  onCheckedChange={() => handleFabricToggle(fabric)}
                />
                <Label htmlFor={fabric} className="text-sm">{fabric}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!isComplete}
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
