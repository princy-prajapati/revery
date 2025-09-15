"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Sparkles, 
  Camera, 
  Shirt, 
  Palette, 
  Heart, 
  Share2, 
  Download,
  RefreshCw,
  Check,
  X,
  Plus,
  Search,
  Filter,
  Zap
} from "lucide-react"

interface WardrobeItem {
  id: string
  name: string
  category: string
  color: string
  season: string
  image: string
  isSelected: boolean
  confidence: number
}

interface OutfitSuggestion {
  id: string
  name: string
  items: WardrobeItem[]
  occasion: string
  confidence: number
  image: string
  description: string
  tags: string[]
}

interface OutfitSelectorProps {
  selectedImages: string[]
  onOutfitSelect: (outfit: OutfitSuggestion) => void
}

// Mock wardrobe data
const mockWardrobeItems: WardrobeItem[] = [
  {
    id: "1",
    name: "Black Velvet Blazer",
    category: "Blazers",
    color: "Black",
    season: "Fall/Winter",
    image: "/black-velvet-blazer.jpg",
    isSelected: false,
    confidence: 0.95
  },
  {
    id: "2",
    name: "White Cotton Shirt",
    category: "Shirts",
    color: "White",
    season: "All Season",
    image: "/white-cotton-shirt.jpg",
    isSelected: false,
    confidence: 0.88
  },
  {
    id: "3",
    name: "Dark Wash Jeans",
    category: "Bottoms",
    color: "Blue",
    season: "All Season",
    image: "/dark-wash-jeans.jpg",
    isSelected: false,
    confidence: 0.92
  },
  {
    id: "4",
    name: "Floral Summer Dress",
    category: "Dresses",
    color: "Multi",
    season: "Spring/Summer",
    image: "/floral-summer-dress.png",
    isSelected: false,
    confidence: 0.85
  },
  {
    id: "5",
    name: "Vintage Denim Jacket",
    category: "Outerwear",
    color: "Blue",
    season: "Spring/Fall",
    image: "/vintage-denim-jacket.png",
    isSelected: false,
    confidence: 0.90
  },
  {
    id: "6",
    name: "Gray Cashmere Scarf",
    category: "Accessories",
    color: "Gray",
    season: "Fall/Winter",
    image: "/gray-cashmere-scarf.jpg",
    isSelected: false,
    confidence: 0.87
  }
]

const mockOutfitSuggestions: OutfitSuggestion[] = [
  {
    id: "1",
    name: "Professional Elegance",
    items: [
      { ...mockWardrobeItems[0], isSelected: true },
      { ...mockWardrobeItems[1], isSelected: true },
      { ...mockWardrobeItems[2], isSelected: true }
    ],
    occasion: "Work/Professional",
    confidence: 0.94,
    image: "/outfit-professional.jpg",
    description: "A sophisticated look perfect for business meetings and professional events",
    tags: ["Professional", "Elegant", "Classic"]
  },
  {
    id: "2",
    name: "Casual Chic",
    items: [
      { ...mockWardrobeItems[4], isSelected: true },
      { ...mockWardrobeItems[3], isSelected: true }
    ],
    occasion: "Casual Day Out",
    confidence: 0.89,
    image: "/outfit-casual.jpg",
    description: "A relaxed yet stylish look for weekend outings and casual gatherings",
    tags: ["Casual", "Chic", "Relaxed"]
  },
  {
    id: "3",
    name: "Layered Sophistication",
    items: [
      { ...mockWardrobeItems[0], isSelected: true },
      { ...mockWardrobeItems[1], isSelected: true },
      { ...mockWardrobeItems[5], isSelected: true }
    ],
    occasion: "Date Night",
    confidence: 0.91,
    image: "/outfit-layered-sophistication.jpg",
    description: "A refined look with elegant layering for special occasions",
    tags: ["Sophisticated", "Layered", "Elegant"]
  }
]

