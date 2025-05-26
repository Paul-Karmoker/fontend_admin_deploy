import type React from "react"
import { Home, LayoutDashboard, Settings, User, FileText, CheckCircle2, Database } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { Sidebar, type SidebarNavItem } from "@/components/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
    items: [],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: LayoutDashboard,
    items: [],
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: User,
    items: [],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
    items: [],
  },
  {
    title: "Payment Approvals",
    href: "/dashboard/payment-approvals",
    icon: CheckCircle2,
    items: [],
  },
  {
    title: "Database",
    url: "/dashboard/database",
    icon: Database,
    items: [
      {
        title: "Overview",
        url: "/dashboard/database",
      },
      {
        title: "Instances",
        url: "/dashboard/database/instances",
      },
      {
        title: "Monitoring",
        url: "/dashboard/database/monitoring",
      },
      {
        title: "Backups",
        url: "/dashboard/database/backups",
      },
    ],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    items: [],
  },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen antialiased">
      <Sidebar className="w-64 border-r flex-shrink-0">
        <MainNav className="flex flex-col gap-4" items={sidebarNavItems} />
      </Sidebar>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
