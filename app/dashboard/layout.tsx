import type React from "react";
import { Home, LayoutDashboard, Settings, User, FileText, CheckCircle2, Database } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { Sidebar, type SidebarNavItem } from "@/components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
    items: [],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <LayoutDashboard className="h-5 w-5" />,
    items: [],
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: <User className="h-5 w-5" />,
    items: [],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: <FileText className="h-5 w-5" />,
    items: [],
  },
  {
    title: "Payment Approvals",
    href: "/dashboard/payment-approvals",
    icon: <CheckCircle2 className="h-5 w-5" />,
    items: [],
  },
  {
    title: "Database",
    href: "/dashboard/database",
    icon: <Database className="h-5 w-5" />,
    items: [
      {
        title: "Overview",
        href: "/dashboard/database",
      },
      {
        title: "Instances",
        href: "/dashboard/database/instances",
      },
      {
        title: "Monitoring",
        href: "/dashboard/database/monitoring",
      },
      {
        title: "Backups",
        href: "/dashboard/database/backups",
      },
    ],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
    items: [],
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-500 antialiased">
      <Sidebar className="w-64 border-r border-gray-200 bg-gray-900">
        <MainNav className="flex flex-col gap-2" items={sidebarNavItems} />
      </Sidebar>
      <main className="flex-1 p-6 overflow-auto bg-gray-900">
        {children}
      </main>
    </div>
  );
}