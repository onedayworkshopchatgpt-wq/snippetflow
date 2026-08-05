import type { Metadata } from "next"
import Link from "next/link"
import { Folder } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state"
import { WorkspaceHeader } from "@/components/dashboard/workspace-header"

export const metadata: Metadata = {
  title: "Collections",
}

export default function CollectionsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <WorkspaceHeader
        title="Collections"
        description="Group related snippets together for fast access."
      />

      <DashboardEmptyState
        icon={Folder}
        title="No collections yet"
        description="Create a collection to organize your snippets by project or theme."
      >
        <Button asChild variant="outline">
          <Link href="/dashboard/snippets">Browse snippets</Link>
        </Button>
      </DashboardEmptyState>
    </div>
  )
}
