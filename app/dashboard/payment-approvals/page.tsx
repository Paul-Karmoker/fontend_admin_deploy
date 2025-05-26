"use client"

import { useState } from "react"
import {
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  User,
  CreditCard,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import type { JSX } from "react"
import {
  useGetPendingPaymentsQuery,
  useGetAllApprovedPaymentsQuery,
  useApproveSubscriptionPaymentMutation,
} from "@/lib/redux/api/dashboardApi"

export default function PaymentApprovalsPage() {
  const {
    data: pendingData,
    isLoading: pendingLoading,
    error: pendingError,
    refetch: refetchPending,
  } = useGetPendingPaymentsQuery()
  const {
    data: approvedData,
    isLoading: approvedLoading,
    error: approvedError,
    refetch: refetchApproved,
  } = useGetAllApprovedPaymentsQuery()
  const [approvePayment, { isLoading: isApproving }] = useApproveSubscriptionPaymentMutation()

  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("pending")
  const { toast } = useToast()

  const handleApprovePayment = async (id: string) => {
    try {
      await approvePayment(id).unwrap()
      toast({
        title: "Payment Approved",
        description: "The subscription payment has been approved successfully.",
      })
      refetchPending()
      refetchApproved()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve payment. Please try again.",
      })
    }
  }

  const filterPayments = (payments: any[]) => {
    if (!payments) return []
    return payments.filter((payment) => {
      const fullName = `${payment.firstName} ${payment.lastName}`.toLowerCase()
      const email = payment.email.toLowerCase()
      const searchLower = searchTerm.toLowerCase()

      return (
        fullName.includes(searchLower) ||
        email.includes(searchLower) ||
        payment.referralCode.toLowerCase().includes(searchLower)
      )
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getSubscriptionBadge = (plan: string, status: string) => {
    if (plan === "premium" || status === "premium") {
      return (
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CreditCard className="mr-1 h-3 w-3" />
          Premium
        </Badge>
      )
    }
    return (
      <Badge variant="outline">
        <Clock className="mr-1 h-3 w-3" />
        Free Trial
      </Badge>
    )
  }

  if (pendingError || approvedError) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load payment data. Please try refreshing the page.
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={refetchPending}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Pending
            </Button>
            <Button variant="outline" size="sm" onClick={refetchApproved}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Approved
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  const pendingPayments = filterPayments(pendingData?.withdrawals || [])
  const approvedPayments = filterPayments(approvedData?.withdrawals || [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Approvals</h1>
          <p className="text-muted-foreground">Manage subscription payment requests and approvals</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refetchPending()
              refetchApproved()
            }}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingData?.withdrawals?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Payments</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedData?.withdrawals?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Successfully processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {approvedData?.withdrawals?.filter(
                (p) => p.subscriptionType === "premium" || p.subscriptionPlan === "premium",
              ).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Active premium subscriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(pendingData?.withdrawals?.length || 0) + (approvedData?.withdrawals?.length || 0)}
            </div>
            <p className="text-xs text-muted-foreground">All payment requests</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Management</CardTitle>
          <CardDescription>Review and approve subscription payment requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <TabsList className="grid w-full sm:w-auto grid-cols-2">
                <TabsTrigger value="pending" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Pending
                  <Badge variant="outline" className="ml-1">
                    {pendingData?.withdrawals?.length || 0}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Approved
                  <Badge variant="outline" className="ml-1">
                    {approvedData?.withdrawals?.length || 0}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by name, email, or referral code..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            <TabsContent value="pending" className="m-0">
              <PaymentTable
                payments={pendingPayments}
                isLoading={pendingLoading}
                isPending={true}
                onApprove={handleApprovePayment}
                isApproving={isApproving}
                formatDate={formatDate}
                getSubscriptionBadge={getSubscriptionBadge}
              />
            </TabsContent>

            <TabsContent value="approved" className="m-0">
              <PaymentTable
                payments={approvedPayments}
                isLoading={approvedLoading}
                isPending={false}
                onApprove={handleApprovePayment}
                isApproving={isApproving}
                formatDate={formatDate}
                getSubscriptionBadge={getSubscriptionBadge}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function PaymentTable({
  payments,
  isLoading,
  isPending,
  onApprove,
  isApproving,
  formatDate,
  getSubscriptionBadge,
}: {
  payments: any[]
  isLoading: boolean
  isPending: boolean
  onApprove: (id: string) => void
  isApproving: boolean
  formatDate: (date: string) => string
  getSubscriptionBadge: (plan: string, status: string) => JSX.Element
}) {
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">User</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Trial Expires</TableHead>
              <TableHead>Created</TableHead>
              {isPending && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  {isPending && (
                    <TableCell>
                      <Skeleton className="h-8 w-20 ml-auto" />
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">User</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Trial Expires</TableHead>
            <TableHead>Created</TableHead>
            {isPending && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isPending ? 6 : 5} className="h-24 text-center">
                No {isPending ? "pending" : "approved"} payments found.
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={payment.firstName} />
                      <AvatarFallback>
                        {payment.firstName.substring(0, 1)}
                        {payment.lastName.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {payment.firstName} {payment.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">{payment.email}</div>
                      <div className="text-xs text-muted-foreground">Code: {payment.referralCode}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getSubscriptionBadge(
                    payment.subscriptionPlan,
                    payment.subscriptionType || payment.subscriptionStatus,
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={payment.subscriptionStatus === "active" ? "default" : "outline"}
                    className={
                      payment.subscriptionStatus === "active" ? "bg-green-100 text-green-800 border-green-200" : ""
                    }
                  >
                    {payment.subscriptionStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3 w-3" />
                    {formatDate(payment.freeTrialExpiresAt)}
                  </div>
                </TableCell>
                <TableCell>{formatDate(payment.createdAt)}</TableCell>
                {isPending && (
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => onApprove(payment._id)}
                      disabled={isApproving}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isApproving ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      Approve
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
