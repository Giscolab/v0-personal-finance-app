import type React from "react"
import { Suspense } from "react"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import ClientLayout from "./client-layout"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <Suspense
          fallback={<div className="min-h-screen bg-background flex items-center justify-center">Chargement...</div>}
        >
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
