"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, ArrowUpDown, PiggyBank, TrendingUp, Upload, Settings, Lock, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarNavigationProps {
  onLock: () => void
}

const navigation = [
  {
    name: "Tableau de Bord",
    href: "/",
    icon: LayoutDashboard,
    description: "Vue d'ensemble",
  },
  {
    name: "Historique",
    href: "/transactions",
    icon: ArrowUpDown,
    description: "Toutes les transactions",
  },
  {
    name: "Budgets",
    href: "/budgets",
    icon: PiggyBank,
    description: "Enveloppes budgétaires",
  },
  {
    name: "Prévisions",
    href: "/forecasting",
    icon: TrendingUp,
    description: "Projections financières",
  },
  {
    name: "Importation",
    href: "/import",
    icon: Upload,
    description: "Importer des données",
  },
]

export function SidebarNavigation({ onLock }: SidebarNavigationProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out",
          "md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">MonCoffre</h2>
                <p className="text-xs text-muted-foreground">Gestion Personnelle</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                  {isActive && (
                    <Badge variant="secondary" className="text-xs">
                      Actuel
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
              <Settings className="w-4 h-4 mr-3" />
              Paramètres
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={onLock}
            >
              <Lock className="w-4 h-4 mr-3" />
              Verrouiller
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  )
}
