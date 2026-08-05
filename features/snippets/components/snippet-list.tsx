"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Archive, FilePlus2, SearchX, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion"
import { cn } from "@/lib/utils"

import { SnippetCard } from "./snippet-card"
import { SnippetDialog } from "./snippet-dialog"
import { SearchBar } from "./search-bar"
import { FilterMenu } from "./filter-menu"
import { SortMenu } from "./sort-menu"
import type {
  SnippetFilter,
  SnippetFilters,
  SnippetListItem,
  SnippetSort,
} from "@/features/snippets/types"

const FILTER_TABS: { value: SnippetFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "favorites", label: "Favorites" },
  { value: "archived", label: "Archived" },
  { value: "trash", label: "Trash" },
]

const EMPTY_CONTENT: Record<
  SnippetFilter,
  { icon: typeof FilePlus2; title: string; description: string }
> = {
  all: {
    icon: FilePlus2,
    title: "No snippets yet",
    description: "Create your first snippet to get started.",
  },
  favorites: {
    icon: Star,
    title: "No favorite snippets",
    description: "Star snippets you use often and they'll show up here.",
  },
  archived: {
    icon: Archive,
    title: "No archived snippets",
    description: "Archived snippets will appear here.",
  },
  trash: {
    icon: Trash2,
    title: "Trash is empty",
    description: "Deleted snippets can be restored from here.",
  },
}

function EmptyState({
  filter,
  query,
  onCreate,
}: {
  filter: SnippetFilter
  query?: string
  onCreate: () => void
}) {
  if (query) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-card/50 px-6 py-16 text-center"
      >
        <div className="flex size-11 items-center justify-center rounded-xl border bg-muted/50 text-muted-foreground">
          <SearchX className="size-5" />
        </div>
        <div className="grid gap-1">
          <p className="font-medium">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-muted-foreground">
            Try a different keyword or clear your search.
          </p>
        </div>
        <Button className="mt-1" variant="outline" onClick={onCreate}>
          Create a new snippet
        </Button>
      </motion.div>
    )
  }

  const { icon: Icon, title, description } = EMPTY_CONTENT[filter]
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-card/50 px-6 py-16 text-center"
    >
      <div className="flex size-11 items-center justify-center rounded-xl border bg-muted/50 text-muted-foreground">
        <Icon className="size-5" />
      </div>
      <div className="grid gap-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {filter === "all" && (
        <Button className="mt-1" onClick={onCreate}>
          <FilePlus2 /> Create snippet
        </Button>
      )}
    </motion.div>
  )
}

export function SnippetList({
  snippets,
  filter,
  query,
  filters,
  sort = "updated",
}: {
  snippets: SnippetListItem[]
  filter: SnippetFilter
  query?: string
  filters?: SnippetFilters
  sort?: SnippetSort
}) {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<SnippetListItem | null>(null)

  const tabHref = (tab: SnippetFilter) => {
    const params = new URLSearchParams()
    if (tab !== "all") params.set("filter", tab)
    if (query) params.set("q", query)
    if (filters?.language) params.set("language", filters.language)
    if (filters?.visibility) params.set("visibility", filters.visibility)
    if (filters?.recentlyUpdated) params.set("recent", "1")
    if (sort !== "updated") params.set("sort", sort)
    const qs = params.toString()
    return qs ? `/snippets?${qs}` : "/snippets"
  }

  const openCreate = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (snippet: SnippetListItem) => {
    setEditing(snippet)
    setDialogOpen(true)
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Snippets
          </h1>
          <p className="text-sm text-muted-foreground">
            Store, organize, and share your code snippets.
          </p>
        </div>
        <Button onClick={openCreate}>
          <FilePlus2 /> New snippet
        </Button>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Filter snippets"
          className="flex w-fit items-center gap-0.5 rounded-lg border bg-card p-1"
        >
          {FILTER_TABS.map((tab) => {
            const active = tab.value === filter
            return (
              <button
                key={tab.value}
                role="tab"
                aria-selected={active}
                onClick={() => router.push(tabHref(tab.value))}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="snippet-filter-pill"
                    className="absolute inset-0 rounded-md bg-muted"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-2">
          <FilterMenu filters={filters} />
          <SortMenu sort={sort} />
          <SearchBar defaultValue={query ?? ""} />
        </div>
      </div>

      {snippets.length === 0 ? (
        <EmptyState filter={filter} query={query} onCreate={openCreate} />
      ) : (
        <StaggerContainer
          key={filter}
          className="grid gap-3 sm:grid-cols-2"
        >
          {snippets.map((snippet) => (
            <StaggerItem key={snippet.id} className="h-full">
              <SnippetCard snippet={snippet} onEdit={openEdit} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      <SnippetDialog
        snippet={editing}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
