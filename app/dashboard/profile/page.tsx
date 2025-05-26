"use client"

import { useState } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key,
  Lock,
  Edit,
  Save,
  X,
  FileText,
  Clock,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// Mock user data
const userData = {
  id: "admin123",
  firstName: "Admin",
  lastName: "User",
  email: "admin@example.com",
  phone: "+1 (234) 567-890",
  address: "123 Admin Street, Tech City, TC 12345",
  role: "System Administrator",
  joinDate: "2023-01-15",
  lastActive: "2025-05-18T09:30:00",
  bio: "System administrator with full access to all dashboard features. Responsible for managing users, content, and system settings.",
  skills: ["User Management", "Content Creation", "System Administration", "Data Analysis", "Technical Support"],
  socialLinks: {
    twitter: "https://twitter.com/adminuser",
    linkedin: "https://linkedin.com/in/adminuser",
    github: "https://github.com/adminuser",
  },
}

// Mock activity data
const activityData = [
  {
    id: 1,
    action: "Approved withdrawal request",
    date: "2025-05-18T09:15:00",
    details: "Approved withdrawal request #WD-2345 for $50.00",
  },
  {
    id: 2,
    action: "Updated user account",
    date: "2025-05-17T14:30:00",
    details: "Updated account details for user john.smith@example.com",
  },
  {
    id: 3,
    action: "Created new content",
    date: "2025-05-16T11:45:00",
    details: "Published new article 'Getting Started Guide'",
  },
  {
    id: 4,
    action: "System settings updated",
    date: "2025-05-15T16:20:00",
    details: "Modified notification settings for the platform",
  },
  {
    id: 5,
    action: "User account created",
    date: "2025-05-14T10:05:00",
    details: "Created new admin account for emma.johnson@example.com",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
    bio: userData.bio,
  })
  const { toast } = useToast()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    // Simulate saving profile data
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
      setIsEditing(false)
    }, 1000)
  }

  const handleCancel = () => {
    // Reset form data to original values
    setProfileData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      bio: userData.bio,
    })
    setIsEditing(false)
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Calculate time ago for activity
  const timeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now - date) / 1000)

    let interval = Math.floor(seconds / 31536000)
    if (interval >= 1) {
      return `${interval} year${interval === 1 ? "" : "s"} ago`
    }

    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) {
      return `${interval} month${interval === 1 ? "" : "s"} ago`
    }

    interval = Math.floor(seconds / 86400)
    if (interval >= 1) {
      return `${interval} day${interval === 1 ? "" : "s"} ago`
    }

    interval = Math.floor(seconds / 3600)
    if (interval >= 1) {
      return `${interval} hour${interval === 1 ? "" : "s"} ago`
    }

    interval = Math.floor(seconds / 60)
    if (interval >= 1) {
      return `${interval} minute${interval === 1 ? "" : "s"} ago`
    }

    return `${Math.floor(seconds)} second${seconds === 1 ? "" : "s"} ago`
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/placeholder.svg" alt={`${userData.firstName} ${userData.lastName}`} />
                <AvatarFallback className="text-2xl">
                  {userData.firstName.charAt(0)}
                  {userData.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-center">
                {userData.firstName} {userData.lastName}
              </CardTitle>
              <CardDescription className="text-center">{userData.role}</CardDescription>
              <Badge className="mt-2">{userData.id}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined {new Date(userData.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Last active {timeAgo(userData.lastActive)}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Social Links</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" />
                    </svg>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Personal Info</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Activity</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal information and contact details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        {isEditing ? (
                          <Input
                            id="firstName"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="rounded-md border border-input px-3 py-2">{profileData.firstName}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        {isEditing ? (
                          <Input
                            id="lastName"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="rounded-md border border-input px-3 py-2">{profileData.lastName}</div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="rounded-md border border-input px-3 py-2">{profileData.email}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      {isEditing ? (
                        <Input id="phone" name="phone" value={profileData.phone} onChange={handleInputChange} />
                      ) : (
                        <div className="rounded-md border border-input px-3 py-2">{profileData.phone}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      {isEditing ? (
                        <Input id="address" name="address" value={profileData.address} onChange={handleInputChange} />
                      ) : (
                        <div className="rounded-md border border-input px-3 py-2">{profileData.address}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      {isEditing ? (
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleInputChange}
                          className="min-h-[100px]"
                        />
                      ) : (
                        <div className="rounded-md border border-input px-3 py-2 min-h-[100px]">{profileData.bio}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication methods.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium">Password</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">Enabled via Authenticator App</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium">Active Sessions</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">You have 3 active sessions</p>
                      </div>
                      <Button variant="outline">View Sessions</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>View your recent account activity and actions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityData.map((activity, index) => (
                      <div key={activity.id} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{activity.action}</h4>
                            <span className="text-xs text-muted-foreground">{timeAgo(activity.date)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.details}</p>
                          <p className="text-xs text-muted-foreground mt-1">{formatDate(activity.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
