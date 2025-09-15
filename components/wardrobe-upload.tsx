"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Camera, X, Plus } from "lucide-react"

interface UploadedFile {
  id: string
  file: File
  preview: string
  name: string
  category: string
  color: string
  season: string
  notes: string
}

export function WardrobeUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFiles = (files: FileList) => {
    const maxFiles = 20
    const imageFiles = Array.from(files).filter(file => file.type.startsWith("image/"))
    
    if (imageFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images at once. Please select fewer images.`)
      return
    }
    
    if (uploadedFiles.length + imageFiles.length > maxFiles) {
      alert(`You can only have up to ${maxFiles} images total. Please remove some existing images first.`)
      return
    }
    
    imageFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: e.target?.result as string,
          name: file.name.split(".")[0],
          category: "",
          color: "",
          season: "",
          notes: "",
        }
        setUploadedFiles((prev) => [...prev, newFile])
      }
      reader.readAsDataURL(file)
    })
  }

  const updateFileData = (id: string, field: keyof UploadedFile, value: string) => {
    setUploadedFiles((prev) => prev.map((file) => (file.id === id ? { ...file, [field]: value } : file)))
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Items</CardTitle>
          <CardDescription>Upload photos of your clothing items to add them to your digital wardrobe</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drop multiple photos here</h3>
            <p className="text-muted-foreground mb-2">Select multiple images at once to upload your entire wardrobe</p>
            <p className="text-sm text-primary font-medium mb-4">✨ You can select up to 20 images at once!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button onClick={() => document.getElementById("file-upload")?.click()}>
                <Plus className="w-4 h-4 mr-2" />
                Choose Multiple Photos
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.getElementById("camera-upload")?.click()}
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Multiple Photos
              </Button>
            </div>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            <input
              id="camera-upload"
              type="file"
              multiple
              accept="image/*"
              capture="camera"
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            <p className="text-xs text-muted-foreground mt-3">
              💡 You can also drag and drop files here
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Review & Categorize</h3>
            <Badge variant="secondary" className="text-sm">
              {uploadedFiles.length} of 20 images
            </Badge>
          </div>
          {uploadedFiles.map((file) => (
            <Card key={file.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image Preview */}
                  <div className="relative w-full lg:w-48 h-48 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={file.preview || "/placeholder.svg"}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Form Fields */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`name-${file.id}`}>Item Name</Label>
                        <Input
                          id={`name-${file.id}`}
                          value={file.name}
                          onChange={(e) => updateFileData(file.id, "name", e.target.value)}
                          placeholder="e.g., Black Velvet Blazer"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`category-${file.id}`}>Category</Label>
                        <Select
                          value={file.category}
                          onValueChange={(value) => updateFileData(file.id, "category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tops">Tops</SelectItem>
                            <SelectItem value="Bottoms">Bottoms</SelectItem>
                            <SelectItem value="Dresses">Dresses</SelectItem>
                            <SelectItem value="Outerwear">Outerwear</SelectItem>
                            <SelectItem value="Shoes">Shoes</SelectItem>
                            <SelectItem value="Accessories">Accessories</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`color-${file.id}`}>Primary Color</Label>
                        <Select value={file.color} onValueChange={(value) => updateFileData(file.id, "color", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Black">Black</SelectItem>
                            <SelectItem value="White">White</SelectItem>
                            <SelectItem value="Gray">Gray</SelectItem>
                            <SelectItem value="Blue">Blue</SelectItem>
                            <SelectItem value="Red">Red</SelectItem>
                            <SelectItem value="Green">Green</SelectItem>
                            <SelectItem value="Yellow">Yellow</SelectItem>
                            <SelectItem value="Purple">Purple</SelectItem>
                            <SelectItem value="Brown">Brown</SelectItem>
                            <SelectItem value="Multi">Multi-color</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`season-${file.id}`}>Season</Label>
                        <Select value={file.season} onValueChange={(value) => updateFileData(file.id, "season", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select season" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Spring">Spring</SelectItem>
                            <SelectItem value="Summer">Summer</SelectItem>
                            <SelectItem value="Fall">Fall</SelectItem>
                            <SelectItem value="Winter">Winter</SelectItem>
                            <SelectItem value="All Season">All Season</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`notes-${file.id}`}>Notes (Optional)</Label>
                      <Textarea
                        id={`notes-${file.id}`}
                        value={file.notes}
                        onChange={(e) => updateFileData(file.id, "notes", e.target.value)}
                        placeholder="Any additional details about this item..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setUploadedFiles([])}>
              Clear All
            </Button>
            <Button>
              Add {uploadedFiles.length} Item{uploadedFiles.length !== 1 ? "s" : ""} to Wardrobe
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
