"use client"

import * as React from "react"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import {
  Archive,
  ArchiveRestore,
  Copy,
  EllipsisVertical,
  Pencil,
  RotateCcw,
  Share2,
  Star,
  Trash2,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  deleteSnippet,
  deleteSnippetForever,
  duplicateSnippet,
  restoreSnippet,
  toggleSnippetArchive,
  toggleSnippetFavorite,
  toggleSnippetVisibility,
  type SnippetMutationState,
} from "@/features/snippets/actions"
import { CopyButton } from "@/features/snippets/components/code-editor"
import { SNIPPET_LANGUAGE_LABELS } from "@/features/snippets/languages"
import type { SnippetListItem } from "@/features/snippets/types"
import { cn } from "@/lib/utils"

function timeAgo(date: string) {
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

function useMutation() {
  const [pending, start] = useTransition()

  const run = (
    action: (formData: FormData) => Promise<SnippetMutationState>,
    id: string,
    success: string,
  ) => {
    const formData = new FormData()
    formData.set("id", id)
    start(async () => {
      const result = await action(formData)
      if (result?.error) {
        toast.error(result.error)
      } else if (result?.ok) {
        toast.success(success)
      }
    })
  }

  return { pending, run }
}

export function SnippetCard({
  snippet,
  onEdit,
}: {
  snippet: SnippetListItem
  onEdit: (snippet: SnippetListItem) => void
}) {
  const { run } = useMutation()
  const [confirm, setConfirm] = useState<"trash" | "forever" | null>(null)
  const isTrashed = Boolean(snippet.deletedAt)

  const [favorite, setFavorite] = useState(snippet.isFavorite)
  const [prevFavorite, setPrevFavorite] = useState(snippet.isFavorite)
  const [favoritePending, startFavorite] = useTransition()

  if (prevFavorite !== snippet.isFavorite) {
    setPrevFavorite(snippet.isFavorite)
    setFavorite(snippet.isFavorite)
  }

  const toggleFavorite = () => {
    const next = !favorite
    setFavorite(next)
    const formData = new FormData()
    formData.set("id", snippet.id)
    startFavorite(async () => {
      const result = await toggleSnippetFavorite(formData)
      if (result?.error) {
        setFavorite(snippet.isFavorite)
        toast.error(result.error)
      }
    })
  }

  const [archived, setArchived] = useState(snippet.isArchived)
  const [prevArchived, setPrevArchived] = useState(snippet.isArchived)
  const [archivePending, startArchive] = useTransition()
  const [archiveConfirm, setArchiveConfirm] = useState(false)

  if (prevArchived !== snippet.isArchived) {
    setPrevArchived(snippet.isArchived)
    setArchived(snippet.isArchived)
  }

  const setArchive = (next: boolean) => {
    setArchived(next)
    const formData = new FormData()
    formData.set("id", snippet.id)
    startArchive(async () => {
      const result = await toggleSnippetArchive(formData)
      if (result?.error) {
        setArchived(snippet.isArchived)
        toast.error(result.error)
      } else if (result?.ok) {
        toast.success(
          next ? "Snippet archived" : "Snippet unarchived",
        )
      }
    })
  }

  const handleArchiveItem = () => {
    if (archived) setArchive(false)
    else setArchiveConfirm(true)
  }

  const [shareOpen, setShareOpen] = useState(false)
  const [sharePublic, setSharePublic] = useState(snippet.isPublic)
  const [prevSharePublic, setPrevSharePublic] = useState(snippet.isPublic)
  const [sharePending, startShare] = useTransition()

  if (prevSharePublic !== snippet.isPublic) {
    setPrevSharePublic(snippet.isPublic)
    setSharePublic(snippet.isPublic)
  }

  const toggleShare = (next: boolean) => {
    setSharePublic(next)
    const formData = new FormData()
    formData.set("id", snippet.id)
    formData.set("isPublic", next ? "on" : "off")
    startShare(async () => {
      const result = await toggleSnippetVisibility(formData)
      if (result?.error) {
        setSharePublic(snippet.isPublic)
        toast.error(result.error)
      } else if (result?.ok) {
        toast.success(next ? "Sharing enabled" : "Sharing disabled")
      }
    })
  }

  const shareUrl = snippet.slug
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/share/${snippet.slug}`
    : ""

  const languageLabel = SNIPPET_LANGUAGE_LABELS[snippet.language] ?? snippet.language

  return (
    <article
      data-slot="snippet-card"
      className={cn(
        "group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-4",
        "shadow-card transition-[box-shadow,border-color,transform] duration-200",
        "hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-lifted",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium" title={snippet.title}>
            {snippet.title}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{languageLabel}</p>
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          {!isTrashed && (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={
                      favorite ? "Remove from favorites" : "Add to favorites"
                    }
                    aria-pressed={favorite}
                    disabled={favoritePending}
                    onClick={toggleFavorite}
                    className="hover:bg-amber-500/10 hover:text-amber-500"
                  >
                    <motion.span
                      key={favorite ? "favorite" : "not-favorite"}
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 18,
                      }}
                      className="inline-flex"
                    >
                      <Star
                        className={cn(
                          "size-4",
                          favorite
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground",
                        )}
                      />
                    </motion.span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {favorite ? "Remove from favorites" : "Add to favorites"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {!isTrashed && (
            <Popover open={shareOpen} onOpenChange={setShareOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Share snippet"
                  aria-pressed={sharePublic}
                  className="hover:bg-emerald-500/10 hover:text-emerald-500"
                >
                  <Share2
                    className={cn(
                      "size-4",
                      sharePublic
                        ? "text-emerald-500"
                        : "text-muted-foreground",
                    )}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72">
                <div className="flex items-center justify-between gap-3">
                  <div className="grid gap-0.5">
                    <span className="text-sm font-medium">Public sharing</span>
                    <span className="text-xs text-muted-foreground">
                      {sharePublic
                        ? "Anyone with the link can view"
                        : "Only you can view this snippet"}
                    </span>
                  </div>
                  <Switch
                    checked={sharePublic}
                    disabled={sharePending}
                    onCheckedChange={toggleShare}
                  />
                </div>
                {sharePublic && (
                  <div className="flex items-center gap-2 pt-1">
                    <Input
                      readOnly
                      value={shareUrl}
                      placeholder="Generating link…"
                      aria-label="Share link"
                      className="h-8 font-mono text-xs"
                    />
                    <CopyButton value={shareUrl} />
                  </div>
                )}
              </PopoverContent>
            </Popover>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Snippet actions">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {!isTrashed && (
                <>
                  <DropdownMenuItem onSelect={() => onEdit(snippet)}>
                    <Pencil /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() =>
                      run(duplicateSnippet, snippet.id, "Snippet duplicated")
                    }
                  >
                    <Copy /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    disabled={archivePending}
                    onSelect={handleArchiveItem}
                  >
                    {archived ? <ArchiveRestore /> : <Archive />}
                    {archived ? "Unarchive" : "Archive"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={() => setConfirm("trash")}
                  >
                    <Trash2 /> Delete
                  </DropdownMenuItem>
                </>
              )}

              {isTrashed && (
                <>
                  <DropdownMenuItem
                    onSelect={() =>
                      run(restoreSnippet, snippet.id, "Snippet restored")
                    }
                  >
                    <RotateCcw /> Restore
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={() => setConfirm("forever")}
                  >
                    <X /> Delete forever
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {snippet.description && (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {snippet.description}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-1.5">
        {snippet.tags.map((tag) => (
          <Badge key={tag.id} variant="secondary" className="text-xs">
            {tag.name}
          </Badge>
        ))}
        {snippet.collections.map((collection) => (
          <Badge key={collection.id} variant="outline" className="text-xs">
            {collection.name}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border/60 pt-2.5 text-xs text-muted-foreground">
        <span>{isTrashed ? "In trash" : timeAgo(snippet.updatedAt)}</span>
        {sharePublic && (
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Public
          </span>
        )}
      </div>

      <Dialog
        open={archiveConfirm}
        onOpenChange={setArchiveConfirm}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Archive snippet?</DialogTitle>
            <DialogDescription>
              &ldquo;{snippet.title}&rdquo; will be hidden from the main list. You
              can unarchive it anytime.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setArchiveConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={archivePending}
              onClick={() => {
                setArchiveConfirm(false)
                setArchive(true)
              }}
            >
              <Archive /> Archive
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirm !== null}
        onOpenChange={(open) => {
          if (!open) setConfirm(null)
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {confirm === "forever" ? "Delete permanently?" : "Move to trash?"}
            </DialogTitle>
            <DialogDescription>
              {confirm === "forever"
                ? `"${snippet.title}" will be permanently removed and can't be recovered.`
                : `"${snippet.title}" will be moved to trash. You can restore it later.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirm(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                const action =
                  confirm === "forever" ? deleteSnippetForever : deleteSnippet
                const message =
                  confirm === "forever"
                    ? "Snippet deleted permanently"
                    : "Snippet moved to trash"
                run(action, snippet.id, message)
                setConfirm(null)
              }}
            >
              {confirm === "forever" ? "Delete forever" : "Move to trash"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  )
}
