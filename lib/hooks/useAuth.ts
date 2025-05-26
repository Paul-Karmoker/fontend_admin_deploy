"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { checkAuthState } from "@/lib/redux/slices/authSlice"

export function useAuth(requireAuth = true) {
  const { isAuthenticated, isAdmin, token } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    // Check auth state on component mount
    dispatch(checkAuthState())
  }, [dispatch])

  useEffect(() => {
    // If authentication is required but user is not authenticated, redirect to login
    if (requireAuth && !isAuthenticated) {
      router.push("/login")
    }

    // If user is authenticated but on login page, redirect to dashboard
    if (!requireAuth && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, requireAuth, router])

  return { isAuthenticated, isAdmin, token }
}
