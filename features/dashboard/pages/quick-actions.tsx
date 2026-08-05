import * as React from "react";
import { ArrowUpRight, FolderPlus, Import, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DashboardCard,
  SectionContainer,
  SectionHeader,
} from "@/features/dashboard/ui";
import {
  dashboardColors,
  dashboardRadius,
  dashboardTransitions,
  dashboardTypography,
} from "@/features/dashboard/theme";

const ACTIONS = [
  {
    label: "New Snippet",
    description: "Create a snippet from scratch",
    icon: Plus,
  },
  {
    label: "New Collection",
    description: "Group snippets into a collection",
    icon: FolderPlus,
  },
  {
    label: "Import Snippets",
    description: "Bring in snippets from elsewhere",
    icon: Import,
  },
] as const;

function QuickActions({
  className,
}: {
  className?: string;
}) {
  return (
    <SectionContainer className={className}>
      <SectionHeader
        title="Quick Actions"
        description="Start something new"
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {ACTIONS.map((action) => (
          <DashboardCard
            key={action.label}
            interactive
            className="group flex cursor-pointer flex-col gap-4 p-5"
          >
            <div
              className={cn(
                "flex size-12 items-center justify-center",
                dashboardRadius.button,
                "bg-gradient-to-br from-primary/25 to-primary/5 text-primary",
                dashboardTransitions.base,
                "group-hover:scale-105",
              )}
            >
              <action.icon aria-hidden className="size-5" />
            </div>
            <div className="grid gap-1">
              <p
                className={cn(
                  dashboardTypography.body,
                  dashboardColors.heading,
                  "font-semibold",
                )}
              >
                {action.label}
              </p>
              <p className={cn(dashboardTypography.body, dashboardColors.secondary)}>
                {action.description}
              </p>
            </div>
            <span
              aria-hidden
              className={cn(
                "mt-auto inline-flex items-center gap-1 text-sm font-medium",
                dashboardColors.primarySoft,
                dashboardTransitions.base,
                "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100",
              )}
            >
              Open
              <ArrowUpRight className="size-3.5" />
            </span>
          </DashboardCard>
        ))}
      </div>
    </SectionContainer>
  );
}

export { QuickActions };
