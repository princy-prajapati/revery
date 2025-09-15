"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Palette, Sparkles, Camera, ArrowRight, Check } from "lucide-react"
import WelcomeScreen from "@/components/onboarding/welcome-screen"
import ClosetScanFlow from "@/components/onboarding/closet-scan-flow"
import ProfileQuestions from "@/components/onboarding/profile-questions"
import FirstOutfitGeneration from "@/components/onboarding/first-outfit-generation"

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState<any>(null)
  const [isCompleting, setIsCompleting] = useState(false)
  const [onboardingData, setOnboardingData] = useState({
    uploadedItems: [],
    stylePreferences: {},
    profileAnswers: {}
  })

  useEffect(() => {
    // Set up mock user data for public access
    const mockUser = {
      id: 'public-user',
      firstName: 'Fashion',
      lastName: 'Enthusiast',
      email: 'user@revery.com',
      isOnboarded: false,
      accessMode: 'public'
    }
    setUserData(mockUser)
  }, [])

  const onboardingSteps = [
    {
      id: 'upload-clothes',
      title: 'Upload Clothes',
      description: 'Add your first clothing items',
      component: ClosetScanFlow
    },
    {
      id: 'preferences',
      title: 'Answer Preferences',
      description: 'Tell us about your style',
      component: ProfileQuestions
    },
    {
      id: 'outfit-reveal',
      title: 'First Outfit Reveal',
      description: 'See AI styling in action',
      component: FirstOutfitGeneration
    }
  ]

  const handleStepComplete = (stepData: any) => {
    setOnboardingData(prev => ({
      ...prev,
      ...stepData
    }))

    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      setIsCompleting(true)
      completeOnboarding()
    }
  }

  const completeOnboarding = () => {
    if (userData) {
      // Mark onboarding as completed with timestamp
      const updatedUser = {
        ...userData,
        isOnboarded: true,
        onboardingCompletedAt: new Date().toISOString(),
        onboardingData: {
          ...onboardingData,
          completedSteps: onboardingSteps.length,
          completionDate: new Date().toISOString()
        }
      }
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser))
      localStorage.setItem('onboardingCompleted', 'true')
      
      // Show success message briefly before redirecting
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    }
  }

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Palette className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (isCompleting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Sparkles className="h-10 w-10 text-green-600 animate-pulse" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-4">🎉 Setup Complete!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Welcome to your personalized fashion dashboard, {userData.firstName}!
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✅ Style preferences saved</p>
            <p>✅ Clothing items processed</p>
            <p>✅ First outfit generated</p>
            <p>✅ Dashboard ready</p>
          </div>
        </div>
      </div>
    )
  }

  const CurrentComponent = onboardingSteps[currentStep].component

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-primary" />
              <span className="font-serif text-2xl font-bold text-foreground">Revery</span>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{onboardingSteps[currentStep].title}</div>
              <div className="text-sm text-muted-foreground">
                Page {currentStep + 1} of {onboardingSteps.length}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {onboardingSteps[currentStep].description}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-2xl mx-auto">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {onboardingSteps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-1">
                {index <= currentStep ? (
                  <Check className="h-3 w-3 text-primary" />
                ) : (
                  <div className="h-3 w-3 rounded-full border border-muted-foreground" />
                )}
                <span className={index <= currentStep ? "text-primary font-medium" : ""}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <CurrentComponent
            userData={userData}
            onboardingData={onboardingData}
            onComplete={handleStepComplete}
            onBack={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
          />
        </div>
      </div>
    </div>
  )
}
