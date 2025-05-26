"use client"

import { useState } from "react"
import { ArrowUpDown, Check, CreditCard, Download, Filter, MoreHorizontal, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock payment data
const payments = [
  {
    id: "p1",
    user: "John Smith",
    email: "john.smith@example.com",
    amount: 199.99,
    status: "completed",
    date: "2023-07-15",
    method: "Credit Card",
    type: "subscription",
  },
  {
    id: "p2",
    user: "Emma Johnson",
    email: "emma.j@example.com",
    amount: 199.99,
    status: "completed",
    date: "2023-07-10",
    method: "PayPal",
    type: "subscription",
  },
  {
    id: "p3",
    user: "Michael Brown",
    email: "michael.b@example.com",
    amount: 199.99,
    status: "completed",
    date: "2023-07-05",
    method: "Credit Card",
    type: "subscription",
  },
  {
    id: "p4",
    user: "Sophia Williams",
    email: "sophia.w@example.com",
    amount: 49.99,
    status: "pending",
    date: "2023-07-18",
    method: "Credit Card",
    type: "one-time",
  },
  {
    id: "p5",
    user: "James Davis",
    email: "james.d@example.com",
    amount: 99.99,
    status: "completed",
    date: "2023-07-01",
    method: "PayPal",
    type: "one-time",
  },
  {
    id: "p6",
    user: "Olivia Miller",
    email: "olivia.m@example.com",
    amount: 199.99,
    status: "failed",
    date: "2023-07-17",
    method: "Credit Card",
    type: "subscription",
  },
  {
    id: "p7",
    user: "William Wilson",
    email: "william.w@example.com",
    amount: 199.99,
    status: "refunded",
    date: "2023-06-28",
    method: "Credit Card",
    type: "subscription",
  },
]

// Mock withdrawal requests
const withdrawals = [
  {
    id: "w1",
    user: "Partner Company A",
    email: "finance@partnera.com",
    amount: 1250.0,
    status: "pending",
    date: "2023-07-18",
    method: "Bank Transfer",
  },
  {
    id: "w2",
    user: "Partner Company B",
    email: "accounts@partnerb.com",
    amount: 3450.75,
    status: "completed",
    date: "2023-07-15",
    method: "Bank Transfer",
  },
  {
    id: "w3",
    user: "Affiliate User 1",
    email: "affiliate1@example.com",
    amount: 780.25,
    status: "pending",
    date: "2023-07-17",
    method: "PayPal",
  },
  {
    id: "w4",
    user: "Affiliate User 2",
    email: "affiliate2@example.com",
    amount: 520.5,
    status: "rejected",
    date: "2023-07-16",
    method: "Bank Transfer",
  },
  {
    id: "w5",
    user: "Partner Company C",
    email: "finance@partnerc.com",
    amount: 2100.0,
    status: "completed",
    date: "2023-07-10",
    method: "Bank Transfer",
  },
]

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filter payments based on search term and filters
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesType = typeFilter === "all" || payment.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Filter withdrawals based on search term
  const filteredWithdrawals = withdrawals.filter((withdrawal) => {
    return (
      withdrawal.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450.80</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$350.75</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Withdrawals</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,030.25</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawal Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View and manage all payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search payments..."
                      className="w-full pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="h-9 w-[130px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="refunded">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="h-9 w-[130px]">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="subscription">Subscription</SelectItem>
                          <SelectItem value="one-time">One-time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="mr-2 h-4 w-4" />
                      More Filters
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">
                          <div className="flex items-center space-x-1">
                            <span>Customer</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>Amount</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>Status</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>Date</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>Method</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No payments found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">
                              <div>
                                <div className="font-medium">{payment.user}</div>
                                <div className="text-xs text-muted-foreground">{payment.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>${payment.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  payment.status === "completed"
                                    ? "default"
                                    : payment.status === "pending"
                                      ? "outline"
                                      : payment.status === "failed"
                                        ? "destructive"
                                        : "secondary"
                                }
                              >
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>View details</DropdownMenuItem>
                                  <DropdownMenuItem>Send receipt</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {payment.status === "completed" && <DropdownMenuItem>Issue refund</DropdownMenuItem>}
                                  {payment.status === "pending" && (
                                    <>
                                      <DropdownMenuItem>Approve</DropdownMenuItem>
                                      <DropdownMenuItem>Reject</DropdownMenuItem>
                                    </>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="withdrawals">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Requests</CardTitle>
              <CardDescription>Manage withdrawal requests from partners and affiliates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search withdrawals..."
                      className="w-full pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="h-9">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">
                          <div className="flex items-center space-x-1">
                            <span>Requester</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>Amount</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>Status</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>Date</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>Method</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWithdrawals.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No withdrawal requests found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredWithdrawals.map((withdrawal) => (
                          <TableRow key={withdrawal.id}>
                            <TableCell className="font-medium">
                              <div>
                                <div className="font-medium">{withdrawal.user}</div>
                                <div className="text-xs text-muted-foreground">{withdrawal.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  withdrawal.status === "completed"
                                    ? "default"
                                    : withdrawal.status === "pending"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>{withdrawal.date}</TableCell>
                            <TableCell>{withdrawal.method}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {withdrawal.status === "pending" && (
                                  <>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                      <Check className="h-4 w-4 text-green-500" />
                                      <span className="sr-only">Approve</span>
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                      <X className="h-4 w-4 text-red-500" />
                                      <span className="sr-only">Reject</span>
                                    </Button>
                                  </>
                                )}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>View details</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {withdrawal.status === "pending" && (
                                      <>
                                        <DropdownMenuItem>Approve</DropdownMenuItem>
                                        <DropdownMenuItem>Reject</DropdownMenuItem>
                                      </>
                                    )}
                                    {withdrawal.status === "completed" && (
                                      <DropdownMenuItem>View receipt</DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
