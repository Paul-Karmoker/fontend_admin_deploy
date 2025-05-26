"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Lock, Shield, AlertTriangle } from "lucide-react"

export default function SecuritySettingsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
          <p className="text-muted-foreground">Manage your account security and authentication methods.</p>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your account password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={loading} className="w-full">
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Add an extra layer of security to your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Authenticator App</h4>
                  <Badge variant="outline" className="text-green-500 border-green-500">
                    Enabled
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use an authenticator app to get two-factor authentication codes.
                </p>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">SMS Authentication</h4>
                  <Badge variant="outline" className="text-muted-foreground">
                    Disabled
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Get authentication codes sent to your phone via SMS.</p>
              </div>
              <Button variant="outline">Setup</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Backup Codes</h4>
                  <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                    Generated
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Generate backup codes to use when you don't have access to other methods.
                </p>
              </div>
              <Button variant="outline">View Codes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Login Sessions</CardTitle>
            <CardDescription>Manage your active sessions on different devices.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground">Windows • Chrome • New York, USA</p>
                  </div>
                </div>
                <Badge>Active Now</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">MacOS Session</p>
                    <p className="text-sm text-muted-foreground">MacOS • Safari • San Francisco, USA</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Mobile Session</p>
                    <p className="text-sm text-muted-foreground">iOS • Safari • Boston, USA</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" className="w-full">
              Log Out All Other Sessions
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Log</CardTitle>
            <CardDescription>Recent security events for your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Successful login</p>
                  <p className="text-sm text-muted-foreground">Chrome on Windows • New York, USA</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">2 minutes ago</div>
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Password changed</p>
                  <p className="text-sm text-muted-foreground">Chrome on Windows • New York, USA</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">2 days ago</div>
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Failed login attempt</p>
                  <p className="text-sm text-muted-foreground">Unknown device • Moscow, Russia</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">5 days ago</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Full Security Log
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Security</CardTitle>
            <CardDescription>Configure advanced security settings for your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-verification">Login Verification</Label>
                <Switch id="login-verification" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Receive an email notification when a new login is detected.
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="suspicious-activity">Suspicious Activity Detection</Label>
                <Switch id="suspicious-activity" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">Get alerts about suspicious activity on your account.</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password-reset">Password Reset Protection</Label>
                <Switch id="password-reset" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Require additional verification when resetting your password.
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="ip-restriction">IP Address Restriction</Label>
                <Switch id="ip-restriction" />
              </div>
              <p className="text-sm text-muted-foreground">Restrict login to specific IP addresses or ranges.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={loading} className="w-full">
              {loading ? "Saving..." : "Save Security Settings"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
