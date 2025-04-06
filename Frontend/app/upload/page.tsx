"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Zap,
  Upload,
  FileUp,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Building,
  ShipWheelIcon as Wheelchair,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function UploadPage() {
  // Environment file state
  const [envDragActive, setEnvDragActive] = useState(false)
  const [envFileUploaded, setEnvFileUploaded] = useState(false)
  const [envFileName, setEnvFileName] = useState("")
  const [envFileError, setEnvFileError] = useState("")
  const envInputRef = useRef<HTMLInputElement>(null)
  const [envFileObj, setEnvFileObj] = useState<File | null>(null)

  // Device file state
  const [deviceDragActive, setDeviceDragActive] = useState(false)
  const [deviceFileUploaded, setDeviceFileUploaded] = useState(false)
  const [deviceFileName, setDeviceFileName] = useState("")
  const [deviceFileError, setDeviceFileError] = useState("")
  const [deviceType, setDeviceType] = useState("")
  const deviceInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File) => {
    const validTypes = [".stl", ".cad", "model/stl", "application/octet-stream"]
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()

    if (validTypes.includes(file.type) || validTypes.includes(fileExtension)) {
      return true
    }
    return false
  }

  // Environment file handlers
  const handleEnvDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setEnvDragActive(true)
    } else if (e.type === "dragleave") {
      setEnvDragActive(false)
    }
  }

  const handleEnvDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setEnvDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      handleEnvFile(file)
    }
  }

  const handleEnvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      handleEnvFile(file)
    }
  }

  const handleEnvFile = (file: File) => {
    setEnvFileError("")

    if (validateFile(file)) {
      setEnvFileName(file.name)
      setEnvFileUploaded(true)
      setEnvFileObj(file)
      console.log("Environment file ready for upload:", file)
    } else {
      setEnvFileError("Please upload a valid .STL or .CAD file")
    }
  }

  const onEnvButtonClick = () => {
    if (envInputRef.current) {
      envInputRef.current.click()
    }
  }

  // Device file handlers
  const handleDeviceDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDeviceDragActive(true)
    } else if (e.type === "dragleave") {
      setDeviceDragActive(false)
    }
  }

  const handleDeviceDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDeviceDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      handleDeviceFile(file)
    }
  }

  const handleDeviceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      handleDeviceFile(file)
    }
  }

  const handleDeviceFile = (file: File) => {
    setDeviceFileError("")

    if (validateFile(file)) {
      setDeviceFileName(file.name)
      setDeviceFileUploaded(true)
      console.log("Device file ready for upload:", file)
    } else {
      setDeviceFileError("Please upload a valid .STL or .CAD file")
    }
  }

  const onDeviceButtonClick = () => {
    if (deviceInputRef.current) {
      deviceInputRef.current.click()
    }
  }

  const resetAll = () => {
    // Reset environment file
    setEnvFileUploaded(false)
    setEnvFileName("")
    setEnvFileError("")
    setEnvFileObj(null)

    // Reset device file
    setDeviceFileUploaded(false)
    setDeviceFileName("")
    setDeviceFileError("")
    setDeviceType("")
  }

  const canProceed = envFileUploaded && deviceFileUploaded && deviceType !== ""

  return (
    <div className="flex flex-col min-h-screen bg-fixed bg-gradient-radial from-slate-900 via-blue-900 to-slate-900">
      {/* Animated particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center h-14 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="text-lg font-bold">WheelScore</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <div className="container max-w-4xl mx-auto px-4 py-8 md:py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upload Your Files</h1>
            <p className="mt-4 text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Upload your environment as an STL file or a picture to get started with WheelScore's accessibility analysis.
            </p>
          </div>

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upload">Upload Files</TabsTrigger>
              <TabsTrigger value="results" disabled={!canProceed}>
                Results
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <div className="grid gap-8">
                {/* Environment Upload */}
                <Card className="w-full bg-card/30 backdrop-blur-sm border shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Environment Upload
                    </CardTitle>
                    <CardDescription>Upload a 3D model of your environment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!envFileUploaded ? (
                      <form
                        className="flex flex-col items-center"
                        onDragEnter={handleEnvDrag}
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <div
                          className={`w-full h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors ${
                            envDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/30"
                          }`}
                          onDragEnter={handleEnvDrag}
                          onDragLeave={handleEnvDrag}
                          onDragOver={handleEnvDrag}
                          onDrop={handleEnvDrop}
                        >
                          <input
                            ref={envInputRef}
                            type="file"
                            className="hidden"
                            accept=".stl,.obj,.cad,.jpg,.jpeg,.png"
                            onChange={handleEnvChange}
                          />

                          <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
                            <div className="rounded-full bg-primary/10 p-3">
                              <FileUp className="h-6 w-6 text-primary" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-sm font-semibold">Upload Environment (or Image)</h3>
                              <p className="text-xs text-muted-foreground">Drag & drop or click to browse</p>
                              <p className="text-xs text-muted-foreground">Supported: .STL, .OBJ, .CAD, .JPG, .JPEG, .PNG</p>
                            </div>
                          </div>
                        </div>

                        {envFileError && (
                          <div className="flex items-center mt-2 text-destructive gap-1 text-xs">
                            <AlertCircle className="h-3 w-3" />
                            <span>{envFileError}</span>
                          </div>
                        )}

                        <Button type="button" onClick={onEnvButtonClick} className="mt-4 w-full" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Browse Files
                        </Button>
                      </form>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <CheckCircle2 className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center space-y-1">
                          <h3 className="text-sm font-semibold">File Uploaded</h3>
                          <p className="text-xs text-muted-foreground break-all">{envFileName}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEnvFileUploaded(false)
                            setEnvFileName("")
                          }}
                          className="mt-2"
                        >
                          Change File
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end mt-8 gap-4">
                <Button variant="outline" onClick={resetAll}>
                  Reset
                </Button>
                <Button disabled={!canProceed}>Process Files</Button>
              </div>
            </TabsContent>
            <TabsContent value="results">
              <Card className="bg-card/30 backdrop-blur-sm border shadow-lg">
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>
                    Your files have been processed. View the accessibility analysis results below.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64 border rounded-lg">
                    <p className="text-muted-foreground">Results will appear here after processing</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => resetAll()}>
                    Upload New Files
                  </Button>
                  <Button>Download Report</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-card/30 backdrop-blur-sm border rounded-lg p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
              <p className="text-muted-foreground text-sm">Upload your environment and mobility device 3D models.</p>
            </div>
            <div className="bg-card/30 backdrop-blur-sm border rounded-lg p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Automated Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Our system will analyze accessibility and identify potential issues.
              </p>
            </div>
            <div className="bg-card/30 backdrop-blur-sm border rounded-lg p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Results</h3>
              <p className="text-muted-foreground text-sm">
                Receive detailed accessibility reports with improvement suggestions.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t py-6 md:py-0 relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 WheelScore. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
