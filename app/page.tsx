"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { checkAuthState } from "@/lib/redux/slices/authSlice"
import type { RootState } from "@/lib/redux/store"

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Check auth state on component mount
    dispatch(checkAuthState())

    // Redirect based on authentication status
    if (isAuthenticated) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [dispatch, isAuthenticated, router])

  return null // No need to render anything as we're redirecting
}
