import { AIStylingEngine } from "@/components/ai-styling-engine"
import { Button } from "@/components/ui/button"
import { Palette, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AIEnginePage() {
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
              <Link href="/styling">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Styling
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">AI Styling Engine</h1>
            <p className="text-muted-foreground">
              Configure your preferences to get personalized outfit suggestions powered by AI
            </p>
          </div>

          <AIStylingEngine />
        </div>
      </div>
    </div>
  )
}
