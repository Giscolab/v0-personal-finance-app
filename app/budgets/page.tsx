"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusIcon, EditIcon, AlertTriangleIcon, CheckCircleIcon } from "lucide-react"

// Mock budget data
const mockBudgets = [
  { id: 1, category: "Alimentation", budgetAmount: 400, spentAmount: 285.5, color: "bg-blue-500" },
  { id: 2, category: "Transport", budgetAmount: 200, spentAmount: 165.2, color: "bg-green-500" },
  { id: 3, category: "Divertissement", budgetAmount: 150, spentAmount: 180.99, color: "bg-purple-500" },
  { id: 4, category: "Santé", budgetAmount: 100, spentAmount: 28.4, color: "bg-red-500" },
  { id: 5, category: "Restaurants", budgetAmount: 200, spentAmount: 145.8, color: "bg-orange-500" },
  { id: 6, category: "Logement", budgetAmount: 800, spentAmount: 800.0, color: "bg-indigo-500" },
  { id: 7, category: "Assurance", budgetAmount: 150, spentAmount: 120.0, color: "bg-teal-500" },
]

const categories = [
  "Alimentation",
  "Transport",
  "Divertissement",
  "Santé",
  "Restaurants",
  "Logement",
  "Assurance",
  "Vêtements",
  "Éducation",
  "Autres",
]

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState(mockBudgets)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<any>(null)
  const [newBudget, setNewBudget] = useState({
    category: "",
    budgetAmount: "",
  })

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budgetAmount, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spentAmount, 0)
  const overBudgetCount = budgets.filter((budget) => budget.spentAmount > budget.budgetAmount).length

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.budgetAmount) {
      const budget = {
        id: Date.now(),
        category: newBudget.category,
        budgetAmount: Number.parseFloat(newBudget.budgetAmount),
        spentAmount: 0,
        color: "bg-gray-500",
      }
      setBudgets([...budgets, budget])
      setNewBudget({ category: "", budgetAmount: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditBudget = (budget: any) => {
    setEditingBudget(budget)
    setNewBudget({
      category: budget.category,
      budgetAmount: budget.budgetAmount.toString(),
    })
  }

  const handleUpdateBudget = () => {
    if (editingBudget && newBudget.budgetAmount) {
      setBudgets(
        budgets.map((budget) =>
          budget.id === editingBudget.id
            ? { ...budget, budgetAmount: Number.parseFloat(newBudget.budgetAmount) }
            : budget,
        ),
      )
      setEditingBudget(null)
      setNewBudget({ category: "", budgetAmount: "" })
    }
  }

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    if (percentage >= 100) return "bg-red-500"
    if (percentage >= 80) return "bg-orange-500"
    return "bg-green-500"
  }

  const getStatusIcon = (spent: number, budget: number) => {
    if (spent > budget) return <AlertTriangleIcon className="w-4 h-4 text-red-500" />
    if (spent >= budget * 0.8) return <AlertTriangleIcon className="w-4 h-4 text-orange-500" />
    return <CheckCircleIcon className="w-4 h-4 text-green-500" />
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Gestion des Budgets</h1>
            <p className="text-muted-foreground">Planifiez et suivez vos dépenses par catégorie</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Nouveau Budget
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Ajouter un Budget</DialogTitle>
                  <DialogDescription>Définissez un budget mensuel pour une catégorie</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select
                      value={newBudget.category}
                      onValueChange={(value) => setNewBudget({ ...newBudget, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter((cat) => !budgets.find((b) => b.category === cat))
                          .map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Montant Budget (€)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={newBudget.budgetAmount}
                      onChange={(e) => setNewBudget({ ...newBudget, budgetAmount: e.target.value })}
                      placeholder="Ex: 400.00"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddBudget}>Ajouter</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Budget Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{totalBudget.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{budgets.length} catégories</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Dépensé</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {((totalSpent / totalBudget) * 100).toFixed(1)}% du budget
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Restant</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${(totalBudget - totalSpent) >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                €{(totalBudget - totalSpent).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {((1 - totalSpent / totalBudget) * 100).toFixed(1)}% disponible
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Dépassements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${overBudgetCount > 0 ? "text-red-600" : "text-green-600"}`}>
                {overBudgetCount}
              </div>
              <p className="text-xs text-muted-foreground">
                {overBudgetCount === 0
                  ? "Aucun dépassement"
                  : `${overBudgetCount} catégorie${overBudgetCount > 1 ? "s" : ""}`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Vue d'ensemble</CardTitle>
            <CardDescription>Progression globale de vos budgets mensuels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total dépensé</span>
                <span>
                  €{totalSpent.toFixed(2)} / €{totalBudget.toFixed(2)}
                </span>
              </div>
              <Progress value={(totalSpent / totalBudget) * 100} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>{((totalSpent / totalBudget) * 100).toFixed(1)}%</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Categories */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => {
            const percentage = (budget.spentAmount / budget.budgetAmount) * 100
            const isOverBudget = budget.spentAmount > budget.budgetAmount

            return (
              <Card key={budget.id} className={`${isOverBudget ? "border-red-200 bg-red-50/50" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{budget.category}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(budget.spentAmount, budget.budgetAmount)}
                      <Button variant="ghost" size="sm" onClick={() => handleEditBudget(budget)}>
                        <EditIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Dépensé</span>
                      <span className={isOverBudget ? "text-red-600 font-semibold" : ""}>
                        €{budget.spentAmount.toFixed(2)}
                      </span>
                    </div>
                    <Progress value={Math.min(percentage, 100)} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>€0</span>
                      <span>€{budget.budgetAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Restant: </span>
                      <span
                        className={`font-semibold ${
                          (budget.budgetAmount - budget.spentAmount) >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        €{(budget.budgetAmount - budget.spentAmount).toFixed(2)}
                      </span>
                    </div>
                    <Badge variant={isOverBudget ? "destructive" : percentage >= 80 ? "secondary" : "default"}>
                      {percentage.toFixed(0)}%
                    </Badge>
                  </div>

                  {isOverBudget && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-100 p-2 rounded">
                      <AlertTriangleIcon className="w-4 h-4" />
                      <span>Dépassement de €{(budget.spentAmount - budget.budgetAmount).toFixed(2)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Edit Budget Dialog */}
        <Dialog open={!!editingBudget} onOpenChange={() => setEditingBudget(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Modifier le Budget</DialogTitle>
              <DialogDescription>Ajustez le montant du budget pour {editingBudget?.category}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-amount">Nouveau Montant (€)</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  step="0.01"
                  value={newBudget.budgetAmount}
                  onChange={(e) => setNewBudget({ ...newBudget, budgetAmount: e.target.value })}
                  placeholder="Ex: 400.00"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Actuellement dépensé: €{editingBudget?.spentAmount?.toFixed(2)}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setEditingBudget(null)}>
                Annuler
              </Button>
              <Button onClick={handleUpdateBudget}>Mettre à jour</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
