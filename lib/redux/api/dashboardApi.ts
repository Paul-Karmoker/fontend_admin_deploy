import { apiSlice } from "./apiSlice"

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  referralCode: string;
  points: number;
  freeTrialExpiresAt: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
  subscriptionType?: string;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  address?: string;
  mobileNumber?: string;
  emailVerificationToken?: string;
  emailVerificationExpires?: string;
  emailOTP?: string;
  emailOTPExpires?: string;
  role: string;
  isDeleted: boolean;
  referralEnabled?: boolean;
  referredBy?: string | null;
  passwordResetExpires?: string; 
  passwordResetToken?: string; 
  amount?: number;
  paymentId?: string;
  paymentNumber?: string;
  paymentProvider?: string;
  subscriptionExpiresAt?: string;
  transactionId?: string;
}

 export interface DashboardData {
  totalUsers: number
  totalFreeTrial: number
  totalPremium: number
  totalActive: number
  users: User[]
}

export interface Withdrawal {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    points: number;
  };
  points: number;
  paymentProvider: string;
  paymentNumber: string;
  status: "pending" | "approved" | "rejected";
  requestDate: string;
  createdAt: string;
  updatedAt: string;
  admin?: string;
  processedDate?: string;
}

export interface WithdrawalResponse {
  withdrawals: Withdrawal[]
}

// New interfaces for payment approvals
export interface PaymentApproval {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  emailVerificationToken: string;
  emailVerificationExpires: string;
  referralCode: string;
  points: number;
  subscriptionPlan: string;
  subscriptionStatus: string;
  subscriptionType?: string;
  freeTrialExpiresAt: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  referralEnabled?: boolean;
  referredBy?: string;
  amount?: number;
  paymentId?: string;
  paymentNumber?: string;
  paymentProvider?: string;
  subscriptionExpiresAt?: string;
  transactionId?: string;
}

export interface PaymentApprovalResponse {
  withdrawals: PaymentApproval[]
}

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardData, void>({
      query: () => "/api/v1/admin/dashboard",
      providesTags: ["Dashboard", "Users"],
    }),

    getWithdrawals: builder.query<WithdrawalResponse, void>({
      query: () => "/api/v1/admin/withdrawalslist",
      providesTags: ["Withdrawals"],
    }),

    approveWithdrawal: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/v1/admin/withdrawals/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Withdrawals"],
    }),

    rejectWithdrawal: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/v1/admin/withdrawals/${id}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["Withdrawals"],
    }),

    // New payment approval endpoints
    getPendingPayments: builder.query<PaymentApprovalResponse, void>({
      query: () => "/api/v1/admin/pendingpay",
      providesTags: ["PendingPayments"],
    }),

    getAllApprovedPayments: builder.query<PaymentApprovalResponse, void>({
      query: () => "/api/v1/admin/allapprovedpay",
      providesTags: ["ApprovedPayments"],
    }),

    approveSubscriptionPayment: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/v1/admin/${id}/approve-subscription`,
        method: "PATCH",
      }),
      invalidatesTags: ["PendingPayments", "ApprovedPayments"],
    }),
  }),
})

export const {
  useGetDashboardDataQuery,
  useGetWithdrawalsQuery,
  useApproveWithdrawalMutation,
  useRejectWithdrawalMutation,
  useGetPendingPaymentsQuery,
  useGetAllApprovedPaymentsQuery,
  useApproveSubscriptionPaymentMutation,
} = dashboardApi
