"use client"

import { useState } from "react"
import {
  Database,
  Server,
  Activity,
  Zap,
  HardDrive,
  Network,
  Shield,
  RefreshCw,
  Download,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Copy,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Mock data for demonstration
const databaseMetrics = {
  totalDatabases: 12,
  totalTables: 156,
  totalRecords: 2847392,
  storageUsed: 45.7, // GB
  storageTotal: 100, // GB
  activeConnections: 23,
  maxConnections: 100,
  queryPerformance: 98.5, // %
  uptime: "99.9%",
  lastBackup: "2 hours ago",
}

const databases = [
  {
    id: "db_001",
    name: "production_main",
    type: "PostgreSQL",
    status: "active",
    size: "12.4 GB",
    tables: 45,
    records: 1250000,
    connections: 8,
    lastAccess: "2 minutes ago",
    performance: 98,
    backup: "automated",
  },
  {
    id: "db_002",
    name: "analytics_warehouse",
    type: "MongoDB",
    status: "active",
    size: "28.7 GB",
    tables: 23,
    records: 890000,
    connections: 5,
    lastAccess: "5 minutes ago",
    performance: 95,
    backup: "automated",
  },
  {
    id: "db_003",
    name: "user_sessions",
    type: "Redis",
    status: "active",
    size: "2.1 GB",
    tables: 1,
    records: 45000,
    connections: 12,
    lastAccess: "1 minute ago",
    performance: 99,
    backup: "manual",
  },
  {
    id: "db_004",
    name: "logs_archive",
    type: "ClickHouse",
    status: "maintenance",
    size: "156.8 GB",
    tables: 87,
    records: 5600000,
    connections: 0,
    lastAccess: "30 minutes ago",
    performance: 85,
    backup: "automated",
  },
]

const recentQueries = [
  {
    id: "q_001",
    query: "SELECT * FROM users WHERE created_at > '2024-01-01'",
    database: "production_main",
    duration: "0.045s",
    status: "completed",
    timestamp: "2 minutes ago",
    user: "admin@company.com",
  },
  {
    id: "q_002",
    query: "UPDATE user_profiles SET last_login = NOW() WHERE user_id = ?",
    database: "production_main",
    duration: "0.012s",
    status: "completed",
    timestamp: "3 minutes ago",
    user: "api_service",
  },
  {
    id: "q_003",
    query: "INSERT INTO analytics_events (event_type, user_id, data) VALUES...",
    database: "analytics_warehouse",
    duration: "0.234s",
    status: "completed",
    timestamp: "5 minutes ago",
    user: "analytics_worker",
  },
  {
    id: "q_004",
    query: "DELETE FROM expired_sessions WHERE expires_at < NOW()",
    database: "user_sessions",
    duration: "1.245s",
    status: "failed",
    timestamp: "8 minutes ago",
    user: "cleanup_job",
  },
]

export default function DatabasePage() {
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleDatabaseAction = async (action: string, databaseId: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: `Database ${action}`,
        description: `Successfully ${action}ed database ${databaseId}`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${action} database`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Maintenance</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return "text-green-600"
    if (performance >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredDatabases = databases.filter((db) => {
    const matchesSearch =
      db.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      db.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || db.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Database className="h-8 w-8 text-blue-600" />
            Database Management
          </h1>
          <p className="text-muted-foreground">Monitor and manage your database infrastructure</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Database
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Databases</CardTitle>
            <Database className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{databaseMetrics.totalDatabases}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                +2 from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{databaseMetrics.storageUsed} GB</div>
            <Progress value={(databaseMetrics.storageUsed / databaseMetrics.storageTotal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {databaseMetrics.storageTotal - databaseMetrics.storageUsed} GB available
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <Network className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{databaseMetrics.activeConnections}</div>
            <Progress
              value={(databaseMetrics.activeConnections / databaseMetrics.maxConnections) * 100}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {databaseMetrics.maxConnections - databaseMetrics.activeConnections} connections available
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Activity className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{databaseMetrics.queryPerformance}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <CheckCircle className="mr-1 h-3 w-3" />
                Uptime: {databaseMetrics.uptime}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="databases" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="databases" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Databases</span>
          </TabsTrigger>
          <TabsTrigger value="queries" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Queries</span>
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Monitoring</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="databases" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Database Instances
                  </CardTitle>
                  <CardDescription>Manage your database instances and configurations</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search databases..."
                      className="pl-8 w-full sm:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <UITable>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Database</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Connections</TableHead>
                      <TableHead>Last Access</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDatabases.map((database) => (
                      <TableRow key={database.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                              <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <div className="font-medium">{database.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {database.tables} tables • {database.records.toLocaleString()} records
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {database.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(database.status)}</TableCell>
                        <TableCell className="font-mono">{database.size}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <Progress value={database.performance} className="h-2" />
                            </div>
                            <span className={cn("text-sm font-medium", getPerformanceColor(database.performance))}>
                              {database.performance}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Network className="h-4 w-4 text-muted-foreground" />
                            <span>{database.connections}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{database.lastAccess}</TableCell>
                        <TableCell className="text-right">
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
                              <DropdownMenuItem onClick={() => setSelectedDatabase(database.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Configuration
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Clone Database
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Backup Now
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Open Console
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Database
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </UITable>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Query Activity
              </CardTitle>
              <CardDescription>Monitor database query performance and execution history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQueries.map((query) => (
                  <div key={query.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                      <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono text-xs">
                            {query.database}
                          </Badge>
                          <Badge variant={query.status === "completed" ? "default" : "destructive"} className="text-xs">
                            {query.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {query.timestamp}
                        </div>
                      </div>
                      <div className="font-mono text-sm bg-muted p-2 rounded border">{query.query}</div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Executed by: {query.user}</span>
                        <span>Duration: {query.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm text-muted-foreground">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm text-muted-foreground">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Disk I/O</span>
                    <span className="text-sm text-muted-foreground">23%</span>
                  </div>
                  <Progress value={23} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Network</span>
                    <span className="text-sm text-muted-foreground">12%</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">SSL Encryption</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Access Control</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Configured</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Backup Encryption</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Audit Logging</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Database Configuration
              </CardTitle>
              <CardDescription>Configure global database settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Connection Pool Size</label>
                    <Input type="number" defaultValue="20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Query Timeout (seconds)</label>
                    <Input type="number" defaultValue="30" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Backup Settings</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Backup Frequency</label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Retention Period (days)</label>
                      <Input type="number" defaultValue="30" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Configuration</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
