"use server"

import { revalidatePath } from "next/cache"

import { requireUser } from "@/features/auth/session"
import {
  createSnippetSchema,
  snippetIdSchema,
  updateSnippetSchema,
} from "./schemas"
import { snippetService } from "./service"

export type SnippetFormState = {
  error?: string
  fieldErrors?: Record<string, string[] | undefined>
  snippetId?: string
} | null

export type SnippetMutationState = {
  ok?: boolean
  error?: string
} | null

export type SnippetExportState = {
  ok?: boolean
  json?: string
  error?: string
} | null

async function requireUserId() {
  const user = await requireUser()
  return user.id
}

function parseId(raw: FormDataEntryValue | null) {
  const parsed = snippetIdSchema.safeParse(String(raw ?? ""))
  return parsed.success ? parsed.data : null
}

function message(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

export async function createSnippet(
  _prevState: SnippetFormState,
  formData: FormData,
): Promise<SnippetFormState> {
  const userId = await requireUserId()

  const parsed = createSnippetSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    language: formData.get("language"),
    isPublic: formData.get("isPublic") === "on",
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  try {
    const snippet = await snippetService.createSnippet(userId, parsed.data)
    revalidatePath("/snippets")
    return { snippetId: snippet.id }
  } catch (error) {
    return { error: message(error, "Failed to create snippet") }
  }
}

export async function updateSnippet(
  _prevState: SnippetFormState,
  formData: FormData,
): Promise<SnippetFormState> {
  const userId = await requireUserId()

  const parsed = updateSnippetSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    language: formData.get("language"),
    isPublic: formData.get("isPublic") === "on",
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  try {
    const snippet = await snippetService.updateSnippet(userId, parsed.data)
    revalidatePath("/snippets")
    return { snippetId: snippet.id }
  } catch (error) {
    return { error: message(error, "Failed to update snippet") }
  }
}

export async function deleteSnippet(
  formData: FormData,
): Promise<SnippetMutationState> {
  const userId = await requireUserId()
  const id = parseId(formData.get("id"))
  if (!id) return { error: "Invalid snippet id" }

  try {
    await snippetService.deleteSnippet(userId, id)
    revalidatePath("/snippets")
    return { ok: true }
  } catch (error) {
    return { error: message(error, "Failed to delete snippet") }
  }
}

export async function restoreSnippet(
  formData: FormData,
): Promise<SnippetMutationState> {
  const userId = await requireUserId()
  const id = parseId(formData.get("id"))
  if (!id) return { error: "Invalid snippet id" }

  try {
    await snippetService.restoreSnippet(userId, id)
    revalidatePath("/snippets")
    return { ok: true }
  } catch (error) {
    return { error: message(error, "Failed to restore snippet") }
  }
}

export async function deleteSnippetForever(
  formData: FormData,
): Promise<SnippetMutationState> {
  const userId = await requireUserId()
  const id = parseId(formData.get("id"))
  if (!id) return { error: "Invalid snippet id" }

  try {
    await snippetService.deleteSnippetForever(userId, id)
    revalidatePath("/snippets")
    return { ok: true }
  } catch (error) {
    return { error: message(error, "Failed to delete snippet permanently") }
  }
}

export async function duplicateSnippet(
  formData: FormData,
): Promise<SnippetMutationState> {
  const userId = await requireUserId()
  const id = parseId(formData.get("id"))
  if (!id) return { error: "Invalid snippet id" }

  try {
    await snippetService.duplicateSnippet(userId, id)
    revalidatePath("/snippets")
    return { ok: true }
  } catch (error) {
    return { error: message(error, "Failed to duplicate snippet") }
  }
}

export async function toggleSnippetFavorite(
  formData: FormData,
): Promise<SnippetMutationState> {
  const userId = await requireUserId()
  const id = parseId(formData.get("id"))
  if (!id) return { error: "Invalid snippet id" }

  try {
    await snippetService.toggleFavorite(userId, id)
    revalidatePath("/snippets")
    return { ok: true }
  } catch (error) {
    return { error: message(error, "Failed to update snippet") }
  }
}

export async function toggleSnippetArchive(
  formData: FormData,
): Promise<SnippetMutationState> {
  const userId = await requireUserId()
  const id = parseId(formData.get("id"))
  if (!id) return { error: "Invalid snippet id" }

  try {
    await snippetService.toggleArchive(userId, id)
    revalidatePath("/snippets")
    return { ok: true }
  } catch (error) {
    return { error: message(error, "Failed to update snippet") }
  }
}

export async function toggleSnippetVisibility(
  formData: FormData,
): Promise<SnippetMutationState> {
  const userId = await requireUserId()
  const id = parseId(formData.get("id"))
  if (!id) return { error: "Invalid snippet id" }
  const isPublic =
    formData.get("isPublic") === "on" || formData.get("isPublic") === "true"

  try {
    await snippetService.setVisibility(userId, id, isPublic)
    revalidatePath("/snippets")
    return { ok: true }
  } catch (error) {
    return { error: message(error, "Failed to update sharing") }
  }
}

export async function exportSnippets(
  formData: FormData,
): Promise<SnippetExportState> {
  const userId = await requireUserId()
  const scope = formData.get("scope")
  if (scope !== "all" && scope !== "favorites" && scope !== "archived") {
    return { error: "Invalid export scope" }
  }

  try {
    const data = await snippetService.getSnippetsExport(userId, scope)
    return { ok: true, json: JSON.stringify(data, null, 2) }
  } catch (error) {
    return { error: message(error, "Failed to export snippets") }
  }
}
