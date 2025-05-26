"use client"

import { useState } from "react"
import {
  BarChart,
  LineChart,
  Calendar,
  Download,
  FileText,
  Filter,
  Users,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// Mock data for reports
const userGrowthData = [
  { month: "Jan", users: 1200, newUsers: 200, churnedUsers: 50 },
  { month: "Feb", users: 1350, newUsers: 220, churnedUsers: 70 },
  { month: "Mar", users: 1500, newUsers: 250, churnedUsers: 100 },
  { month: "Apr", users: 1650, newUsers: 300, churnedUsers: 150 },
  { month: "May", users: 1800, newUsers: 350, churnedUsers: 200 },
  { month: "Jun", users: 2000, newUsers: 400, churnedUsers: 200 },
  { month: "Jul", users: 2200, newUsers: 450, churnedUsers: 250 },
]

const revenueData = [
  { month: "Jan", revenue: 12000, expenses: 8000, profit: 4000 },
  { month: "Feb", revenue: 14000, expenses: 9000, profit: 5000 },
  { month: "Mar", revenue: 16000, expenses: 10000, profit: 6000 },
  { month: "Apr", revenue: 18000, expenses: 11000, profit: 7000 },
  { month: "May", revenue: 20000, expenses: 12000, profit: 8000 },
  { month: "Jun", revenue: 22000, expenses: 13000, profit: 9000 },
  { month: "Jul", revenue: 25000, expenses: 14000, profit: 11000 },
]

const conversionData = [
  { name: "Visitors", value: 10000 },
  { name: "Signups", value: 2500 },
  { name: "Free Trial", value: 1500 },
  { name: "Premium", value: 500 },
]

const engagementData = [
  { day: "Mon", activeUsers: 1200, sessionDuration: 8 },
  { day: "Tue", activeUsers: 1300, sessionDuration: 7 },
  { day: "Wed", activeUsers: 1400, sessionDuration: 9 },
  { day: "Thu", activeUsers: 1350, sessionDuration: 8 },
  { day: "Fri", activeUsers: 1500, sessionDuration: 10 },
  { day: "Sat", activeUsers: 1100, sessionDuration: 12 },
  { day: "Sun", activeUsers: 900, sessionDuration: 15 },
]

const reportsList = [
  {
    id: 1,
    title: "Monthly User Growth Report",
    description: "Analysis of user acquisition and retention",
    date: "2025-05-01",
    type: "User Analytics",
    icon: Users,
  },
  {
    id: 2,
    title: "Q2 Revenue Report",
    description: "Financial performance for Q2 2025",
    date: "2025-04-15",
    type: "Financial",
    icon: CreditCard,
  },
  {
    id: 3,
    title: "User Engagement Analysis",
    description: "Patterns and trends in user engagement",
    date: "2025-04-10",
    type: "User Analytics",
    icon: TrendingUp,
  },
  {
    id: 4,
    title: "Conversion Funnel Report",
    description: "Analysis of user conversion through sales funnel",
    date: "2025-04-05",
    type: "Marketing",
    icon: LineChart,
  },
  {
    id: 5,
    title: "Annual Financial Summary",
    description: "Complete financial overview for 2024",
    date: "2025-03-20",
    type: "Financial",
    icon: BarChart,
  },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("30days")
  const [reportType, setReportType] = useState("all")

  // Filter reports based on type
  const filteredReports =
    reportType === "all"
      ? reportsList
      : reportsList.filter((report) => report.type.toLowerCase() === reportType.toLowerCase())

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,200</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$25,000</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>15% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2%</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>0.8% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.8 min</div>
            <div className="flex items-center text-xs text-red-500">
              <ArrowDownRight className="mr-1 h-4 w-4" />
              <span>1.2 min from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="growth" className="space-y-4">
        <TabsList>
          <TabsTrigger value="growth">User Growth</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>
        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth Trends</CardTitle>
              <CardDescription>Monthly user acquisition and churn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={userGrowthData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#8884d8" name="Total Users" />
                    <Bar dataKey="newUsers" fill="#82ca9d" name="New Users" />
                    <Bar dataKey="churnedUsers" fill="#ff8042" name="Churned Users" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Updated 1 day ago</div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Monthly revenue, expenses, and profit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={revenueData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" stroke="#ff8042" name="Expenses" strokeWidth={2} />
                    <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Updated 2 days ago</div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>User journey through conversion stages</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={conversionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {conversionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, ""]} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Conversion Metrics</h3>
                    <p className="text-sm text-muted-foreground">
                      Analysis of user journey through the conversion funnel
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Visitor to Signup Rate</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Signup to Free Trial Rate</span>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Free Trial to Premium Rate</span>
                      <span className="text-sm font-medium">33%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Overall Conversion Rate</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Updated 3 days ago</div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Daily active users and session duration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={engagementData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="activeUsers"
                      stroke="#8884d8"
                      name="Active Users"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="sessionDuration"
                      stroke="#82ca9d"
                      name="Avg. Session Duration (min)"
                      strokeWidth={2}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Updated 1 day ago</div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Generated Reports</CardTitle>
            <CardDescription>View and download your saved reports</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="user analytics">User Analytics</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right text-sm text-muted-foreground">
                    {new Date(report.date).toLocaleDateString()}
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Reports
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
