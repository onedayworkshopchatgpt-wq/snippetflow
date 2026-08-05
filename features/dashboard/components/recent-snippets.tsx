"use client"

import Link from "next/link"
import { FileCode2 } from "lucide-react"

import { StaggerContainer, StaggerItem } from "@/components/shared/motion"
import {
  SNIPPET_LANGUAGE_LABELS,
  type SnippetLanguage,
} from "@/features/snippets/languages"

export type RecentSnippet = {
  id: string
  title: string
  language: string
  createdAt: string
  updatedAt: string
}

export function formatRelativeTime(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["week", 604_800],
    ["day", 86_400],
    ["hour", 3_600],
    ["minute", 60],
  ]
  for (const [unit, factor] of units) {
    if (seconds >= factor) {
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        -Math.floor(seconds / factor),
        unit,
      )
    }
  }
  return "just now"
}

export function RecentSnippets({ snippets }: { snippets: RecentSnippet[] }) {
  return (
    <section className="grid h-fit gap-3">
      <div className="grid gap-0.5">
        <h2 className="font-heading text-sm font-medium tracking-tight">
          Recent snippets
        </h2>
        <p className="text-sm text-muted-foreground">
          Your latest work, ready to revisit.
        </p>
      </div>

      {snippets.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-card/50 px-6 py-10 text-center">
          <div className="flex size-9 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground">
            <FileCode2 className="size-4" />
          </div>
          <p className="text-sm font-medium">Nothing here yet</p>
          <p className="text-xs text-muted-foreground">
            Create a snippet and it will show up here.
          </p>
        </div>
      ) : (
        <StaggerContainer className="grid gap-2">
          {snippets.map((snippet) => {
            const languageLabel =
              SNIPPET_LANGUAGE_LABELS[snippet.language as SnippetLanguage] ??
              snippet.language

            return (
              <StaggerItem key={snippet.id}>
                <Link
                  href="/snippets"
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-lifted"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <FileCode2 className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {snippet.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {languageLabel} &middot; {formatRelativeTime(snippet.updatedAt)}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      )}
    </section>
  )
}
