"use client"

import * as React from "react"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpDown, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { SnippetSort } from "@/features/snippets/types"

const SORT_OPTIONS: { value: SnippetSort; label: string }[] = [
  { value: "updated", label: "Recently Updated" },
  { value: "created", label: "Recently Created" },
  { value: "oldest", label: "Oldest First" },
  { value: "az", label: "Alphabetical (A → Z)" },
  { value: "za", label: "Alphabetical (Z → A)" },
]

export function SortMenu({
  sort = "updated",
}: {
  sort?: SnippetSort
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const currentLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ??
    SORT_OPTIONS[0].label

  const pick = useCallback(
    (value: SnippetSort) => {
      const params = new URLSearchParams(window.location.search)
      if (value === "updated") params.delete("sort")
      else params.set("sort", value)
      const qs = params.toString()
      router.push(qs ? `/dashboard/snippets?${qs}` : "/dashboard/snippets")
    },
    [router],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-1.5"
          aria-label={`Sort snippets by ${currentLabel}`}
        >
          <ArrowUpDown className="size-3.5" />
          <span className="max-w-36 truncate">{currentLabel}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-0">
        <PopoverTitle className="px-3 pt-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Sort by
        </PopoverTitle>
        <div className="flex flex-col gap-0.5 p-1">
          {SORT_OPTIONS.map((option) => {
            const selected = option.value === sort
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  pick(option.value)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
                  selected
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                {option.label}
                {selected && <Check className="size-3.5" />}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
