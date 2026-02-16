"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, AlertCircle, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImportResult {
  fileName: string
  totalTransactions: number
  importedTransactions: number
  duplicatesIgnored: number
  errors: string[]
  status: "success" | "warning" | "error"
}

export default function ImportPage() {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [importResults, setImportResults] = useState<ImportResult[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)

  const supportedFormats = [
    { ext: "CSV", desc: "Fichiers séparés par virgules", icon: FileText },
    { ext: "OFX", desc: "Open Financial Exchange", icon: FileText },
    { ext: "QIF", desc: "Quicken Interchange Format", icon: FileText },
    { ext: "MT940", desc: "Format bancaire SWIFT", icon: FileText },
  ]

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    processFiles(files)
  }

  const processFiles = async (files: File[]) => {
    setIsProcessing(true)
    setUploadProgress(0)

    const results: ImportResult[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setUploadProgress((i / files.length) * 100)

      // Simulate file processing
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock import result
      const mockResult: ImportResult = {
        fileName: file.name,
        totalTransactions: Math.floor(Math.random() * 500) + 50,
        importedTransactions: Math.floor(Math.random() * 450) + 40,
        duplicatesIgnored: Math.floor(Math.random() * 20),
        errors: Math.random() > 0.7 ? ["Ligne 45: Format de date invalide"] : [],
        status: Math.random() > 0.8 ? "warning" : "success",
      }

      results.push(mockResult)
    }

    setUploadProgress(100)
    setImportResults((prev) => [...results, ...prev])
    setIsProcessing(false)
  }

  const clearResults = () => {
    setImportResults([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Importation de Données</h1>
        <p className="text-muted-foreground mt-2">
          Importez vos relevés bancaires et transactions depuis différents formats
        </p>
      </div>

      {/* Upload Area */}
      <Card className="border-2 border-dashed">
        <CardContent className="p-8">
          <div
            className={cn(
              "relative rounded-lg border-2 border-dashed transition-colors",
              "flex flex-col items-center justify-center py-12 px-6 text-center",
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Glissez vos fichiers ici</h3>
            <p className="text-muted-foreground mb-4">ou cliquez pour sélectionner des fichiers</p>

            <input
              type="file"
              multiple
              accept=".csv,.ofx,.qif,.mt940"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isProcessing}
            />

            <Button disabled={isProcessing}>Sélectionner des fichiers</Button>
          </div>
        </CardContent>
      </Card>

      {/* Supported Formats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Formats Supportés</CardTitle>
          <CardDescription>Types de fichiers que vous pouvez importer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportedFormats.map((format) => (
              <div key={format.ext} className="flex items-center space-x-3 p-3 rounded-lg border">
                <format.icon className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">.{format.ext}</div>
                  <div className="text-sm text-muted-foreground">{format.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Processing Progress */}
      {isProcessing && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Traitement en cours...</span>
                <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Import Results */}
      {importResults.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Résultats d'Importation</CardTitle>
              <CardDescription>{importResults.length} fichier(s) traité(s)</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={clearResults}>
              <Trash2 className="w-4 h-4 mr-2" />
              Effacer
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {importResults.map((result, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {result.status === "success" ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )}
                    <span className="font-medium">{result.fileName}</span>
                  </div>
                  <Badge variant={result.status === "success" ? "default" : "secondary"}>
                    {result.status === "success" ? "Succès" : "Avertissement"}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total:</span>
                    <span className="ml-2 font-medium">{result.totalTransactions}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Importées:</span>
                    <span className="ml-2 font-medium text-green-600">{result.importedTransactions}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Doublons:</span>
                    <span className="ml-2 font-medium text-yellow-600">{result.duplicatesIgnored}</span>
                  </div>
                </div>

                {result.errors.length > 0 && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-1">
                        {result.errors.map((error, i) => (
                          <div key={i} className="text-sm">
                            {error}
                          </div>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
