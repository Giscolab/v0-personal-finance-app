"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, SearchIcon, DownloadIcon, UploadIcon } from "lucide-react"

// Mock data for transactions
const mockTransactions = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Supermarché Carrefour",
    amount: -85.5,
    category: "Alimentation",
    account: "Compte Courant",
    type: "expense",
  },
  {
    id: 2,
    date: "2024-01-14",
    description: "Salaire Janvier",
    amount: 2800.0,
    category: "Revenus",
    account: "Compte Courant",
    type: "income",
  },
  {
    id: 3,
    date: "2024-01-13",
    description: "Essence Total",
    amount: -65.2,
    category: "Transport",
    account: "Compte Courant",
    type: "expense",
  },
  {
    id: 4,
    date: "2024-01-12",
    description: "Netflix Abonnement",
    amount: -15.99,
    category: "Divertissement",
    account: "Compte Courant",
    type: "expense",
  },
  {
    id: 5,
    date: "2024-01-11",
    description: "Pharmacie Centrale",
    amount: -28.4,
    category: "Santé",
    account: "Compte Courant",
    type: "expense",
  },
  {
    id: 6,
    date: "2024-01-10",
    description: "Virement Épargne",
    amount: -500.0,
    category: "Épargne",
    account: "Livret A",
    type: "transfer",
  },
  {
    id: 7,
    date: "2024-01-09",
    description: "Remboursement Assurance",
    amount: 120.0,
    category: "Assurance",
    account: "Compte Courant",
    type: "income",
  },
  {
    id: 8,
    date: "2024-01-08",
    description: "Restaurant Le Bistrot",
    amount: -45.8,
    category: "Restaurants",
    account: "Compte Courant",
    type: "expense",
  },
]

const categories = [
  "Alimentation",
  "Transport",
  "Divertissement",
  "Santé",
  "Revenus",
  "Épargne",
  "Assurance",
  "Restaurants",
  "Logement",
  "Autres",
]
const accounts = ["Compte Courant", "Livret A", "Compte Épargne", "Carte de Crédit"]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAccount, setSelectedAccount] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "",
    account: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory
    const matchesAccount = selectedAccount === "all" || transaction.account === selectedAccount
    return matchesSearch && matchesCategory && matchesAccount
  })

  const handleAddTransaction = () => {
    if (newTransaction.description && newTransaction.amount && newTransaction.category && newTransaction.account) {
      const transaction = {
        id: Date.now(),
        date: newTransaction.date,
        description: newTransaction.description,
        amount: Number.parseFloat(newTransaction.amount),
        category: newTransaction.category,
        account: newTransaction.account,
        type: Number.parseFloat(newTransaction.amount) > 0 ? "income" : "expense",
      }
      setTransactions([transaction, ...transactions])
      setNewTransaction({
        description: "",
        amount: "",
        category: "",
        account: "",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const totalIncome = filteredTransactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = filteredTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Gestion des Transactions</h1>
            <p className="text-muted-foreground">Suivez et gérez toutes vos opérations financières</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Nouvelle Transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Ajouter une Transaction</DialogTitle>
                  <DialogDescription>Enregistrez une nouvelle opération financière</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                      placeholder="Ex: Supermarché, Salaire..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Montant (€)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                      placeholder="Ex: -50.00 ou +2800.00"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select
                      value={newTransaction.category}
                      onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="account">Compte</Label>
                    <Select
                      value={newTransaction.account}
                      onValueChange={(value) => setNewTransaction({ ...newTransaction, account: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un compte" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem key={account} value={account}>
                            {account}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes (optionnel)</Label>
                    <Textarea
                      id="notes"
                      value={newTransaction.notes}
                      onChange={(e) => setNewTransaction({ ...newTransaction, notes: e.target.value })}
                      placeholder="Informations supplémentaires..."
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddTransaction}>Ajouter</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <UploadIcon className="w-4 h-4 mr-2" />
              Importer
            </Button>
            <Button variant="outline">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+€{totalIncome.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {filteredTransactions.filter((t) => t.amount > 0).length} transactions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Dépenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">-€{totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {filteredTransactions.filter((t) => t.amount < 0).length} transactions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Solde Net</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${(totalIncome - totalExpenses) >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                €{(totalIncome - totalExpenses).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">{filteredTransactions.length} transactions au total</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres et Recherche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Rechercher une transaction..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Tous les comptes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les comptes</SelectItem>
                  {accounts.map((account) => (
                    <SelectItem key={account} value={account}>
                      {account}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""} trouvée
              {filteredTransactions.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        transaction.amount > 0
                          ? "bg-green-500"
                          : transaction.type === "transfer"
                            ? "bg-blue-500"
                            : "bg-red-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date} • {transaction.account}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{transaction.category}</Badge>
                    <span
                      className={`font-semibold text-lg ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : transaction.type === "transfer"
                            ? "text-blue-600"
                            : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}€{transaction.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
              {filteredTransactions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Aucune transaction trouvée avec les filtres actuels.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
