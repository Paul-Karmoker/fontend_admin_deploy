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
  Zap,
  ZapOff,
  CircleDollarSign,
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
        className: "bg-green-500 text-white",
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

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "trial":
        return <Badge variant="outline" className="border-blue-300 text-blue-600"><Clock className="mr-1 h-3 w-3" /> Trial</Badge>
      case "monthly":
        return <Badge className="bg-blue-100 text-blue-800"><Calendar className="mr-1 h-3 w-3" /> Monthly</Badge>
      case "quarterly":
        return <Badge className="bg-purple-100 text-purple-800"><CircleDollarSign className="mr-1 h-3 w-3" /> Quarterly</Badge>
      case "semiannual":
        return <Badge className="bg-indigo-100 text-indigo-800"><Zap className="mr-1 h-3 w-3" /> Semi-Annual</Badge>
      case "yearly":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" /> Yearly</Badge>
      default:
        return <Badge variant="outline"><ZapOff className="mr-1 h-3 w-3" /> Unknown</Badge>
    }
  }

  // Count subscription types
  const countSubscriptions = (payments: any[]) => {
    const counts = {
      trial: 0,
      monthly: 0,
      quarterly: 0,
      semiannual: 0,
      yearly: 0,
      total: 0
    }
    
    if (!payments) return counts
    
    type PlanType = "trial" | "monthly" | "quarterly" | "semiannual" | "yearly";
    payments.forEach(payment => {
      const plan = (payment.subscriptionPlan?.toLowerCase() as PlanType) || 'trial';
      if (Object.prototype.hasOwnProperty.call(counts, plan)) {
        counts[plan]++;
      }
      counts.total++;
    })
    
    return counts
  }

  const pendingCounts = countSubscriptions(pendingData?.withdrawals || [])
  const approvedCounts = countSubscriptions(approvedData?.withdrawals || [])

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
      <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCounts.total}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className="text-xs py-0.5">{pendingCounts.trial} trial</Badge>
              <Badge variant="outline" className="text-xs py-0.5">{pendingCounts.monthly} monthly</Badge>
              <Badge variant="outline" className="text-xs py-0.5">{pendingCounts.quarterly} quarterly</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCounts.total}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className="text-xs py-0.5">{approvedCounts.semiannual} semi</Badge>
              <Badge variant="outline" className="text-xs py-0.5">{approvedCounts.yearly} yearly</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trial Users</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCounts.trial + approvedCounts.trial}</div>
            <p className="text-xs text-muted-foreground">Free trial period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Plans</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCounts.monthly + approvedCounts.monthly}</div>
            <p className="text-xs text-muted-foreground">30-day subscriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quarterly Plans</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCounts.quarterly + approvedCounts.quarterly}</div>
            <p className="text-xs text-muted-foreground">90-day subscriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yearly Plans</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCounts.yearly}</div>
            <p className="text-xs text-muted-foreground">Annual subscriptions</p>
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
                  <Badge variant="secondary" className="ml-1">
                    {pendingCounts.total}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Approved
                  <Badge variant="secondary" className="ml-1">
                    {approvedCounts.total}
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
                getPlanBadge={getPlanBadge}
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
                getPlanBadge={getPlanBadge}
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
  getPlanBadge,
}: {
  payments: any[]
  isLoading: boolean
  isPending: boolean
  onApprove: (id: string) => void
  isApproving: boolean
  formatDate: (date: string) => string
  getPlanBadge: (plan: string) => JSX.Element
}) {
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Transaction</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
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
            <TableHead>Plan</TableHead>
            <TableHead>Transaction</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Trial Expires</TableHead>
            <TableHead>Created</TableHead>
            {isPending && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isPending ? 8 : 7} className="h-24 text-center">
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
                  {getPlanBadge(payment.subscriptionPlan?.toLowerCase() || 'trial')}
                </TableCell>
                <TableCell>
                  <div className="font-mono text-[18px] w-[100px]">
                    {payment.transactionId ? payment.transactionId.slice(0, 8) : 'N/A'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-[18px">
                    ${payment.amount ? payment.amount.toFixed(2) : "0.00"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm capitalize">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    {payment.paymentProvider || 'N/A'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(payment.subscriptionExpiresAt)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(payment.createdAt)}
                  </div>
                </TableCell>
                {isPending && (
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => onApprove(payment._id)}
                      disabled={isApproving}
                      className="bg-green-600 hover:bg-green-700 text-white"
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