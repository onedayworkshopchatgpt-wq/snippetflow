import * as React from "react";
import {
  Bookmark,
  ChevronsUpDown,
  Clock,
  Command,
  Folder,
  Home,
  MoreHorizontal,
  Settings,
  Tag,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DashboardDivider,
  IconButton,
} from "@/features/dashboard/ui";
import {
  dashboardColors,
  dashboardFocus,
  dashboardHover,
  dashboardRadius,
  dashboardTransitions,
  dashboardTypography,
} from "@/features/dashboard/theme";

const NAV_ITEMS = [
  { label: "Home", icon: Home },
  { label: "Recent", icon: Clock },
  { label: "Collections", icon: Bookmark },
  { label: "Resources", icon: Folder },
  { label: "Settings", icon: Settings },
] as const;

const TAGS = [
  { label: "Work", count: 12 },
  { label: "Personal", count: 8 },
  { label: "Ideas", count: 5 },
] as const;

function SidebarItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      data-slot="sidebar-item"
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex h-10 cursor-default items-center gap-3 rounded-lg px-3 text-sm",
        dashboardRadius.button,
        dashboardTransitions.theme,
        active
          ? "bg-primary/10 font-medium text-primary"
          : cn(
              dashboardColors.secondary,
              dashboardHover.surface,
              "hover:text-foreground",
            ),
      )}
    >
      {active ? (
        <span
          aria-hidden
          className="absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary"
        />
      ) : null}
      <Icon aria-hidden className="size-[18px] shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  );
}

function WorkspaceSwitcher() {
  return (
    <div
      data-slot="workspace-switcher"
      className={cn(
        "flex h-14 cursor-default items-center gap-3 rounded-lg px-2.5",
        dashboardColors.secondary,
        dashboardHover.surface,
      )}
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center",
          dashboardRadius.button,
          "bg-gradient-to-br from-primary/25 to-primary/5 text-primary",
        )}
      >
        <Command aria-hidden className="size-[18px]" />
      </div>
      <div className="grid min-w-0 flex-1 gap-0.5">
        <span className={cn("truncate text-sm font-semibold", dashboardColors.heading)}>
          My Workspace
        </span>
        <span className={cn("truncate text-xs", dashboardColors.caption)}>
          Personal
        </span>
      </div>
      <ChevronsUpDown aria-hidden className="size-4 shrink-0 opacity-60" />
    </div>
  );
}

function UserFooter() {
  return (
    <div data-slot="user-footer" className={cn("flex h-12 items-center gap-3")}>
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center ring-1 ring-border",
          dashboardRadius.button,
          "bg-gradient-to-br from-primary/20 to-primary/5",
          dashboardColors.heading,
        )}
      >
        <User aria-hidden className="size-4" />
      </div>
      <div className="grid min-w-0 flex-1 gap-0">
        <span className={cn("truncate text-sm font-medium", dashboardColors.heading)}>
          Dev User
        </span>
        <span className={cn("truncate text-xs", dashboardColors.caption)}>
          dev@snippetflow.local
        </span>
      </div>
      <IconButton aria-label="Account menu" className="size-8">
        <MoreHorizontal aria-hidden />
      </IconButton>
    </div>
  );
}

function DashboardSidebar({
  className,
  ...props
}: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="dashboard-sidebar"
      className={cn(
        "flex h-full w-72 shrink-0 flex-col border-r border-border/60",
        dashboardColors.glass,
        className,
      )}
      {...props}
    >
      <div className="px-4 pt-6 pb-4">
        <WorkspaceSwitcher />
      </div>

      <nav className="grid gap-0.5 px-3" aria-label="Navigation">
        {NAV_ITEMS.map((item, index) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={index === 0}
          />
        ))}
      </nav>

      <DashboardDivider className="mx-4 my-4" />

      <div className="grid gap-0.5 px-3">
        <span
          className={cn(
            "px-3 pb-1.5 text-xs font-medium tracking-wide uppercase",
            dashboardTypography.caption,
            dashboardColors.caption,
          )}
        >
          Tags
        </span>
        {TAGS.map((tag) => (
          <div
            key={tag.label}
            className={cn(
              "flex h-8 cursor-default items-center gap-2.5 px-3 text-sm",
              dashboardRadius.button,
              dashboardColors.secondary,
              dashboardHover.surface,
            )}
          >
            <Tag aria-hidden className="size-3.5 shrink-0 opacity-70" />
            <span className="truncate">{tag.label}</span>
            <span className={cn("ml-auto text-xs tabular-nums", dashboardColors.caption)}>
              {tag.count}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-border/60 p-4" aria-label="Account">
        <UserFooter />
      </div>
    </aside>
  );
}

export { DashboardSidebar };
