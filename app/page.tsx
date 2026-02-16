"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartLine } from "@/components/chart-line"
import { CandlestickChart } from "@/components/candlestick-chart"
import { FinancialIndicators } from "@/components/financial-indicators"
import { CalendarHeatmap } from "@/components/calendar-heatmap"
import { ArrowUpIcon, ArrowDownIcon, PlusIcon, CreditCardIcon, TrendingUpIcon, WalletIcon } from "lucide-react"

const balanceData = [
  { x: "Jan", y: 2500 },
  { x: "Feb", y: 2800 },
  { x: "Mar", y: 2650 },
  { x: "Apr", y: 3200 },
  { x: "May", y: 3100 },
  { x: "Jun", y: 3450 },
  { x: "Jul", y: 3600 },
]

const ohlcData = [
  { date: "2024-01-01", open: 2500, high: 2650, low: 2400, close: 2600, volume: 15 },
  { date: "2024-01-02", open: 2600, high: 2750, low: 2550, close: 2700, volume: 22 },
  { date: "2024-01-03", open: 2700, high: 2800, low: 2650, close: 2750, volume: 18 },
  { date: "2024-01-04", open: 2750, high: 2900, low: 2700, close: 2850, volume: 25 },
  { date: "2024-01-05", open: 2850, high: 2950, low: 2800, close: 2900, volume: 20 },
  { date: "2024-01-06", open: 2900, high: 3000, low: 2850, close: 2950, volume: 17 },
  { date: "2024-01-07", open: 2950, high: 3100, low: 2900, close: 3050, volume: 30 },
]

const calendarData = Array.from({ length: 365 }, (_, i) => {
  const date = new Date(2024, 0, 1)
  date.setDate(date.getDate() + i)
  return {
    date: date.toISOString().split("T")[0],
    value: Math.random() * 200 + 50,
  }
})

const financialMetrics = {
  balance: 3600,
  burnRate: 46.7, // €/jour
  runway: 77, // jours
  itt: 1.15, // Indice de Tension de Trésorerie
  volatility: 125, // €
  drawdown: -450, // €
}

const expenseData = [
  { x: "Jan", y: 1200 },
  { x: "Feb", y: 1350 },
  { x: "Mar", y: 1180 },
  { x: "Apr", y: 1420 },
  { x: "May", y: 1380 },
  { x: "Jun", y: 1250 },
  { x: "Jul", y: 1400 },
]

const recentTransactions = [
  { id: 1, description: "Supermarché Carrefour", amount: -85.5, date: "2024-01-15", category: "Alimentation" },
  { id: 2, description: "Salaire", amount: 2800.0, date: "2024-01-14", category: "Revenus" },
  { id: 3, description: "Essence Total", amount: -65.2, date: "2024-01-13", category: "Transport" },
  { id: 4, description: "Netflix", amount: -15.99, date: "2024-01-12", category: "Divertissement" },
  { id: 5, description: "Pharmacie", amount: -28.4, date: "2024-01-11", category: "Santé" },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Tableau de Bord Financier</h1>
            <p className="text-muted-foreground">Analyse avancée de vos finances personnelles</p>
          </div>
          <div className="flex gap-3">
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Nouvelle Transaction
            </Button>
            <Button variant="outline">
              <CreditCardIcon className="w-4 h-4 mr-2" />
              Importer
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Indicateurs Financiers Avancés</h2>
          <FinancialIndicators {...financialMetrics} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Analyse OHLC</CardTitle>
              <CardDescription>Bougies japonaises de votre solde quotidien</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <CandlestickChart data={ohlcData} showVolume={true} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Évolution du Solde</CardTitle>
              <CardDescription>Tendance de votre solde sur 7 mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartLine data={balanceData} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calendrier des Dépenses</CardTitle>
            <CardDescription>Visualisation thermique de vos dépenses quotidiennes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <CalendarHeatmap data={calendarData} year={2024} />
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Solde Total</CardTitle>
              <WalletIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€3,600</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-green-600">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +4.2%
                </span>{" "}
                depuis le mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus ce Mois</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€2,800</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-green-600">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +2.1%
                </span>{" "}
                depuis le mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dépenses ce Mois</CardTitle>
              <ArrowDownIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€1,400</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-red-600">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +8.3%
                </span>{" "}
                depuis le mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Épargne</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€1,200</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-green-600">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +12.5%
                </span>{" "}
                objectif mensuel
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Évolution du Solde</CardTitle>
              <CardDescription>Votre solde au cours des 7 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartLine data={balanceData} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dépenses Mensuelles</CardTitle>
              <CardDescription>Évolution de vos dépenses mensuelles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartLine data={expenseData} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions Récentes</CardTitle>
            <CardDescription>Vos dernières opérations financières</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${transaction.amount > 0 ? "bg-green-500" : "bg-red-500"}`} />
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{transaction.category}</Badge>
                    <span className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount > 0 ? "+" : ""}€{Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">Voir Toutes les Transactions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
