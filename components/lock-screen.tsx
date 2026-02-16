"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, EyeOff } from "lucide-react"

interface LockScreenProps {
  onUnlock: () => void
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate password verification (in real app, this would be encrypted)
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (password === "demo123") {
      onUnlock()
    } else {
      setError("Mot de passe incorrect")
      setPassword("")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-balance">Coffre Personnel</h1>
            <p className="text-muted-foreground mt-2">Saisissez votre mot de passe pour accéder à vos finances</p>
          </div>
        </div>

        <Card className="border-2">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Déverrouillage</CardTitle>
            <CardDescription>Vos données financières sont protégées</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>

              {error && <p className="text-sm text-destructive text-center">{error}</p>}

              <Button type="submit" className="w-full" disabled={!password || isLoading}>
                {isLoading ? "Vérification..." : "Déverrouiller"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                Mot de passe de démonstration : <code className="bg-muted px-1 rounded">demo123</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
