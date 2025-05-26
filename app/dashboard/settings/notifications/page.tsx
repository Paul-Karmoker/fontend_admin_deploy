"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Mail, MessageSquare, Calendar, CreditCard, Users, BarChart3 } from "lucide-react"

export default function NotificationsSettingsPage() {
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Settings</h1>
          <p className="text-muted-foreground">Manage how you receive notifications from the system.</p>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="push" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Push</span>
          </TabsTrigger>
          <TabsTrigger value="in-app" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>In-App</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notification Preferences</CardTitle>
              <CardDescription>Manage the emails you receive from the system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="user-activity">User Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about user registrations and activity.
                      </p>
                    </div>
                  </div>
                  <Switch id="user-activity" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="payment-updates">Payment Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about payment transactions and issues.
                      </p>
                    </div>
                  </div>
                  <Switch id="payment-updates" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="system-updates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about system updates and maintenance.
                      </p>
                    </div>
                  </div>
                  <Switch id="system-updates" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing">Marketing</Label>
                      <p className="text-sm text-muted-foreground">Receive marketing emails and promotional offers.</p>
                    </div>
                  </div>
                  <Switch id="marketing" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-frequency">Email Frequency</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger id="email-frequency" className="w-[180px]">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Email Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="push" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Push Notification Preferences</CardTitle>
              <CardDescription>Manage push notifications on your devices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="push-user-activity">User Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications about user registrations and activity.
                      </p>
                    </div>
                  </div>
                  <Switch id="push-user-activity" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="push-payment-updates">Payment Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications about payment transactions and issues.
                      </p>
                    </div>
                  </div>
                  <Switch id="push-payment-updates" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="push-system-updates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications about system updates and maintenance.
                      </p>
                    </div>
                  </div>
                  <Switch id="push-system-updates" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="space-y-1">
                <Label htmlFor="push-devices">Devices</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="push-devices" className="w-[180px]">
                    <SelectValue placeholder="Select devices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Devices</SelectItem>
                    <SelectItem value="mobile">Mobile Only</SelectItem>
                    <SelectItem value="desktop">Desktop Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Push Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="in-app" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>In-App Notification Preferences</CardTitle>
              <CardDescription>Manage notifications within the dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-user-activity">User Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive in-app notifications about user registrations and activity.
                      </p>
                    </div>
                  </div>
                  <Switch id="in-app-user-activity" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-payment-updates">Payment Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive in-app notifications about payment transactions and issues.
                      </p>
                    </div>
                  </div>
                  <Switch id="in-app-payment-updates" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-system-updates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive in-app notifications about system updates and maintenance.
                      </p>
                    </div>
                  </div>
                  <Switch id="in-app-system-updates" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-messages">Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive in-app notifications for new messages and comments.
                      </p>
                    </div>
                  </div>
                  <Switch id="in-app-messages" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="space-y-1">
                <Label htmlFor="notification-sound">Notification Sound</Label>
                <Select defaultValue="enabled">
                  <SelectTrigger id="notification-sound" className="w-[180px]">
                    <SelectValue placeholder="Select sound option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">Enabled</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save In-App Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
