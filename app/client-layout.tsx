"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { LockScreen } from "@/components/lock-screen"

interface ClientLayoutProps {
  children: React.ReactNode
}

function NavigationWrapper({ onLock }: { onLock: () => void }) {
  return (
    <Suspense fallback={<div className="w-64 bg-card border-r" />}>
      <SidebarNavigation onLock={onLock} />
    </Suspense>
  )
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isLocked, setIsLocked] = useState(true)
  const [lastActivity, setLastActivity] = useState(Date.now())

  // Auto-lock after 30 minutes of inactivity
  useEffect(() => {
    if (isLocked) return

    const handleActivity = () => setLastActivity(Date.now())
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]

    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true)
    })

    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 30 * 60 * 1000) {
        // 30 minutes
        setIsLocked(true)
      }
    }, 60000) // Check every minute

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true)
      })
      clearInterval(interval)
    }
  }, [isLocked, lastActivity])

  if (isLocked) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <LockScreen onUnlock={() => setIsLocked(false)} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen">
        <NavigationWrapper onLock={() => setIsLocked(true)} />
        <main className="flex-1 md:ml-64 transition-all duration-200">
          <Suspense fallback={<div className="p-6 md:p-8">Chargement...</div>}>
            <div className="p-6 md:p-8">{children}</div>
          </Suspense>
        </main>
      </div>
    </ThemeProvider>
  )
}
