import { WardrobeUpload } from "@/components/wardrobe-upload"
import { Button } from "@/components/ui/button"
import { Palette, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
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
              <Link href="/wardrobe">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Wardrobe
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Upload Items</h1>
            <p className="text-muted-foreground">
              Add new clothing items to your digital wardrobe for AI-powered styling suggestions
            </p>
          </div>

          <WardrobeUpload />
        </div>
      </div>
    </div>
  )
}
