"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Sparkles, Camera, Palette, Ghost, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  if (!isOpen) return null

  const demoSteps = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Upload Your Clothes",
      description: "Take photos or choose from gallery. Support for 50+ clothing types including traditional wear."
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Choose Your Style",
      description: "Select from 16 style preferences: Traditional Wear, Business Casual, Vintage, and more."
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI Outfit Generation",
      description: "Get personalized outfit suggestions based on your uploaded items and style preferences."
    },
    {
      icon: <Ghost className="h-6 w-6" />,
      title: "Ghost Challenge",
      description: "Rediscover forgotten items in your wardrobe with weekly styling challenges."
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-serif text-center pr-8">
            🎬 Revery Fashion Demo
          </CardTitle>
          <CardDescription className="text-center text-base">
            Experience AI-powered fashion styling in action
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">
              Transform Your Wardrobe with AI
            </h3>
            <p className="text-muted-foreground">
              From casual wear to traditional elegance, discover endless outfit possibilities
            </p>
          </div>

          {/* Demo Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Features List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-center">✨ Key Features</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">50+</Badge>
                <span>Clothing Types</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">16</Badge>
                <span>Style Options</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">AI</Badge>
                <span>Powered Styling</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">Free</Badge>
                <span>To Start</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4 pt-4 border-t">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Ready to Start Your Fashion Journey?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Join thousands of users who've transformed their wardrobes
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/auth/register" className="flex-1">
                <Button className="w-full">
                  🚀 Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Explore More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

