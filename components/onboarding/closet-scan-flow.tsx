"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, ArrowLeft, ArrowRight, Check } from "lucide-react"

interface ClosetScanFlowProps {
  userData: any
  onComplete: (data: any) => void
  onBack: () => void
}

// Helper function to categorize clothing based on filename
const getClothingCategory = (filename: string) => {
  const lowerFilename = filename.toLowerCase()
  if (lowerFilename.includes('shirt') || lowerFilename.includes('top') || lowerFilename.includes('blouse')) return 'Tops'
  if (lowerFilename.includes('pants') || lowerFilename.includes('jeans') || lowerFilename.includes('trouser')) return 'Bottoms'
  if (lowerFilename.includes('dress') || lowerFilename.includes('gown')) return 'Dresses'
  if (lowerFilename.includes('jacket') || lowerFilename.includes('blazer') || lowerFilename.includes('coat')) return 'Outerwear'
  if (lowerFilename.includes('shoe') || lowerFilename.includes('boot') || lowerFilename.includes('heel')) return 'Footwear'
  if (lowerFilename.includes('bag') || lowerFilename.includes('purse')) return 'Accessories'
  // Traditional Wear Categories
  if (lowerFilename.includes('kurta') || lowerFilename.includes('kameez') || lowerFilename.includes('sherwani')) return 'Traditional Tops'
  if (lowerFilename.includes('saree') || lowerFilename.includes('lehenga')) return 'Traditional Dresses'
  if (lowerFilename.includes('dhoti') || lowerFilename.includes('lungi') || lowerFilename.includes('churidar')) return 'Traditional Bottoms'
  if (lowerFilename.includes('dupatta') || lowerFilename.includes('pagri') || lowerFilename.includes('turban')) return 'Traditional Accessories'
  if (lowerFilename.includes('kimono') || lowerFilename.includes('hanbok') || lowerFilename.includes('cheongsam')) return 'Cultural Wear'
  return 'Other'
}

export default function ClosetScanFlow({ userData, onComplete, onBack }: ClosetScanFlowProps) {
  const [uploadedItems, setUploadedItems] = useState<any[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)
    
    // Simulate upload and AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    const clothingTypes = [
      'T-shirt', 'Blouse', 'Tank Top', 'Long Sleeve Shirt', 'Polo Shirt',
      'Jeans', 'Trousers', 'Shorts', 'Skirt', 'Leggings', 'Joggers',
      'Dress', 'Maxi Dress', 'Mini Dress', 'Midi Dress', 'Wrap Dress',
      'Jacket', 'Blazer', 'Cardigan', 'Hoodie', 'Sweater', 'Coat',
      'Sneakers', 'Boots', 'Heels', 'Flats', 'Sandals', 'Loafers',
      'Accessories', 'Scarf', 'Belt', 'Hat', 'Bag',
      // Traditional Wear
      'Kurta', 'Sherwani', 'Saree', 'Lehenga', 'Salwar Kameez',
      'Dhoti', 'Lungi', 'Churidar', 'Dupatta', 'Pagri/Turban',
      'Kimono', 'Hanbok', 'Cheongsam', 'Ao Dai', 'Kilt',
      'Thobe', 'Abaya', 'Hijab', 'Dashiki', 'Boubou'
    ]
    
    const clothingColors = [
      'Black', 'White', 'Navy Blue', 'Gray', 'Brown', 'Beige',
      'Red', 'Pink', 'Orange', 'Yellow', 'Green', 'Teal',
      'Purple', 'Burgundy', 'Olive', 'Cream', 'Maroon', 'Royal Blue'
    ]
    
    const newItems = Array.from(files).slice(0, 5 - uploadedItems.length).map((file, index) => ({
      id: Date.now() + index,
      name: file.name.split('.')[0],
      image: URL.createObjectURL(file),
      type: clothingTypes[Math.floor(Math.random() * clothingTypes.length)],
      color: clothingColors[Math.floor(Math.random() * clothingColors.length)],
      processed: true,
      category: getClothingCategory(file.name.split('.')[0])
    }))

    setUploadedItems(prev => [...prev, ...newItems])
    setIsUploading(false)
  }

  const handleContinue = () => {
    onComplete({ uploadedItems })
  }

  const progress = (uploadedItems.length / 5) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">📸 Upload Your Clothes</CardTitle>
        <p className="text-center text-muted-foreground">
          Add your first 5 clothing items to get started. Take clear photos against a neutral background for best results.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{uploadedItems.length} of 5 items uploaded</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Upload Area */}
        {uploadedItems.length < 5 && (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Upload Clothing Items</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Take photos or select from your gallery. Use single items against a neutral background for best results.
            </p>
            
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="upload-input"
            />
            
            <input
              type="file"
              multiple
              accept="image/*"
              capture="camera"
              onChange={handleFileUpload}
              className="hidden"
              id="camera-input"
            />

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => document.getElementById('upload-input')?.click()}
                disabled={isUploading}
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                {isUploading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose from Gallery
                  </>
                )}
              </Button>
              
              <Button
                onClick={() => document.getElementById('camera-input')?.click()}
                disabled={isUploading}
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                {isUploading ? (
                  <>
                    <Camera className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-3">
              💡 Tip: You can select multiple photos at once from your gallery
            </p>
          </div>
        )}

        {/* Uploaded Items */}
        {uploadedItems.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Your Items</h3>
            <div className="grid grid-cols-2 gap-4">
              {uploadedItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-3 space-y-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-24 object-cover rounded"
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{item.type}</p>
                    <p className="text-xs text-muted-foreground">{item.color}</p>
                    <p className="text-xs text-blue-600 font-medium">{item.category}</p>
                    <div className="flex items-center space-x-1">
                      <Check className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">AI Processed</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={uploadedItems.length === 0}
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
