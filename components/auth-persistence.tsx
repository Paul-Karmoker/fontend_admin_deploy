"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuthState } from "@/lib/redux/slices/authSlice"
import type { RootState } from "@/lib/redux/store"

export function AuthPersistence() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Check auth state on component mount
    dispatch(checkAuthState())
  }, [dispatch])

  return null // This component doesn't render anything
}