export function OutfitSelector({ selectedImages, onOutfitSelect }: OutfitSelectorProps) {
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>(mockWardrobeItems)
  const [outfitSuggestions, setOutfitSuggestions] = useState<OutfitSuggestion[]>(mockOutfitSuggestions)
  const [activeTab, setActiveTab] = useState("suggestions")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedOccasion, setSelectedOccasion] = useState("all")

  // Analyze selected images and update wardrobe confidence scores
  useEffect(() => {
    if (selectedImages.length > 0) {
      setIsAnalyzing(true)
      // Simulate AI analysis
      setTimeout(() => {
        setWardrobeItems(prev => prev.map(item => ({
          ...item,
          confidence: Math.random() * 0.3 + 0.7 // Random confidence between 0.7-1.0
        })))
        setIsAnalyzing(false)
      }, 2000)
    }
  }, [selectedImages])

  const toggleItemSelection = (itemId: string) => {
    setWardrobeItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
    ))
  }

  const createCustomOutfit = () => {
    const selectedItems = wardrobeItems.filter(item => item.isSelected)
    if (selectedItems.length === 0) {
      alert("Please select at least one item to create an outfit!")
      return
    }
    
    const customOutfit: OutfitSuggestion = {
      id: `custom-${Date.now()}`,
      name: "Custom Outfit",
      items: selectedItems,
      occasion: "Custom",
      confidence: 0.85,
      image: "/outfit-custom.jpg",
      description: "Your custom outfit combination",
      tags: ["Custom", "Personal"]
    }
    
    onOutfitSelect(customOutfit)
  }

  const filteredWardrobeItems = wardrobeItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const filteredOutfitSuggestions = outfitSuggestions.filter(outfit => {
    const matchesOccasion = selectedOccasion === "all" || outfit.occasion === selectedOccasion
    return matchesOccasion
  })

  return (
    <div className="space-y-6">
      {/* Analysis Status */}
      {isAnalyzing && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-5 w-5 text-primary animate-spin" />
              <div>
                <p className="font-medium">Analyzing your images...</p>
                <p className="text-sm text-muted-foreground">
                  AI is identifying clothing items and matching them with your wardrobe
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="wardrobe">Wardrobe Items</TabsTrigger>
          <TabsTrigger value="custom">Custom Outfit</TabsTrigger>
        </TabsList>

        {/* AI Suggestions Tab */}
        <TabsContent value="suggestions" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">AI-Generated Outfit Suggestions</h3>
            <div className="flex items-center space-x-2">
              <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by occasion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Occasions</SelectItem>
                  <SelectItem value="Work/Professional">Work</SelectItem>
                  <SelectItem value="Casual Day Out">Casual</SelectItem>
                  <SelectItem value="Date Night">Date Night</SelectItem>
                  <SelectItem value="Party/Event">Party</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOutfitSuggestions.map((outfit) => (
              <Card key={outfit.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[4/5] bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={outfit.image || "/placeholder.svg"}
                      alt={outfit.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{outfit.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{outfit.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {Math.round(outfit.confidence * 100)}% Match
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Items in this outfit:</p>
                      <div className="flex flex-wrap gap-1">
                        {outfit.items.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {item.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {outfit.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1"
                        onClick={() => onOutfitSelect(outfit)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Select Outfit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Wardrobe Items Tab */}
        <TabsContent value="wardrobe" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Wardrobe Items</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-48"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Tops">Tops</SelectItem>
                  <SelectItem value="Bottoms">Bottoms</SelectItem>
                  <SelectItem value="Dresses">Dresses</SelectItem>
                  <SelectItem value="Outerwear">Outerwear</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredWardrobeItems.map((item) => (
              <Card 
                key={item.id} 
                className={`cursor-pointer transition-all ${
                  item.isSelected 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => toggleItemSelection(item.id)}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <Badge 
                        variant={item.confidence > 0.8 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {Math.round(item.confidence * 100)}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.color}</span>
                      <span>{item.season}</span>
                    </div>
                    {item.isSelected && (
                      <div className="flex items-center justify-center text-primary">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Custom Outfit Tab */}
        <TabsContent value="custom" className="space-y-6">
          <div className="text-center py-8">
            <Shirt className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Create Custom Outfit</h3>
            <p className="text-muted-foreground mb-6">
              Select items from your wardrobe to create a personalized outfit combination
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              <Button 
                onClick={createCustomOutfit}
                disabled={wardrobeItems.filter(item => item.isSelected).length === 0}
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Custom Outfit
              </Button>
              <Button 
                variant="outline"
                onClick={() => setWardrobeItems(prev => prev.map(item => ({ ...item, isSelected: false })))}
              >
                Clear Selection
              </Button>
            </div>
            
            {wardrobeItems.filter(item => item.isSelected).length > 0 && (
              <p className="text-sm text-muted-foreground mt-4">
                {wardrobeItems.filter(item => item.isSelected).length} item(s) selected
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
