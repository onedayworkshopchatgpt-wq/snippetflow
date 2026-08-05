"use client"

import { PanelLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

import { DashboardSearch } from "./dashboard-search"
import { DashboardUserMenu, type DashboardUser } from "./dashboard-user-menu"

export function DashboardTopbar({
  user,
  onMenuClick,
}: {
  user: DashboardUser
  onMenuClick: () => void
}) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <PanelLeft className="size-4" aria-hidden />
      </Button>

      <DashboardSearch />

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <DashboardUserMenu user={user} />
      </div>
    </header>
  )
}
