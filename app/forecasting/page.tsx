"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChartLine } from "@/components/chart-line"
import { TrendingUpIcon, CalculatorIcon, TargetIcon, AlertCircleIcon } from "lucide-react"

// Mock historical data for forecasting
const historicalData = {
  income: [
    { x: "Jan", y: 2800 },
    { x: "Feb", y: 2800 },
    { x: "Mar", y: 2850 },
    { x: "Apr", y: 2800 },
    { x: "May", y: 2900 },
    { x: "Jun", y: 2800 },
    { x: "Jul", y: 2850 },
  ],
  expenses: [
    { x: "Jan", y: 1200 },
    { x: "Feb", y: 1350 },
    { x: "Mar", y: 1180 },
    { x: "Apr", y: 1420 },
    { x: "May", y: 1380 },
    { x: "Jun", y: 1250 },
    { x: "Jul", y: 1400 },
  ],
  balance: [
    { x: "Jan", y: 2500 },
    { x: "Feb", y: 2950 },
    { x: "Mar", y: 3620 },
    { x: "Apr", y: 4000 },
    { x: "May", y: 4520 },
    { x: "Jun", y: 5070 },
    { x: "Jul", y: 5520 },
  ],
}

// Simple forecasting algorithms
const generateLinearForecast = (data: any[], months: number, growthRate = 0) => {
  const lastValue = data[data.length - 1].y
  const forecast = []

  for (let i = 1; i <= months; i++) {
    const monthNames = [
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
      "Jan+1",
      "Fév+1",
      "Mar+1",
      "Avr+1",
      "Mai+1",
      "Juin+1",
      "Juil+1",
    ]
    forecast.push({
      x: monthNames[i - 1] || `M+${i}`,
      y: lastValue * (1 + (growthRate / 100) * i),
    })
  }

  return forecast
}

const generateSeasonalForecast = (data: any[], months: number) => {
  const avgValue = data.reduce((sum, item) => sum + item.y, 0) / data.length
  const seasonalFactors = [1.1, 0.9, 1.0, 1.2, 1.1, 0.95, 1.05, 1.15, 0.85, 1.0, 1.3, 0.8]
  const forecast = []

  for (let i = 1; i <= months; i++) {
    const monthNames = [
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
      "Jan+1",
      "Fév+1",
      "Mar+1",
      "Avr+1",
      "Mai+1",
      "Juin+1",
      "Juil+1",
    ]
    const seasonalIndex = (6 + i) % 12 // Starting from August (index 7)
    forecast.push({
      x: monthNames[i - 1] || `M+${i}`,
      y: avgValue * seasonalFactors[seasonalIndex],
    })
  }

  return forecast
}

