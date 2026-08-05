import type { Metadata } from "next"

import { requireUser } from "@/features/auth/session"
import { snippetService } from "@/features/snippets/service"
import { WorkspaceHome } from "@/features/dashboard/components/workspace-home"
import type { RecentSnippet } from "@/features/dashboard/components/continue-working"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await requireUser()
  const snippets = await snippetService.listSnippets(user.id, "all")

  const recent: RecentSnippet[] = snippets.slice(0, 5).map((snippet) => ({
    id: snippet.id,
    title: snippet.title,
    language: snippet.language,
    createdAt: snippet.createdAt.toISOString(),
    updatedAt: snippet.updatedAt.toISOString(),
  }))

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
      <WorkspaceHome name={user.name} recent={recent} />
    </div>
  )
}
