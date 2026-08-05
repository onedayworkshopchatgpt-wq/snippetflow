"use client"

import Link from "next/link"
import { ArrowRight, FilePlus2, FolderOpen, Star, Trash2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { StaggerContainer, StaggerItem } from "@/components/shared/motion"

const QUICK_ACTIONS: {
  label: string
  description: string
  href: string
  icon: LucideIcon
}[] = [
  {
    label: "New snippet",
    description: "Capture a new piece of code",
    href: "/snippets",
    icon: FilePlus2,
  },
  {
    label: "Browse snippets",
    description: "Search and organize your library",
    href: "/snippets",
    icon: FolderOpen,
  },
  {
    label: "Favorites",
    description: "Open your starred snippets",
    href: "/snippets?filter=favorites",
    icon: Star,
  },
  {
    label: "Trash",
    description: "Restore or clear deleted snippets",
    href: "/snippets?filter=trash",
    icon: Trash2,
  },
]

export function QuickActions() {
  return (
    <section className="grid gap-3">
      <div className="grid gap-0.5">
        <h2 className="font-heading text-sm font-medium tracking-tight">
          Quick actions
        </h2>
        <p className="text-sm text-muted-foreground">
          Jump into the tools you use most.
        </p>
      </div>
      <StaggerContainer className="grid gap-3 sm:grid-cols-2">
        {QUICK_ACTIONS.map(({ label, description, href, icon: Icon }) => (
          <StaggerItem key={label} className="h-full">
            <Link
              href={href}
              className="group flex h-full items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-lifted"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="size-4" />
                </div>
                <div className="grid gap-0.5">
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
