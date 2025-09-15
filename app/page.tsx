"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Users, Recycle, Zap, ArrowRight, Ghost, Palette, Heart } from "lucide-react"
import Link from "next/link"
import DemoModal from "@/components/demo-modal"
import { SetupActivator } from "@/components/setup-activator"

export default function HomePage() {
  const [showDemo, setShowDemo] = useState(false)
  const [setupCompleted, setSetupCompleted] = useState(false)

  const handleSetupComplete = () => {
    setSetupCompleted(true)
    alert('🎉 Setup completed! Your fashion app is now fully configured and ready to use!')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-primary" />
              <span className="font-serif text-2xl font-bold text-foreground">Revery</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#community" className="text-muted-foreground hover:text-foreground transition-colors">
                Community
              </Link>
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Fashion Discovery
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
              Rediscover Your
              <span className="text-primary block">Hidden Style</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your existing wardrobe into endless possibilities. From casual wear to traditional elegance, our AI finds your forgotten pieces and creates stunning outfits you never imagined.
            </p>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Clothing Types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">16</div>
                <div className="text-sm text-muted-foreground">Style Options</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">AI</div>
                <div className="text-sm text-muted-foreground">Powered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Free</div>
                <div className="text-sm text-muted-foreground">To Start</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="text-lg px-8">
                  🚀 Start Your Fashion Journey
                </Button>
              </Link>
              <SetupActivator onComplete={handleSetupComplete} />
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8"
                >
                  🎨 Try Demo
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8"
                onClick={() => setShowDemo(true)}
              >
                📺 Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-16 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                    <img
                      src="/stylish-outfit-collage.jpg"
                      alt="Style collage"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Your wardrobe, reimagined</p>
                </CardContent>
              </Card>
              <Card className="transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="aspect-square bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                    <img
                      src="/ai-fashion-styling-interface.jpg"
                      alt="AI styling"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">AI-powered suggestions</p>
                </CardContent>
              </Card>
              <Card className="transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg mb-4 flex items-center justify-center">
                    <img
                      src="/fashion-community-sharing.jpg"
                      alt="Community"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Community inspiration</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Revolutionary Fashion Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover the power of AI styling, community collaboration, and sustainable fashion practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Wardrobe Ghosts */}
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Ghost className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif">Wardrobe Ghosts</CardTitle>
                <CardDescription>
                  Our AI identifies forgotten items in your closet and creates weekly styling challenges to bring them
                  back to life.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Style Narrative */}
            <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-serif">Style Narrative</CardTitle>
                <CardDescription>
                  Track your fashion evolution with our visual storytelling feature that documents your style journey
                  over time.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Collaborative Closets */}
            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-serif">Collaborative Closets</CardTitle>
                <CardDescription>
                  Share wardrobes with friends and get AI suggestions that incorporate items from multiple closets for
                  events.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* AI Restyling */}
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif">Creative AI Restyling</CardTitle>
                <CardDescription>
                  Get radical styling ideas including layering techniques, DIY upcycling suggestions, and accessory
                  transformations.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Remix Challenges */}
            <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-serif">Remix Challenges</CardTitle>
                <CardDescription>
                  Join community challenges where users remix single items into complete outfits, crowdsourcing
                  creativity.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Sustainability Focus */}
            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Recycle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-serif">Sustainability First</CardTitle>
                <CardDescription>
                  Reduce textile waste by maximizing your existing wardrobe instead of encouraging new purchases.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Traditional & Cultural Wear */}
            <Card className="border-2 border-orange-200 hover:border-orange-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="font-serif">Traditional & Cultural Wear</CardTitle>
                <CardDescription>
                  Embrace your heritage with AI styling for traditional wear including sarees, kurtas, kimonos, and cultural fashion from around the world.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg p-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Transform Your Style?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-pretty text-white">
              Join thousands of fashion enthusiasts who are rediscovering their wardrobes and reducing fashion waste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Start Your Free Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <SetupActivator onComplete={handleSetupComplete} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="h-8 w-8 text-primary" />
                <span className="font-serif text-2xl font-bold">Revery</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Transforming fashion through AI-powered styling, community collaboration, and sustainable practices.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Wardrobe Ghosts</li>
                <li>AI Styling</li>
                <li>Style Narrative</li>
                <li>Community Hub</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Revery. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
    </div>
  )
}
