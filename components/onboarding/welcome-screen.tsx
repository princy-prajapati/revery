"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"

interface WelcomeScreenProps {
  userData: any
  onComplete: (data: any) => void
}

export default function WelcomeScreen({ userData, onComplete }: WelcomeScreenProps) {
  const handleGetStarted = () => {
    onComplete({})
  }

  return (
    <Card className="text-center">
      <CardContent className="pt-8 pb-8">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-2">
            Welcome to Revery, {userData?.firstName}!
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Get ready to transform your wardrobe with AI-powered styling. Let's create your personalized style experience.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-semibold text-sm">1</span>
            </div>
            <p className="text-sm">Upload your first clothing items to get started</p>
          </div>
          <div className="flex items-center space-x-3 text-left">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-semibold text-sm">2</span>
            </div>
            <p className="text-sm">Tell us about your style preferences</p>
          </div>
          <div className="flex items-center space-x-3 text-left">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-semibold text-sm">3</span>
            </div>
            <p className="text-sm">Get your first AI-styled outfit instantly</p>
          </div>
        </div>

        <Button onClick={handleGetStarted} size="lg" className="w-full">
          Let's Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
