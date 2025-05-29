"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  CheckCircle,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

interface SidebarProps {
  className?: string;
  children?: React.ReactNode;
}
export interface SidebarNavItem {
  title: string;
  href: string; // Standardized to href
  icon?: React.ReactNode;
  items?: SidebarNavItem[];
}


export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const auth = useAuth();

  // Define a logout function
  const logout = () => {
    // Clear token or perform logout logic here
    // For example, remove token from localStorage and redirect
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Users",
      icon: Users,
      href: "/dashboard/users",
      color: "text-violet-500",
    },
    {
      label: "Withdrawals",
      icon: CreditCard,
      href: "/dashboard/withdrawals",
      color: "text-pink-700",
    },
    {
      label: "Payment Approvals",
      icon: CheckCircle,
      href: "/dashboard/payment-approvals",
      color: "text-green-700",
    },
    {
      label: "Reports",
      icon: BarChart3,
      href: "/dashboard/reports",
      color: "text-orange-700",
    },
    {
      label: "Content",
      icon: FileText,
      href: "/dashboard/content",
      color: "text-blue-700",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      color: "text-gray-700",
    },
    {
      label: "Help & Support",
      icon: HelpCircle,
      href: "/dashboard/help",
      color: "text-purple-700",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">Admin Panel</h2>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-1 p-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                      pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                    )}
                  >
                    <div className="flex items-center flex-1">
                      <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                      {route.label}
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            <div className="px-4 py-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Admin User</span>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
