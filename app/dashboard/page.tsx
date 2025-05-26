"use client"

import Link from "next/link"

import { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Download,
  UsersIcon,
  UserCheck,
  UserPlus,
  Calendar,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetDashboardDataQuery } from "@/lib/redux/api/dashboardApi"
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function DashboardPage() {
  const { data, isLoading, error } = useGetDashboardDataQuery()
  const [activeTab, setActiveTab] = useState("overview")

  // Generate user activity data from the API response
  const generateUserActivityData = () => {
    if (!data) return []

    // This is mock data since we don't have historical data from the API
    // In a real application, you would fetch this data from the API
    return [
      {
        name: "Jan",
        "Total Users": data.totalUsers * 0.4,
        "Active Users": data.totalActive * 0.4,
        "Premium Users": data.totalPremium * 0.4,
        "Free Trial": data.totalFreeTrial * 0.4,
      },
      {
        name: "Feb",
        "Total Users": data.totalUsers * 0.5,
        "Active Users": data.totalActive * 0.5,
        "Premium Users": data.totalPremium * 0.5,
        "Free Trial": data.totalFreeTrial * 0.5,
      },
      {
        name: "Mar",
        "Total Users": data.totalUsers * 0.6,
        "Active Users": data.totalActive * 0.6,
        "Premium Users": data.totalPremium * 0.6,
        "Free Trial": data.totalFreeTrial * 0.6,
      },
      {
        name: "Apr",
        "Total Users": data.totalUsers * 0.7,
        "Active Users": data.totalActive * 0.7,
        "Premium Users": data.totalPremium * 0.7,
        "Free Trial": data.totalFreeTrial * 0.7,
      },
      {
        name: "May",
        "Total Users": data.totalUsers * 0.8,
        "Active Users": data.totalActive * 0.8,
        "Premium Users": data.totalPremium * 0.8,
        "Free Trial": data.totalFreeTrial * 0.8,
      },
      {
        name: "Jun",
        "Total Users": data.totalUsers * 0.9,
        "Active Users": data.totalActive * 0.9,
        "Premium Users": data.totalPremium * 0.9,
        "Free Trial": data.totalFreeTrial * 0.9,
      },
      {
        name: "Jul",
        "Total Users": data.totalUsers,
        "Active Users": data.totalActive,
        "Premium Users": data.totalPremium,
        "Free Trial": data.totalFreeTrial,
      },
    ]
  }

  // Generate user type data for pie chart
  const generateUserTypeData = () => {
    if (!data) return []

    return [
      { name: "Premium Users", value: data.totalPremium || 0 },
      { name: "Free Trial Users", value: data.totalFreeTrial || 0 },
      { name: "Inactive Users", value: data.totalUsers - data.totalActive || 0 },
    ]
  }

  // Generate revenue data (mock data)
  const generateRevenueData = () => {
    if (!data) return []

    // This is mock data since we don't have revenue data from the API
    return [
      { name: "Jan", revenue: 4000 },
      { name: "Feb", revenue: 5000 },
      { name: "Mar", revenue: 6000 },
      { name: "Apr", revenue: 7000 },
      { name: "May", revenue: 8500 },
      { name: "Jun", revenue: 9800 },
      { name: "Jul", revenue: 12000 },
    ]
  }

  // Generate recent user activity
  const getRecentUsers = () => {
    if (!data?.users) return []

    // Sort users by creation date (newest first) and take the first 3
    return [...data.users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-16" />
                <Skeleton className="mt-2 h-4 w-28" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Error loading dashboard data. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  const userActivityData = generateUserActivityData()
  const userTypeData = generateUserTypeData()
  const revenueData = generateRevenueData()
  const recentUsers = getRecentUsers()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Last 30 days</span>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Download Report</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                15.3%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalActive || 0}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                12.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalPremium || 0}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                26.3%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Trial Users</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalFreeTrial || 0}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-rose-500 flex items-center">
                <ArrowDown className="mr-1 h-4 w-4" />
                3.1%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>User acquisition and activity over the last 7 months</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={userActivityData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="Total Users" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="Active Users" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="Premium Users" stackId="3" stroke="#ffc658" fill="#ffc658" />
                      <Area type="monotone" dataKey="Free Trial" stackId="4" stroke="#ff8042" fill="#ff8042" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of user types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {userTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue generated over the last 7 months</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={revenueData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                      <Legend />
                      <Bar dataKey="revenue" fill="#3b82f6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Revenue Report
                </Button>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest user and payment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user._id} className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                        <UserPlus className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-xs text-muted-foreground">
                          {user.firstName} {user.lastName} joined as a {user.subscriptionPlan} user
                        </p>
                      </div>
                      <div className="ml-auto text-xs text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/dashboard/users">View all users</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed analytics will be shown here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Advanced analytics content will be available soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>View and download your reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Report content will be available soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
