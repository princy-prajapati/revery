"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Sparkles, Camera, Ghost, Zap, Check, X, Heart, Share2, RefreshCw } from "lucide-react"
import Link from "next/link";
import { OutfitSelector } from "@/components/outfit-selector";

interface OutfitSuggestion {
  id: string;
  name: string;
  items: any[];
  occasion: string;
  confidence: number;
  image: string;
  description: string;
  tags: string[];
}

export default function GeneratePage() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitSuggestion | null>(null);
  const [showOutfitSelector, setShowOutfitSelector] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...imageUrls].slice(0, 10)); // Limit to 10 images
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = () => {
    if (selectedImages.length === 0) {
      alert('Please select at least one image to generate outfits!');
      return;
    }
    setIsGenerating(true);
    // Simulate AI generation time before showing selector
    setTimeout(() => {
      setShowOutfitSelector(true);
      setIsGenerating(false);
    }, 1500);
  };

  const handleOutfitSelect = (outfit: OutfitSuggestion) => {
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
              <Link href="/styling">
                <Button variant="ghost">Styling</Button>
              </Link>
              <Link href="/wardrobe">
                <Button variant="ghost">Wardrobe</Button>
              </Link>
              <Link href="/community">
                <Button variant="ghost">Community</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Styling
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Generate Your Perfect Outfit
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let our AI create stunning outfit combinations from your wardrobe. Discover new ways to style your existing clothes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Ghost className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif">Wardrobe Ghosts</CardTitle>
                <CardDescription>
                  Rediscover forgotten items in your closet with AI-powered styling suggestions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-serif">Smart Combinations</CardTitle>
                <CardDescription>
                  Get intelligent outfit recommendations based on your style preferences and occasions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-serif">Visual Styling</CardTitle>
                <CardDescription>
                  See how your outfits will look with our advanced AI visualization technology.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Image Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Select Images for AI Generation
              </CardTitle>
              <CardDescription>
                Choose multiple clothing items to generate outfit combinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Selected {selectedImages.length} of 10 images
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-select"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('image-select')?.click()}
                    disabled={selectedImages.length >= 10}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {selectedImages.length === 0 ? 'Select Images' : 'Add More Images'}
                  </Button>
                </div>
                
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {selectedImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Selected item ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {!showOutfitSelector && !isGenerating && (
            <div className="text-center">
              <Button 
                size="lg" 
                className="text-lg px-8 mb-4"
                onClick={handleGenerate}
                disabled={selectedImages.length === 0 || isGenerating}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Outfit
              </Button>
              <p className="text-sm text-muted-foreground">
                {selectedImages.length === 0 
                  ? "Select images above to generate outfit combinations!"
                  : `Ready to generate outfits from ${selectedImages.length} selected images!`
                }
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/styling">
                  <Button variant="outline">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Styling Studio
                  </Button>
                </Link>
                <Link href="/wardrobe/upload">
                  <Button variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Items
                  </Button>
                </Link>
                <Link href="/wardrobe">
                  <Button variant="outline">
                    <Palette className="w-4 h-4 mr-2" />
                    View Wardrobe
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="text-center py-12">
              <div className="flex items-center justify-center space-x-3">
                <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                <div>
                  <p className="text-xl font-semibold">Generating your outfits...</p>
                  <p className="text-muted-foreground">Our AI is working its magic!</p>
                </div>
              </div>
            </div>
          )}

          {showOutfitSelector && !isGenerating && (
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
      </main>
    </div>
  );
}
