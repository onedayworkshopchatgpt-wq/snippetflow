import "server-only"

import { prisma } from "@/lib/prisma"
import type { Prisma } from "@prisma/client"
import type { SnippetSort } from "./types"

export type SnippetFilter = "all" | "favorites" | "archived" | "trash"

const snippetInclude = {
  tags: {
    select: { tag: { select: { id: true, name: true } } },
  },
  collections: {
    select: { collection: { select: { id: true, name: true } } },
  },
} satisfies Prisma.SnippetInclude

export type SnippetWithRelations = Prisma.SnippetGetPayload<{
  include: typeof snippetInclude
}>

type CreateData = {
  title: string
  description: string | null
  content: string
  language: string
  isPublic: boolean
  isFavorite?: boolean
  isArchived?: boolean
  slug?: string | null
}

type UpdateData = Omit<CreateData, "isFavorite" | "isArchived">

function filterWhere(userId: string, filter: SnippetFilter): Prisma.SnippetWhereInput {
  switch (filter) {
    case "favorites":
      return { userId, deletedAt: null, isArchived: false, isFavorite: true }
    case "archived":
      return { userId, deletedAt: null, isArchived: true }
    case "trash":
      return { userId, deletedAt: { not: null } }
    default:
      return { userId, deletedAt: null, isArchived: false }
  }
}

function searchWhere(query: string): Prisma.SnippetWhereInput {
  return {
    OR: [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { language: { contains: query, mode: "insensitive" } },
      {
        tags: {
          some: { tag: { name: { contains: query, mode: "insensitive" } } },
        },
      },
    ],
  }
}

export type SnippetFilterOptions = {
  query?: string
  language?: string
  visibility?: "public" | "private"
  recentlyUpdated?: boolean
  sort?: SnippetSort
}

const RECENTLY_UPDATED_DAYS = 7

function recentWhere(): Prisma.SnippetWhereInput {
  const since = new Date(
    Date.now() - RECENTLY_UPDATED_DAYS * 24 * 60 * 60 * 1000,
  )
  return { updatedAt: { gte: since } }
}

const SORT_ORDER: Record<
  SnippetSort,
  Prisma.SnippetOrderByWithRelationInput[]
> = {
  updated: [{ isFavorite: "desc" }, { updatedAt: "desc" }],
  created: [{ isFavorite: "desc" }, { createdAt: "desc" }],
  oldest: [{ isFavorite: "desc" }, { createdAt: "asc" }],
  az: [{ isFavorite: "desc" }, { title: "asc" }],
  za: [{ isFavorite: "desc" }, { title: "desc" }],
}

export const snippetRepository = {
  findMany(
    userId: string,
    filter: SnippetFilter,
    options: SnippetFilterOptions = {},
  ) {
    const conditions: Prisma.SnippetWhereInput[] = [filterWhere(userId, filter)]
    if (options.query) conditions.push(searchWhere(options.query))
    if (options.language) conditions.push({ language: options.language })
    if (options.visibility) {
      conditions.push({ isPublic: options.visibility === "public" })
    }
    if (options.recentlyUpdated) conditions.push(recentWhere())

    return prisma.snippet.findMany({
      where:
        conditions.length === 1 ? conditions[0] : { AND: conditions },
      include: snippetInclude,
      orderBy: SORT_ORDER[options.sort ?? "updated"],
    })
  },

  findById(userId: string, id: string) {
    return prisma.snippet.findFirst({
      where: { id, userId },
      include: snippetInclude,
    })
  },

  findPublicBySlug(slug: string) {
    return prisma.snippet.findFirst({
      where: { slug, isPublic: true, deletedAt: null },
      include: snippetInclude,
    })
  },

  create(userId: string, data: CreateData) {
    return prisma.snippet.create({
      data: { ...data, userId },
    })
  },

  update(userId: string, id: string, data: UpdateData) {
    return prisma.snippet.update({
      where: { id, userId },
      data,
    })
  },

  softDelete(userId: string, id: string) {
    return prisma.snippet.update({
      where: { id, userId },
      data: { deletedAt: new Date() },
    })
  },

  restore(userId: string, id: string) {
    return prisma.snippet.update({
      where: { id, userId },
      data: { deletedAt: null },
    })
  },

  deleteForever(userId: string, id: string) {
    return prisma.snippet.delete({
      where: { id, userId },
    })
  },

  setFavorite(userId: string, id: string, isFavorite: boolean) {
    return prisma.snippet.update({
      where: { id, userId },
      data: { isFavorite },
    })
  },

  setArchived(userId: string, id: string, isArchived: boolean) {
    return prisma.snippet.update({
      where: { id, userId },
      data: { isArchived },
    })
  },

  setPublic(
    userId: string,
    id: string,
    data: { isPublic: boolean; slug: string | null },
  ) {
    return prisma.snippet.update({
      where: { id, userId },
      data,
    })
  },

  stats(userId: string) {
    return Promise.all([
      prisma.snippet.count({ where: { userId, deletedAt: null, isArchived: false } }),
      prisma.snippet.count({
        where: { userId, deletedAt: null, isArchived: false, isFavorite: true },
      }),
      prisma.snippet.count({
        where: { userId, deletedAt: null, isArchived: false, isPublic: true },
      }),
      prisma.snippet.count({ where: { userId, deletedAt: null, isArchived: true } }),
      prisma.snippet.count({ where: { userId, deletedAt: { not: null } } }),
      prisma.collection.count({ where: { userId } }),
      prisma.tag.count({ where: { userId } }),
    ])
  },
}
