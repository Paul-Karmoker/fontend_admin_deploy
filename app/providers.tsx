"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/lib/redux/store"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthPersistence } from "@/components/auth-persistence"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthPersistence />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  )
}
