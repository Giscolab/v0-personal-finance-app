"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangleIcon, TrendingUpIcon, TrendingDownIcon, DollarSignIcon } from "lucide-react"

interface FinancialIndicatorsProps {
  balance: number
  burnRate: number
  runway: number
  itt: number
  volatility: number
  drawdown: number
}

export function FinancialIndicators({
  balance,
  burnRate,
  runway,
  itt,
  volatility,
  drawdown,
}: FinancialIndicatorsProps) {
  const getITTStatus = (itt: number) => {
    if (itt >= 1.5) return { status: "critique", color: "destructive", icon: AlertTriangleIcon }
    if (itt >= 1.2) return { status: "alerte", color: "warning", icon: TrendingUpIcon }
    return { status: "normal", color: "success", icon: TrendingUpIcon }
  }

  const ittStatus = getITTStatus(itt)
  const ITTIcon = ittStatus.icon

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* ITT - Indice de Tension de Trésorerie */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ITT</CardTitle>
          <ITTIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{itt.toFixed(2)}</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={ittStatus.color as any}>{ittStatus.status}</Badge>
            <p className="text-xs text-muted-foreground">Indice de Tension de Trésorerie</p>
          </div>
          <Progress value={Math.min((itt / 2) * 100, 100)} className="mt-3" />
        </CardContent>
      </Card>

      {/* Burn Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Burn Rate</CardTitle>
          <TrendingDownIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{burnRate.toFixed(0)}</div>
          <p className="text-xs text-muted-foreground">Dépenses moyennes par jour (30j)</p>
          <div className="mt-3 text-sm">
            <span className="text-muted-foreground">Mensuel: </span>
            <span className="font-medium">€{(burnRate * 30).toFixed(0)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Runway */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Runway</CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.floor(runway)} jours</div>
          <p className="text-xs text-muted-foreground">Autonomie financière restante</p>
          <div className="mt-3 text-sm">
            <span className="text-muted-foreground">Soit: </span>
            <span className="font-medium">{(runway / 30).toFixed(1)} mois</span>
          </div>
        </CardContent>
      </Card>

      {/* Volatilité */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Volatilité</CardTitle>
          <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{volatility.toFixed(0)}</div>
          <p className="text-xs text-muted-foreground">Écart-type des flux (14j)</p>
          <Progress value={Math.min((volatility / 500) * 100, 100)} className="mt-3" />
        </CardContent>
      </Card>

      {/* Max Drawdown */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
          <TrendingDownIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">-€{Math.abs(drawdown).toFixed(0)}</div>
          <p className="text-xs text-muted-foreground">Perte maximale (90j)</p>
          <div className="mt-3 text-sm">
            <span className="text-muted-foreground">Pourcentage: </span>
            <span className="font-medium text-red-600">{((drawdown / balance) * 100).toFixed(1)}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Solde Actuel */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Solde Actuel</CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{balance.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Position de trésorerie</p>
          <div className="mt-3">
            <Badge variant={balance > 0 ? "default" : "destructive"}>{balance > 0 ? "Positif" : "Négatif"}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
