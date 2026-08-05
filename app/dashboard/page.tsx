import type { Metadata } from "next"

import { requireUser } from "@/features/auth/session"
import { snippetService } from "@/features/snippets/service"
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview"
import type { RecentSnippet } from "@/features/dashboard/components/recent-snippets"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await requireUser()
  const stats = await snippetService.getDashboardStats(user.id)
  const snippets = await snippetService.listSnippets(user.id, "all")

  const recent: RecentSnippet[] = snippets.slice(0, 5).map((snippet) => ({
    id: snippet.id,
    title: snippet.title,
    language: snippet.language,
    createdAt: snippet.createdAt.toISOString(),
    updatedAt: snippet.updatedAt.toISOString(),
  }))

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:py-10">
      <DashboardOverview name={user.name} stats={stats} recent={recent} />
    </div>
  )
}
