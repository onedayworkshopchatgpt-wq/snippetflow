"use client"

import * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const DEBOUNCE_MS = 300

export function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [prevDefault, setPrevDefault] = useState(defaultValue)
  if (prevDefault !== defaultValue) {
    setPrevDefault(defaultValue)
    setValue(defaultValue)
  }

  const commit = useCallback(
    (next: string) => {
      const params = new URLSearchParams(window.location.search)
      const trimmed = next.trim()
      if (trimmed) params.set("q", trimmed)
      else params.delete("q")
      const qs = params.toString()
      router.push(qs ? `/snippets?${qs}` : "/snippets")
    },
    [router],
  )

  useEffect(() => {
    if (value === defaultValue) return
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => commit(value), DEBOUNCE_MS)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [value, defaultValue, commit])

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    setValue("")
    commit("")
  }, [commit])

  const isPending = value !== defaultValue

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        role="searchbox"
        aria-label="Search snippets"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search snippets…"
        className="h-9 pr-9 pl-8"
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Clear search"
          onClick={clear}
          className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {isPending ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <X className="size-3.5" />
          )}
        </Button>
      )}
    </div>
  )
}
