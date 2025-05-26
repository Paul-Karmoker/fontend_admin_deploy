"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, XCircle, Clock, Search, MoreHorizontal, Download, RefreshCw, AlertCircle } from "lucide-react"
import {
  useGetWithdrawalsQuery,
  useApproveWithdrawalMutation,
  useRejectWithdrawalMutation,
} from "@/lib/redux/api/dashboardApi"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function WithdrawalsPage() {
  const { data, isLoading, isError, refetch } = useGetWithdrawalsQuery()
  const [approveWithdrawal] = useApproveWithdrawalMutation()
  const [rejectWithdrawal] = useRejectWithdrawalMutation()
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleApprove = async (id: string) => {
    try {
      await approveWithdrawal(id).unwrap()
      toast({
        title: "Withdrawal Approved",
        description: "The withdrawal request has been approved successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve withdrawal. Please try again.",
      })
    }
  }

  const handleReject = async (id: string) => {
    try {
      await rejectWithdrawal(id).unwrap()
      toast({
        title: "Withdrawal Rejected",
        description: "The withdrawal request has been rejected.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject withdrawal. Please try again.",
      })
    }
  }

  // Filter withdrawals based on search term and status
  const filteredWithdrawals =
    data?.withdrawals.filter((withdrawal) => {
      const matchesSearch =
        withdrawal.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        withdrawal.amount.toString().includes(searchTerm) ||
        withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase())

      if (statusFilter === "all") return matchesSearch
      return matchesSearch && withdrawal.status === statusFilter
    }) || []

  const pendingCount = data?.withdrawals.filter((w) => w.status === "pending").length || 0
  const approvedCount = data?.withdrawals.filter((w) => w.status === "approved").length || 0
  const rejectedCount = data?.withdrawals.filter((w) => w.status === "rejected").length || 0

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load withdrawal data. Please try refreshing the page.
          <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Withdrawal Requests</h2>
          <p className="text-muted-foreground">Manage and process user withdrawal requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setStatusFilter}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <TabsList className="grid w-full sm:w-auto grid-cols-4 mb-4 sm:mb-0">
            <TabsTrigger value="all">
              All
              <Badge variant="outline" className="ml-2">
                {data?.withdrawals.length || 0}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              <Badge variant="outline" className="ml-2">
                {pendingCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
              <Badge variant="outline" className="ml-2">
                {approvedCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected
              <Badge variant="outline" className="ml-2">
                {rejectedCount}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search withdrawals..."
              className="w-full sm:w-[300px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <WithdrawalTable
            withdrawals={filteredWithdrawals}
            isLoading={isLoading}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </TabsContent>

        <TabsContent value="pending" className="m-0">
          <WithdrawalTable
            withdrawals={filteredWithdrawals}
            isLoading={isLoading}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </TabsContent>

        <TabsContent value="approved" className="m-0">
          <WithdrawalTable
            withdrawals={filteredWithdrawals}
            isLoading={isLoading}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </TabsContent>

        <TabsContent value="rejected" className="m-0">
          <WithdrawalTable
            withdrawals={filteredWithdrawals}
            isLoading={isLoading}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function WithdrawalTable({
  withdrawals,
  isLoading,
  onApprove,
  onReject,
}: {
  withdrawals: any[]
  isLoading: boolean
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-5 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-16 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
              ) : withdrawals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No withdrawal requests found.
                  </TableCell>
                </TableRow>
              ) : (
                withdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell className="font-medium">{withdrawal.id.substring(0, 8)}...</TableCell>
                    <TableCell>{withdrawal.user}</TableCell>
                    <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                    <TableCell>{new Date(withdrawal.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <StatusBadge status={withdrawal.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <WithdrawalActions withdrawal={withdrawal} onApprove={onApprove} onReject={onReject} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "approved") {
    return (
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800"
      >
        <CheckCircle className="mr-1 h-3 w-3" />
        Approved
      </Badge>
    )
  }

  if (status === "rejected") {
    return (
      <Badge
        variant="outline"
        className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
      >
        <XCircle className="mr-1 h-3 w-3" />
        Rejected
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800"
    >
      <Clock className="mr-1 h-3 w-3" />
      Pending
    </Badge>
  )
}

function WithdrawalActions({
  withdrawal,
  onApprove,
  onReject,
}: {
  withdrawal: any
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  // If already processed, show view details only
  if (withdrawal.status !== "pending") {
    return (
      <Button variant="ghost" size="sm">
        View Details
      </Button>
    )
  }

  // For pending withdrawals, show approve/reject options
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onApprove(withdrawal.id)}>
          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onReject(withdrawal.id)}>
          <XCircle className="mr-2 h-4 w-4 text-red-600" />
          Reject
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View Details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
