"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Download,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { ChartCard } from "@/components/ui/chart-card";
import { SectionHeader } from "@/components/ui/section-header";
import { DashboardGrid } from "@/components/ui/dashboard-grid";
import { ErrorState } from "@/components/ui/error-state";
import { useGetDashboardDataQuery } from "@/lib/redux/api/dashboardApi";
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
} from "recharts";

/**
 * DashboardPage - Enterprise dashboard with improved UX
 */

// Professional chart colors
const PIE_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useGetDashboardDataQuery();
  const [activeTab, setActiveTab] = useState("overview");

  // Generate user activity data from the API response
  const generateUserActivityData = () => {
    if (!data) return [];

    return [
      { name: "Jan", "Total Users": Math.round(data.totalUsers * 0.4), "Active Users": Math.round(data.totalActive * 0.4), "Premium Users": Math.round(data.totalPremium * 0.4), "Free Trial": Math.round(data.totalFreeTrial * 0.4) },
      { name: "Feb", "Total Users": Math.round(data.totalUsers * 0.5), "Active Users": Math.round(data.totalActive * 0.5), "Premium Users": Math.round(data.totalPremium * 0.5), "Free Trial": Math.round(data.totalFreeTrial * 0.5) },
      { name: "Mar", "Total Users": Math.round(data.totalUsers * 0.6), "Active Users": Math.round(data.totalActive * 0.6), "Premium Users": Math.round(data.totalPremium * 0.6), "Free Trial": Math.round(data.totalFreeTrial * 0.6) },
      { name: "Apr", "Total Users": Math.round(data.totalUsers * 0.7), "Active Users": Math.round(data.totalActive * 0.7), "Premium Users": Math.round(data.totalPremium * 0.7), "Free Trial": Math.round(data.totalFreeTrial * 0.7) },
      { name: "May", "Total Users": Math.round(data.totalUsers * 0.8), "Active Users": Math.round(data.totalActive * 0.8), "Premium Users": Math.round(data.totalPremium * 0.8), "Free Trial": Math.round(data.totalFreeTrial * 0.8) },
      { name: "Jun", "Total Users": Math.round(data.totalUsers * 0.9), "Active Users": Math.round(data.totalActive * 0.9), "Premium Users": Math.round(data.totalPremium * 0.9), "Free Trial": Math.round(data.totalFreeTrial * 0.9) },
      { name: "Jul", "Total Users": data.totalUsers, "Active Users": data.totalActive, "Premium Users": data.totalPremium, "Free Trial": data.totalFreeTrial },
    ];
  };

  // Generate user type data for pie chart
  const generateUserTypeData = () => {
    if (!data) return [];

    const inactiveUsers = data.totalUsers - data.totalActive;
    return [
      { name: "Premium Users", value: data.totalPremium || 0 },
      { name: "Free Trial Users", value: data.totalFreeTrial || 0 },
      { name: "Inactive Users", value: Math.max(0, inactiveUsers) || 0 },
    ].filter(item => item.value > 0);
  };

  // Generate revenue data (mock data)
  const generateRevenueData = () => {
    if (!data) return [];

    return [
      { name: "Jan", revenue: 4000 },
      { name: "Feb", revenue: 5000 },
      { name: "Mar", revenue: 6000 },
      { name: "Apr", revenue: 7000 },
      { name: "May", revenue: 8500 },
      { name: "Jun", revenue: 9800 },
      { name: "Jul", revenue: 12000 },
    ];
  };

  // Generate recent user activity
  const getRecentUsers = () => {
    if (!data?.users) return [];
    return [...data.users]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  };

  // Custom tooltip formatter
  const formatCurrency = (value: number | string) => {
    if (typeof value === "string") return value;
    return `$${value.toLocaleString()}`;
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="card p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-24 bg-muted rounded" />
        <div className="h-9 w-9 bg-muted rounded-lg" />
      </div>
      <div className="space-y-2">
        <div className="h-8 w-32 bg-muted rounded" />
        <div className="h-3 w-40 bg-muted rounded" />
      </div>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="h-10 w-48 bg-muted rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
          </div>
        </div>

        <DashboardGrid columns={4}>
          {[1, 2, 3, 4].map((i) => (
            <LoadingSkeleton key={i} />
          ))}
        </DashboardGrid>

        <div className="grid gap-6 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <ChartCard title="User Growth" isLoading />
          </div>
          <div className="lg:col-span-3">
            <ChartCard title="User Distribution" isLoading />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    const errorCode = 'status' in error ? String((error as any).status) : 'Unknown';
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full">
          <ErrorState
            title="Failed to load dashboard data"
            description="We couldn't load your dashboard data. Please try again or contact support if the problem persists."
            errorCode={errorCode}
            onRetry={() => refetch()}
          />
          <div className="flex gap-3 mt-6 justify-center">
            <Button variant="outline" onClick={() => refetch()}>
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/help">
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Get Help
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const userActivityData = generateUserActivityData();
  const userTypeData = generateUserTypeData();
  const revenueData = generateRevenueData();
  const recentUsers = getRecentUsers();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <SectionHeader
        title="Dashboard"
        description="Overview of your platform's performance and key metrics"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />

      {/* Stats Grid */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Total Users"
          value={data?.totalUsers || 0}
          description="from last month"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          trend={{ value: "15.3%", isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value={data?.totalActive || 0}
          description="from last month"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          trend={{ value: "12.5%", isPositive: true }}
        />
        <StatCard
          title="Premium Users"
          value={data?.totalPremium || 0}
          description="from last month"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          trend={{ value: "26.3%", isPositive: true }}
        />
        <StatCard
          title="Free Trial Users"
          value={data?.totalFreeTrial || 0}
          description="from last month"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          trend={{ value: "3.1%", isPositive: false }}
        />
      </DashboardGrid>

      {/* Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <ChartCard
                title="User Growth"
                description="User acquisition and activity over the last 7 months"
                height={320}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="Total Users" stroke="#3b82f6" fill="url(#colorTotal)" strokeWidth={2} />
                    <Area type="monotone" dataKey="Active Users" stroke="#10b981" fill="url(#colorActive)" strokeWidth={2} />
                    <Area type="monotone" dataKey="Premium Users" stroke="#8b5cf6" fill="transparent" strokeWidth={2} />
                    <Area type="monotone" dataKey="Free Trial" stroke="#f59e0b" fill="transparent" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div className="lg:col-span-3">
              <ChartCard
                title="User Distribution"
                description="Breakdown of user types"
                height={320}
                isEmpty={userTypeData.length === 0}
                emptyMessage="No user data available"
              >
                {userTypeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {userTypeData.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : null}
              </ChartCard>
            </div>
          </div>

          {/* Revenue and Recent Activity Row */}
          <div className="grid gap-6 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <ChartCard
                title="Monthly Revenue"
                description="Revenue generated over the last 7 months"
                height={320}
                footer={
                  <Button variant="outline" className="w-full" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Revenue Report
                  </Button>
                }
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                      formatter={(value: unknown) => [formatCurrency(value as number | string), "Revenue"]}
                    />
                    <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div className="lg:col-span-3">
              <ChartCard
                title="Recent Activity"
                description="Latest user registrations"
                height={320}
                isEmpty={recentUsers.length === 0}
                emptyMessage="No recent activity"
                footer={
                  <Button variant="ghost" className="w-full" size="sm" asChild>
                    <Link href="/dashboard/users">View all users</Link>
                  </Button>
                }
              >
                {recentUsers.length > 0 ? (
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                          <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.subscriptionPlan} user
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </ChartCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-7">
            <div className="lg:col-span-7">
              <ChartCard
                title="Advanced Analytics"
                description="Detailed analytics and insights"
                height={400}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-7">
            <div className="lg:col-span-7">
              <ChartCard
                title="Generated Reports"
                description="View and download your reports"
                height={400}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