export default function ForecastingPage() {
  const [forecastMonths, setForecastMonths] = useState(6)
  const [incomeGrowth, setIncomeGrowth] = useState(2)
  const [expenseGrowth, setExpenseGrowth] = useState(1.5)
  const [forecastModel, setForecastModel] = useState("linear")
  const [savingsGoal, setSavingsGoal] = useState(10000)

  // Generate forecasts based on selected model
  const generateForecasts = () => {
    if (forecastModel === "linear") {
      return {
        income: generateLinearForecast(historicalData.income, forecastMonths, incomeGrowth),
        expenses: generateLinearForecast(historicalData.expenses, forecastMonths, expenseGrowth),
      }
    } else {
      return {
        income: generateSeasonalForecast(historicalData.income, forecastMonths),
        expenses: generateSeasonalForecast(historicalData.expenses, forecastMonths),
      }
    }
  }

  const forecasts = generateForecasts()

  // Calculate projected balance
  const currentBalance = historicalData.balance[historicalData.balance.length - 1].y
  let projectedBalance = currentBalance
  const balanceForecast = forecasts.income.map((income, index) => {
    const expense = forecasts.expenses[index]
    projectedBalance += income.y - expense.y
    return {
      x: income.x,
      y: projectedBalance,
    }
  })

  // Calculate key metrics
  const totalProjectedIncome = forecasts.income.reduce((sum, item) => sum + item.y, 0)
  const totalProjectedExpenses = forecasts.expenses.reduce((sum, item) => sum + item.y, 0)
  const projectedSavings = totalProjectedIncome - totalProjectedExpenses
  const finalBalance = balanceForecast[balanceForecast.length - 1]?.y || currentBalance
  const monthsToGoal =
    savingsGoal > finalBalance ? Math.ceil((savingsGoal - currentBalance) / (projectedSavings / forecastMonths)) : 0

  // Combine historical and forecast data for charts
  const combinedIncome = [...historicalData.income, ...forecasts.income]
  const combinedExpenses = [...historicalData.expenses, ...forecasts.expenses]
  const combinedBalance = [...historicalData.balance, ...balanceForecast]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Prévisions Financières</h1>
            <p className="text-muted-foreground">Anticipez votre situation financière future</p>
          </div>
          <div className="flex gap-3">
            <Badge variant="outline" className="text-sm">
              Modèle: {forecastModel === "linear" ? "Linéaire" : "Saisonnier"}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {forecastMonths} mois
            </Badge>
          </div>
        </div>

        {/* Forecast Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Paramètres de Prévision</CardTitle>
            <CardDescription>Ajustez les paramètres pour personnaliser vos prévisions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="months">Période (mois)</Label>
                <Select
                  value={forecastMonths.toString()}
                  onValueChange={(value) => setForecastMonths(Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 mois</SelectItem>
                    <SelectItem value="6">6 mois</SelectItem>
                    <SelectItem value="12">12 mois</SelectItem>
                    <SelectItem value="24">24 mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Modèle</Label>
                <Select value={forecastModel} onValueChange={setForecastModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linéaire</SelectItem>
                    <SelectItem value="seasonal">Saisonnier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="income-growth">Croissance Revenus (%)</Label>
                <Input
                  id="income-growth"
                  type="number"
                  step="0.1"
                  value={incomeGrowth}
                  onChange={(e) => setIncomeGrowth(Number.parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-growth">Croissance Dépenses (%)</Label>
                <Input
                  id="expense-growth"
                  type="number"
                  step="0.1"
                  value={expenseGrowth}
                  onChange={(e) => setExpenseGrowth(Number.parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Projections */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Solde Projeté</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">€{finalBalance.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground">Dans {forecastMonths} mois</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Épargne Prévue</CardTitle>
              <CalculatorIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${projectedSavings >= 0 ? "text-green-600" : "text-red-600"}`}>
                €{projectedSavings.toFixed(0)}
              </div>
              <p className="text-xs text-muted-foreground">Sur {forecastMonths} mois</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Objectif d'Épargne</CardTitle>
              <TargetIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{savingsGoal.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-1">
                <Input
                  type="number"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(Number.parseInt(e.target.value) || 0)}
                  className="h-6 text-xs"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Temps pour Objectif</CardTitle>
              <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${monthsToGoal > 0 ? "text-orange-600" : "text-green-600"}`}>
                {monthsToGoal > 0 ? `${monthsToGoal} mois` : "Atteint"}
              </div>
              <p className="text-xs text-muted-foreground">{monthsToGoal > 0 ? "Estimation" : "Objectif réalisable"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="balance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="balance">Évolution du Solde</TabsTrigger>
            <TabsTrigger value="income">Revenus</TabsTrigger>
            <TabsTrigger value="expenses">Dépenses</TabsTrigger>
          </TabsList>

          <TabsContent value="balance">
            <Card>
              <CardHeader>
                <CardTitle>Prévision du Solde</CardTitle>
                <CardDescription>
                  Évolution prévue de votre solde sur les {forecastMonths} prochains mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartLine data={combinedBalance} />
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Historique</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Prévision</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income">
            <Card>
              <CardHeader>
                <CardTitle>Prévision des Revenus</CardTitle>
                <CardDescription>
                  Évolution prévue de vos revenus avec un taux de croissance de {incomeGrowth}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartLine data={combinedIncome} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <CardTitle>Prévision des Dépenses</CardTitle>
                <CardDescription>
                  Évolution prévue de vos dépenses avec un taux de croissance de {expenseGrowth}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartLine data={combinedExpenses} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Scenarios */}
        <Card>
          <CardHeader>
            <CardTitle>Analyse de Scénarios</CardTitle>
            <CardDescription>Comparez différents scénarios financiers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-green-600 mb-2">Scénario Optimiste</h4>
                <p className="text-sm text-muted-foreground mb-3">Revenus +5%, Dépenses +0%</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Solde final:</span>
                    <span className="font-semibold">€{(finalBalance + totalProjectedIncome * 0.03).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Épargne:</span>
                    <span className="font-semibold text-green-600">
                      €{(projectedSavings + totalProjectedIncome * 0.03).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">Scénario Actuel</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Revenus +{incomeGrowth}%, Dépenses +{expenseGrowth}%
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Solde final:</span>
                    <span className="font-semibold">€{finalBalance.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Épargne:</span>
                    <span className={`font-semibold ${projectedSavings >= 0 ? "text-green-600" : "text-red-600"}`}>
                      €{projectedSavings.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-red-600 mb-2">Scénario Pessimiste</h4>
                <p className="text-sm text-muted-foreground mb-3">Revenus -2%, Dépenses +5%</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Solde final:</span>
                    <span className="font-semibold">€{(finalBalance - totalProjectedIncome * 0.07).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Épargne:</span>
                    <span className="font-semibold text-red-600">
                      €{(projectedSavings - totalProjectedIncome * 0.07).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
