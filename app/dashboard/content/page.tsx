"use client"

import { useState } from "react"
import {
  FileText,
  ImageIcon,
  Video,
  File,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  Calendar,
  Tag,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Mock content data
const contentItems = [
  {
    id: 1,
    title: "Getting Started Guide",
    type: "article",
    status: "published",
    author: "John Smith",
    authorAvatar: "/placeholder.svg",
    date: "2025-05-10",
    views: 1250,
    category: "Tutorial",
    tags: ["beginner", "guide", "onboarding"],
    excerpt: "A comprehensive guide to help new users get started with our platform.",
  },
  {
    id: 2,
    title: "Platform Overview Video",
    type: "video",
    status: "published",
    author: "Emma Johnson",
    authorAvatar: "/placeholder.svg",
    date: "2025-05-08",
    views: 3420,
    category: "Tutorial",
    tags: ["overview", "features", "demo"],
    excerpt: "A video walkthrough of all the key features of our platform.",
  },
  {
    id: 3,
    title: "Advanced User Strategies",
    type: "article",
    status: "draft",
    author: "Michael Brown",
    authorAvatar: "/placeholder.svg",
    date: "2025-05-15",
    views: 0,
    category: "Advanced",
    tags: ["advanced", "strategies", "tips"],
    excerpt: "Learn advanced strategies to maximize your results on our platform.",
  },
  {
    id: 4,
    title: "May 2025 Product Update",
    type: "article",
    status: "scheduled",
    author: "John Smith",
    authorAvatar: "/placeholder.svg",
    date: "2025-05-20",
    views: 0,
    category: "Updates",
    tags: ["update", "features", "release"],
    excerpt: "Discover all the new features and improvements in our May 2025 update.",
  },
  {
    id: 5,
    title: "User Success Stories",
    type: "article",
    status: "published",
    author: "Sophia Williams",
    authorAvatar: "/placeholder.svg",
    date: "2025-05-05",
    views: 980,
    category: "Case Study",
    tags: ["success", "case study", "testimonial"],
    excerpt: "Real stories from users who have achieved success with our platform.",
  },
  {
    id: 6,
    title: "Platform Tutorial Series",
    type: "video",
    status: "published",
    author: "Emma Johnson",
    authorAvatar: "/placeholder.svg",
    date: "2025-05-01",
    views: 2150,
    category: "Tutorial",
    tags: ["tutorial", "series", "how-to"],
    excerpt: "A comprehensive video series covering all aspects of our platform.",
  },
  {
    id: 7,
    title: "Integration Documentation",
    type: "document",
    status: "published",
    author: "James Davis",
    authorAvatar: "/placeholder.svg",
    date: "2025-04-28",
    views: 750,
    category: "Documentation",
    tags: ["integration", "api", "developer"],
    excerpt: "Technical documentation for developers integrating with our platform.",
  },
  {
    id: 8,
    title: "Upcoming Features Preview",
    type: "article",
    status: "draft",
    author: "Michael Brown",
    authorAvatar: "/placeholder.svg",
    date: "2025-05-25",
    views: 0,
    category: "Updates",
    tags: ["preview", "roadmap", "features"],
    excerpt: "A sneak peek at the exciting features coming to our platform.",
  },
]

// Content statistics
const contentStats = {
  total: 32,
  published: 24,
  draft: 5,
  scheduled: 3,
  views: 28500,
  engagement: 68,
}

// Content type icons
const contentTypeIcons = {
  article: FileText,
  video: Video,
  document: File,
  image: ImageIcon,
}

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Filter content based on search term, status, type, and active tab
  const filteredContent = contentItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesType = typeFilter === "all" || item.type === typeFilter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "published" && item.status === "published") ||
      (activeTab === "draft" && item.status === "draft") ||
      (activeTab === "scheduled" && item.status === "scheduled")

    return matchesSearch && matchesStatus && matchesType && matchesTab
  })

  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return { variant: "default", icon: CheckCircle2 }
      case "draft":
        return { variant: "secondary", icon: AlertCircle }
      case "scheduled":
        return { variant: "outline", icon: Calendar }
      default:
        return { variant: "default", icon: CheckCircle2 }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Content
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.total}</div>
            <p className="text-xs text-muted-foreground">Across all content types</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.published}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((contentStats.published / contentStats.total) * 100)}% of total content
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all published content</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.engagement}%</div>
            <Progress value={contentStats.engagement} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Library</CardTitle>
          <CardDescription>Manage and organize all your content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search content..."
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
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-9 w-[130px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="article">Articles</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="document">Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredContent.length === 0 ? (
                  <div className="col-span-full flex h-40 items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">No content found.</p>
                  </div>
                ) : (
                  filteredContent.map((item) => {
                    const StatusIcon = getStatusBadge(item.status).icon
                    const TypeIcon = contentTypeIcons[item.type]

                    return (
                      <Card key={item.id} className="overflow-hidden">
                        <CardHeader className="p-4">
                          <div className="flex items-center justify-between">
                            <Badge variant={getStatusBadge(item.status).variant} className="px-2 py-0 text-xs">
                              <StatusIcon className="mr-1 h-3 w-3" />
                              <span className="capitalize">{item.status}</span>
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="flex items-center gap-2 pt-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                              <TypeIcon className="h-4 w-4 text-primary" />
                            </div>
                            <CardTitle className="text-base">{item.title}</CardTitle>
                          </div>
                          <CardDescription className="line-clamp-2 mt-2">{item.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="px-1.5 py-0 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between border-t p-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={item.authorAvatar || "/placeholder.svg"} alt={item.author} />
                              <AvatarFallback>{item.author.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{item.author}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                            {item.status === "published" && (
                              <>
                                <Eye className="ml-2 h-3 w-3" />
                                <span>{item.views.toLocaleString()}</span>
                              </>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    )
                  })
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredContent.length} of {contentItems.length} items
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
