import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../store"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4001",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Auth", "Dashboard", "Users", "Withdrawals", "PendingPayments", "ApprovedPayments"],
  endpoints: () => ({}),
})
