"use client"

import { motion } from "framer-motion"
import { Archive, LayoutGrid, Sparkles, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { StaggerContainer, StaggerItem } from "@/components/shared/motion"
import type { SnippetStats } from "@/features/snippets/service"

import { QuickActions } from "./quick-actions"
import { RecentActivity } from "./recent-activity"
import { RecentSnippets, type RecentSnippet } from "./recent-snippets"
import { StatCard } from "./stat-card"

const STAT_CARDS: {
  key: "total" | "favorites" | "public" | "archived"
  label: string
  hint: string
  href: string
  icon: LucideIcon
  iconClass: string
}[] = [
  {
    key: "total",
    label: "Total snippets",
    hint: "Active in your library",
    href: "/dashboard/snippets",
    icon: LayoutGrid,
    iconClass: "bg-primary/10 text-primary",
  },
  {
    key: "favorites",
    label: "Favorites",
    hint: "Starred for quick access",
    href: "/dashboard/snippets?filter=favorites",
    icon: Star,
    iconClass: "bg-amber-400/10 text-amber-500",
  },
  {
    key: "public",
    label: "Public",
    hint: "Shareable with anyone",
    href: "/dashboard/snippets",
    icon: Sparkles,
    iconClass: "bg-emerald-500/10 text-emerald-600",
  },
  {
    key: "archived",
    label: "Archived",
    hint: "Stored out of the way",
    href: "/dashboard/snippets?filter=archived",
    icon: Archive,
    iconClass: "bg-muted text-muted-foreground",
  },
]

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

export function DashboardOverview({
  name,
  stats,
  recent,
}: {
  name: string | null
  stats: SnippetStats
  recent: RecentSnippet[]
}) {
  const firstName = name?.split(" ")[0] ?? "there"

  return (
    <div className="flex w-full flex-col gap-8">
      <StaggerContainer className="grid gap-2">
        <StaggerItem>
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-2xl font-semibold tracking-tight"
          >
            {greeting()}, {firstName}
          </motion.h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {stats.total === 0
              ? "Your snippet library is empty. Create your first snippet to get started."
              : `You have ${stats.total} snippet${stats.total === 1 ? "" : "s"} ready to use.`}
          </p>
        </StaggerItem>
      </StaggerContainer>

      <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <StaggerItem key={card.key} className="h-full">
            <StatCard {...card} value={stats[card.key]} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid items-start gap-3 lg:grid-cols-2">
        <RecentSnippets snippets={recent} />
        <RecentActivity snippets={recent} />
      </div>

      <QuickActions />
    </div>
  )
}
