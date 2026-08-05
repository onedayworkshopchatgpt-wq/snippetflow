"use client"

import {
  Archive,
  Clock,
  FileCode2,
  Folder,
  LayoutDashboard,
  Share2,
  Star,
  Tags,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import { NavigationItem } from "./navigation-item"

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/snippets", label: "All Snippets", icon: FileCode2 },
  { href: "/dashboard/collections", label: "Collections", icon: Folder },
  { href: "/dashboard/favorites", label: "Favorites", icon: Star },
  { href: "/dashboard/shared", label: "Shared", icon: Share2 },
  { href: "/dashboard/recent", label: "Recent", icon: Clock },
  { href: "/dashboard/archived", label: "Archived", icon: Archive },
]

export function DashboardNavigation() {
  return (
    <nav className="flex flex-col gap-0.5" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <NavigationItem key={item.href} href={item.href} icon={item.icon}>
          {item.label}
        </NavigationItem>
      ))}

      <Separator className="my-3" />

      <p className="px-2.5 pb-1 text-xs font-medium tracking-wide text-muted-foreground/70 uppercase">
        Tags
      </p>
      <NavigationItem href="/dashboard/snippets" icon={Tags}>
        All tags
      </NavigationItem>
    </nav>
  )
}
