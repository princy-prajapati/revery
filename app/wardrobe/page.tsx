"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Search, Grid3X3, List, Plus, Ghost, Shirt, Palette } from "lucide-react"
import Link from "next/link"

interface ClothingItem {
  id: string
  name: string
  category: string
  color: string
  season: string
  lastWorn: string
  wearCount: number
  isGhost: boolean
  image: string
}

const mockWardrobeItems: ClothingItem[] = [
  {
    id: "1",
    name: "Black Velvet Blazer",
    category: "Blazers",
    color: "Black",
    season: "Fall/Winter",
    lastWorn: "6 months ago",
    wearCount: 2,
    isGhost: true,
    image: "/black-velvet-blazer.jpg",
  },
  {
    id: "2",
    name: "White Cotton Shirt",
    category: "Shirts",
    color: "White",
    season: "All Season",
    lastWorn: "1 week ago",
    wearCount: 15,
    isGhost: false,
    image: "/white-cotton-shirt.jpg",
  },
  {
    id: "3",
    name: "Vintage Denim Jacket",
    category: "Jackets",
    color: "Blue",
    season: "Spring/Fall",
    lastWorn: "4 months ago",
    wearCount: 3,
    isGhost: true,
    image: "/vintage-denim-jacket.png",
  },
  {
    id: "4",
    name: "Floral Summer Dress",
    category: "Dresses",
    color: "Multi",
    season: "Summer",
    lastWorn: "2 weeks ago",
    wearCount: 8,
    isGhost: false,
    image: "/floral-summer-dress.png",
  },
  {
    id: "5",
    name: "Cashmere Scarf",
    category: "Accessories",
    color: "Gray",
    season: "Fall/Winter",
    lastWorn: "8 months ago",
    wearCount: 1,
    isGhost: true,
    image: "/gray-cashmere-scarf.jpg",
  },
  {
    id: "6",
    name: "Dark Wash Jeans",
    category: "Pants",
    color: "Blue",
    season: "All Season",
    lastWorn: "3 days ago",
    wearCount: 22,
    isGhost: false,
    image: "/dark-wash-jeans.jpg",
  },
]

export default function WardrobePage() {
  const [items, setItems] = useState<ClothingItem[]>(mockWardrobeItems)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showGhostsOnly, setShowGhostsOnly] = useState(false)

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    const matchesGhostFilter = !showGhostsOnly || item.isGhost
    return matchesSearch && matchesCategory && matchesGhostFilter
  })

  const ghostItems = items.filter((item) => item.isGhost)
  const categories = Array.from(new Set(items.map((item) => item.category)))

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
              <Button variant="ghost">Dashboard</Button>
              <Button variant="ghost">Community</Button>
              <Button variant="ghost">Profile</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold mb-2">My Wardrobe</h1>
            <p className="text-muted-foreground">Manage your clothing collection and discover styling opportunities</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Items
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{items.length}</p>
                </div>
                <Shirt className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ghost Items</p>
                  <p className="text-2xl font-bold text-destructive">{ghostItems.length}</p>
                </div>
                <Ghost className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-muted-foreground">Most Worn</p>
                <p className="text-lg font-semibold">Dark Wash Jeans</p>
                <p className="text-sm text-muted-foreground">22 times</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ghost Items Alert */}
        {ghostItems.length > 0 && (
          <Card className="mb-8 border-destructive/20 bg-destructive/5">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Ghost className="h-5 w-5 text-destructive" />
                <CardTitle className="text-destructive">Wardrobe Ghosts Detected!</CardTitle>
              </div>
              <CardDescription>
                You have {ghostItems.length} items that haven't been worn in over 3 months. Let's bring them back to
                life with some styling challenges!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">Start Ghost Challenge</Button>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all-items" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-items">All Items</TabsTrigger>
            <TabsTrigger value="ghost-items">Ghost Items ({ghostItems.length})</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="all-items" className="space-y-6">
            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search your wardrobe..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Items Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`group hover:shadow-lg transition-shadow ${item.isGhost ? "border-destructive/20" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>
                          {item.isGhost && (
                            <Badge variant="destructive" className="text-xs">
                              <Ghost className="w-3 h-3 mr-1" />
                              Ghost
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{item.category}</span>
                          <span>{item.color}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Worn {item.wearCount}x</span>
                          <span className="text-muted-foreground">{item.lastWorn}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <Card key={item.id} className={item.isGhost ? "border-destructive/20" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold truncate">{item.name}</h3>
                            {item.isGhost && (
                              <Badge variant="destructive" className="text-xs">
                                <Ghost className="w-3 h-3 mr-1" />
                                Ghost
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{item.category}</span>
                            <span>{item.color}</span>
                            <span>Worn {item.wearCount}x</span>
                            <span>{item.lastWorn}</span>
                          </div>
                        </div>

                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ghost-items">
            <div className="text-center py-12">
              <Ghost className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-2">Your Wardrobe Ghosts</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                These items haven't been worn in a while. Let's create some styling challenges to bring them back!
              </p>
              <Button>Create Ghost Challenge</Button>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No favorite items yet. Mark items as favorites to see them here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
