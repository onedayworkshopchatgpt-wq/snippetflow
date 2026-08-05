import { requireUser } from "@/features/auth/session"
import { snippetService } from "@/features/snippets/service"
import { SnippetList } from "@/features/snippets/components/snippet-list"
import { SNIPPET_LANGUAGES } from "@/features/snippets/languages"
import type {
  SnippetFilter,
  SnippetFilters,
  SnippetListItem,
  SnippetSort,
  SnippetVisibility,
} from "@/features/snippets/types"
import type { SnippetWithRelations } from "@/features/snippets/service"

export const metadata = {
  title: "Snippets",
}

const FILTERS: SnippetFilter[] = ["all", "favorites", "archived", "trash"]

const SORTS: SnippetSort[] = ["updated", "created", "oldest", "az", "za"]

function toListItem(snippet: SnippetWithRelations): SnippetListItem {
  return {
    id: snippet.id,
    title: snippet.title,
    description: snippet.description,
    content: snippet.content,
    language: snippet.language,
    isPublic: snippet.isPublic,
    slug: snippet.slug,
    isFavorite: snippet.isFavorite,
    isArchived: snippet.isArchived,
    deletedAt: snippet.deletedAt?.toISOString() ?? null,
    createdAt: snippet.createdAt.toISOString(),
    updatedAt: snippet.updatedAt.toISOString(),
    tags: snippet.tags.map(({ tag }) => ({ id: tag.id, name: tag.name })),
    collections: snippet.collections.map(({ collection }) => ({
      id: collection.id,
      name: collection.name,
    })),
  }
}

export default async function SnippetsPage({
  searchParams,
}: {
  searchParams: Promise<{
    filter?: string
    q?: string
    language?: string
    visibility?: string
    recent?: string
    sort?: string
  }>
}) {
  const user = await requireUser()
  const {
    filter: rawFilter,
    q: rawQuery,
    language: rawLanguage,
    visibility: rawVisibility,
    recent: rawRecent,
    sort: rawSort,
  } = await searchParams
  const filter: SnippetFilter = FILTERS.includes(rawFilter as SnippetFilter)
    ? (rawFilter as SnippetFilter)
    : "all"
  const query = rawQuery?.trim() || undefined
  const language = SNIPPET_LANGUAGES.includes(rawLanguage as (typeof SNIPPET_LANGUAGES)[number])
    ? rawLanguage
    : undefined
  const visibility: SnippetVisibility | undefined =
    rawVisibility === "public" || rawVisibility === "private"
      ? rawVisibility
      : undefined
  const recentlyUpdated = rawRecent === "1"
  const sort: SnippetSort = SORTS.includes(rawSort as SnippetSort)
    ? (rawSort as SnippetSort)
    : "updated"

  const snippets = await snippetService.listSnippets(user.id, filter, {
    query,
    language,
    visibility,
    recentlyUpdated,
    sort,
  })

  const filters: SnippetFilters = { language, visibility, recentlyUpdated }

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:py-10">
      <SnippetList
        snippets={snippets.map(toListItem)}
        filter={filter}
        query={query}
        filters={filters}
        sort={sort}
      />
    </div>
  )
}
