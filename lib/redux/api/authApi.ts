import { apiSlice } from "./apiSlice"
import { loginStart, loginSuccess, loginFailure } from "../slices/authSlice"

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/admin/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        dispatch(loginStart())
        try {
          const { data } = await queryFulfilled
          dispatch(loginSuccess({ token: data.token }))
        } catch (error: any) {
          dispatch(loginFailure(error.error?.data?.message || "Login failed"))
        }
      },
    }),
  }),
})

export const { useLoginMutation } = authApi
