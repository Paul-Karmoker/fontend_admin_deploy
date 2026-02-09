"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

interface SidebarProps {
  className?: string;
}

export interface SidebarNavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  items?: SidebarNavItem[];
}

/**
 * Sidebar - Enterprise collapsible sidebar navigation
 * Features:
 * - Smooth collapse/expand animation
 * - Active route highlighting
 * - Icon consistency
 * - User profile section
 * - Logout functionality
 */
export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const auth = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-primary",
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
      color: "text-pink-600",
    },
    {
      label: "Reports",
      icon: BarChart3,
      href: "/dashboard/reports",
      color: "text-amber-600",
    },
    {
      label: "Content",
      icon: FileText,
      href: "/dashboard/content",
      color: "text-blue-600",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      color: "text-muted-foreground",
    },
    {
      label: "Help & Support",
      icon: HelpCircle,
      href: "/dashboard/help",
      color: "text-purple-600",
    },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  // Mobile toggle button
  const MobileToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg"
      onClick={() => setIsMobileOpen(!isMobileOpen)}
    >
      <Menu className="h-6 w-6" />
    </Button>
  );

  // Desktop sidebar
  const DesktopSidebar = () => (
    <aside
      className={cn(
        "hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Logo / Header */}
      <div className={cn("flex items-center h-16 px-4 border-b border-border", isCollapsed ? "justify-center" : "gap-3")}>
        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-primary-foreground font-bold shrink-0">
          A
        </div>
        {!isCollapsed && (
          <span className="text-lg font-semibold tracking-tight">Admin Panel</span>
        )}
      </div>

      {/* Collapse Toggle */}
      <div className="flex justify-end px-2 py-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-2">
        <nav className="space-y-1">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            const Icon = route.icon;

            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  "hover:bg-muted",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground",
                  isCollapsed && "justify-center"
                )}
                title={isCollapsed ? route.label : undefined}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive ? "text-primary" : route.color
                  )}
                />
                {!isCollapsed && (
                  <span className="text-sm">{route.label}</span>
                )}
                {!isCollapsed && isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Section */}
      <div className="border-t border-border p-4 space-y-2">
        <div
          className={cn(
            "flex items-center gap-3",
            isCollapsed && "justify-center"
          )}
        >
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-muted shrink-0">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        )}
      </div>
    </aside>
  );

  // Mobile sidebar overlay
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50 flex flex-col transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-primary-foreground font-bold">
              A
            </div>
            <span className="text-lg font-semibold tracking-tight">Admin Panel</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(false)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {routes.map((route) => {
              const isActive = pathname === route.href;
              const Icon = route.icon;

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    "hover:bg-muted",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-primary" : route.color
                    )}
                  />
                  <span className="text-sm">{route.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User Section */}
        <div className="border-t border-border p-4 space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-muted">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );

  return (
    <>
      <MobileToggle />
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
}

export default Sidebar;
