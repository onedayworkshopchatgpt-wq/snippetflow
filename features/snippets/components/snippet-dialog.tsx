"use client"

import * as React from "react"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import {
  createSnippet,
  updateSnippet,
  type SnippetFormState,
} from "@/features/snippets/actions"
import type { SnippetListItem } from "@/features/snippets/types"
import { CodeEditor } from "./code-editor"
import { EditorToolbar } from "./editor-toolbar"

const initialState: SnippetFormState = null

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null
  return (
    <p role="alert" className="text-xs text-destructive">
      {errors[0]}
    </p>
  )
}

function SnippetForm({
  snippet,
  onDone,
}: {
  snippet: SnippetListItem | null
  onDone: () => void
}) {
  const isEdit = Boolean(snippet)
  const [isPublic, setIsPublic] = useState(snippet?.isPublic ?? false)
  const [language, setLanguage] = useState(snippet?.language ?? "plaintext")
  const [content, setContent] = useState(snippet?.content ?? "")

  const [state, formAction, pending] = useActionState(
    isEdit ? updateSnippet : createSnippet,
    initialState,
  )

  useEffect(() => {
    if (state?.snippetId) {
      toast.success(isEdit ? "Snippet updated" : "Snippet created")
      onDone()
    } else if (state?.error) {
      toast.error(state.error)
    }
  }, [state, isEdit, onDone])

  return (
    <form action={formAction} className="grid gap-4">
      {snippet && <input type="hidden" name="id" value={snippet.id} />}

      <div className="grid gap-1.5">
        <Label htmlFor="snippet-title">Title</Label>
        <Input
          id="snippet-title"
          name="title"
          defaultValue={snippet?.title ?? ""}
          placeholder="useToggle hook"
          autoFocus
        />
        <FieldError errors={state?.fieldErrors?.title} />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="snippet-description">Description</Label>
        <Input
          id="snippet-description"
          name="description"
          defaultValue={snippet?.description ?? ""}
          placeholder="What does this snippet do?"
        />
        <FieldError errors={state?.fieldErrors?.description} />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="snippet-language">Code</Label>
        <CodeEditor
          value={content}
          onChange={setContent}
          language={language}
          name="content"
          placeholder="Paste your code here…"
          toolbar={(controls) => (
            <EditorToolbar
              language={language}
              onLanguageChange={setLanguage}
              code={content}
              selectId="snippet-language"
              {...controls}
            />
          )}
        />
        <input type="hidden" name="language" value={language} />
        <FieldError errors={state?.fieldErrors?.language} />
        <FieldError errors={state?.fieldErrors?.content} />
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/40 px-3 py-2.5">
        <div className="grid gap-0.5">
          <p className="text-sm leading-none font-medium">Public</p>
          <p className="text-xs text-muted-foreground">
            Anyone with the link can view
          </p>
        </div>
        <Switch
          checked={isPublic}
          onCheckedChange={setIsPublic}
          aria-label="Make snippet public"
        />
        <input type="hidden" name="isPublic" value={isPublic ? "on" : "off"} />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={pending}>
          {pending
            ? "Saving\u2026"
            : isEdit
              ? "Save changes"
              : "Create snippet"}
        </Button>
      </DialogFooter>
    </form>
  )
}

export function SnippetDialog({
  snippet,
  open,
  onOpenChange,
}: {
  snippet: SnippetListItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const isEdit = Boolean(snippet)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit snippet" : "New snippet"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Make changes to your snippet."
              : "Store a new snippet in your library."}
          </DialogDescription>
        </DialogHeader>

        <SnippetForm
          key={snippet?.id ?? "create"}
          snippet={snippet}
          onDone={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
