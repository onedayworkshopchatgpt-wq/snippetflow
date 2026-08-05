"use client"

import * as React from "react"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, RotateCcw, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import {
  SNIPPET_LANGUAGES,
  SNIPPET_LANGUAGE_LABELS,
} from "@/features/snippets/languages"
import type { SnippetFilters, SnippetVisibility } from "@/features/snippets/types"

export function FilterMenu({ filters = {} }: { filters?: SnippetFilters }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { language, visibility, recentlyUpdated } = filters

  const update = useCallback(
    (patch: SnippetFilters) => {
      const params = new URLSearchParams(window.location.search)
      const next = { ...filters, ...patch }
      if (next.language) params.set("language", next.language)
      else params.delete("language")
      if (next.visibility) params.set("visibility", next.visibility)
      else params.delete("visibility")
      if (next.recentlyUpdated) params.set("recent", "1")
      else params.delete("recent")
      const qs = params.toString()
      router.push(qs ? `/dashboard/snippets?${qs}` : "/dashboard/snippets")
    },
    [filters, router],
  )

  const clear = useCallback(() => {
    const params = new URLSearchParams(window.location.search)
    params.delete("language")
    params.delete("visibility")
    params.delete("recent")
    const qs = params.toString()
    router.push(qs ? `/snippets?${qs}` : "/snippets")
  }, [router])

  const activeCount =
    (language ? 1 : 0) + (visibility ? 1 : 0) + (recentlyUpdated ? 1 : 0)

  const pickVisibility = (next: SnippetVisibility) =>
    update({ visibility: visibility === next ? undefined : next })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <SlidersHorizontal className="size-3.5" />
          Filters
          {activeCount > 0 && (
            <span className="flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-0">
        <PopoverTitle className="px-3 pt-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Filter snippets
        </PopoverTitle>

        <div className="px-1">
          <ScrollArea className="max-h-56">
            <div className="flex flex-col p-1">
              {SNIPPET_LANGUAGES.map((lang) => {
                const selected = language === lang
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() =>
                      update({ language: selected ? undefined : lang })
                    }
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
                      selected
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    {SNIPPET_LANGUAGE_LABELS[lang]}
                    {selected && <Check className="size-3.5" />}
                  </button>
                )
              })}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        <div className="flex flex-col gap-0.5 p-1">
          {(
            [
              { value: "public", label: "Public" },
              { value: "private", label: "Private" },
            ] as { value: SnippetVisibility; label: string }[]
          ).map(({ value, label }) => {
            const selected = visibility === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => pickVisibility(value)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
                  selected
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                {label}
                {selected && <Check className="size-3.5" />}
              </button>
            )
          })}
        </div>

        <Separator />

        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <label
            htmlFor="filter-recently-updated"
            className="text-sm font-medium"
          >
            Recently updated
          </label>
          <Switch
            id="filter-recently-updated"
            checked={recentlyUpdated ?? false}
            onCheckedChange={(checked) => update({ recentlyUpdated: checked })}
          />
        </div>

        <Separator />

        <div className="p-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 px-2 text-muted-foreground"
            onClick={() => {
              clear()
              setOpen(false)
            }}
          >
            <RotateCcw className="size-3.5" />
            Clear filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
