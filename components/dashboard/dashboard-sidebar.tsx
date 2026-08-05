"use client"

import Link from "next/link"
import { Braces, PanelLeftClose } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { DashboardNavigation } from "./dashboard-navigation"
import { SidebarFooter } from "./sidebar-footer"

export function DashboardSidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-background/60 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] shrink-0 flex-col border-r border-border/60 bg-background transition-transform duration-200 ease-out lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 px-4">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-md transition-opacity duration-200 hover:opacity-80 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            aria-label="SnippetFlow dashboard"
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background transition-transform duration-200 group-hover:scale-105">
              <Braces className="size-4" aria-hidden />
            </span>
            <span className="font-heading text-sm font-semibold tracking-tight">
              SnippetFlow
            </span>
          </Link>

          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <PanelLeftClose className="size-4" aria-hidden />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-3">
          <DashboardNavigation />
        </div>

        <SidebarFooter />
      </aside>
    </>
  )
}
