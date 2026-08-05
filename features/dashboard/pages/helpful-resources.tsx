import * as React from "react";
import { ArrowUpRight, BookOpen, Keyboard, PenLine } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DashboardCard,
  SectionHeader,
} from "@/features/dashboard/ui";
import {
  dashboardColors,
  dashboardHover,
  dashboardRadius,
  dashboardTransitions,
  dashboardTypography,
} from "@/features/dashboard/theme";

const RESOURCES = [
  {
    icon: BookOpen,
    label: "Getting started with SnippetFlow",
  },
  {
    icon: Keyboard,
    label: "Keyboard shortcuts",
  },
  {
    icon: PenLine,
    label: "Write better snippets",
  },
] as const;

function HelpfulResources({
  className,
}: {
  className?: string;
}) {
  return (
    <DashboardCard className={cn("flex flex-col gap-5", className)}>
      <SectionHeader title="Helpful Resources" description="Learn the essentials" />
      <ul className="flex flex-col gap-1">
        {RESOURCES.map((resource) => (
          <li
            key={resource.label}
            className={cn(
              "group flex h-11 cursor-pointer items-center gap-3 px-3",
              dashboardRadius.button,
              dashboardColors.secondary,
              dashboardHover.surface,
              dashboardTransitions.theme,
              "hover:text-foreground",
            )}
          >
            <resource.icon
              aria-hidden
              className="size-4 shrink-0 text-primary transition-colors duration-200 group-hover:opacity-80"
            />
            <span className={cn("truncate text-sm", dashboardTypography.body)}>
              {resource.label}
            </span>
            <ArrowUpRight
              aria-hidden
              className="ml-auto size-4 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-60"
            />
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}

export { HelpfulResources };
