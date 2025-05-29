"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type React from "react";
import { SidebarNavItem } from "@/components/sidebar";

interface MainNavProps {
  className?: string;
  items: SidebarNavItem[];
}

export function MainNav({ className, items }: MainNavProps) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <nav className={cn("flex flex-col gap-2", className)}>
      {items.map((item) => (
        <div key={item.href} className="flex flex-col">
          {item.items && item.items.length > 0 ? (
            <Collapsible
              open={openItems.includes(item.title)}
              onOpenChange={() => toggleItem(item.title)}
            >
              <CollapsibleTrigger
                className={cn(
                  "flex items-center w-full p-3 text-sm font-medium rounded-lg transition",
                  pathname === item.href
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
                aria-label={`Toggle ${item.title} menu`}
              >
                {item.icon && <span className="h-5 w-5 mr-3">{item.icon}</span>}
                {item.title}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 ml-auto transition-transform",
                    openItems.includes(item.title) ? "rotate-180" : ""
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-8 pt-1">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "block p-3 text-sm font-medium rounded-lg transition",
                      pathname === subItem.href
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    )}
                    aria-label={subItem.title}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "flex p-3 text-sm font-medium rounded-lg transition",
                pathname === item.href
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
              aria-label={item.title}
            >
              {item.icon && <span className="h-5 w-5 mr-3">{item.icon}</span>}
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}