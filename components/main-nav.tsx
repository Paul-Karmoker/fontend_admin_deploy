"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/users",
      label: "Users",
      active: pathname === "/dashboard/users",
    },
    {
      href: "/dashboard/withdrawals",
      label: "Withdrawals",
      active: pathname === "/dashboard/withdrawals",
    },
    {
      href: "/dashboard/payment-approvals",
      label: "Payment Approvals",
      active: pathname === "/dashboard/payment-approvals",
    },
    {
      href: "/dashboard/reports",
      label: "Reports",
      active: pathname === "/dashboard/reports",
    },
    {
      href: "/dashboard/content",
      label: "Content",
      active: pathname === "/dashboard/content",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      active: pathname === "/dashboard/settings",
    },
    {
      href: "/dashboard/help",
      label: "Help & Support",
      active: pathname === "/dashboard/help",
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-black dark:text-white" : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
