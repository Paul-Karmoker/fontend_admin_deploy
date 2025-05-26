import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  error: string | null
}

// Helper function to safely access localStorage (only on client side)
const getStoredToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken")
  }
  return null
}

// Initialize with token from localStorage if available
const initialState: AuthState = {
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(), // Set authenticated if token exists
  isAdmin: !!getStoredToken(), // Set admin if token exists
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.isAdmin = true
      state.token = action.payload.token
      state.error = null

      // Save token to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("adminToken", action.payload.token)
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.isAdmin = false
      state.token = null
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.isAdmin = false
      state.token = null

      // Remove token from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken")
      }
    },
    // Add a new action to check and restore auth state
    checkAuthState: (state) => {
      const token = getStoredToken()
      if (token) {
        state.token = token
        state.isAuthenticated = true
        state.isAdmin = true
      }
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, checkAuthState } = authSlice.actions

export default authSlice.reducer
