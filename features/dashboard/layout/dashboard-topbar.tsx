import * as React from "react";
import { Import, Moon, Plus, User } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DashboardButton,
  IconButton,
  NotificationButton,
  SearchInput,
} from "@/features/dashboard/ui";
import {
  dashboardBorders,
  dashboardColors,
  dashboardFocus,
  dashboardRadius,
} from "@/features/dashboard/theme";

function AvatarPlaceholder() {
  return (
    <div
      data-slot="avatar-placeholder"
      aria-label="Avatar"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center ring-1 ring-border",
        dashboardRadius.button,
        "bg-gradient-to-br from-primary/20 to-primary/5",
        dashboardColors.heading,
        dashboardFocus.ring,
      )}
    >
      <User aria-hidden className="size-4" />
    </div>
  );
}

function DashboardTopbar({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="dashboard-topbar"
      className={cn(
        "sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 px-6",
        dashboardBorders.subtle,
        "border-x-0 border-t-0",
        dashboardColors.glass,
        className,
      )}
      {...props}
    >
      <SearchInput
        className="w-full max-w-md"
        placeholder="Search snippets, collections, tags..."
      />

      <div className="ml-auto flex items-center gap-2.5">
        <DashboardButton variant="secondary" size="sm">
          <Import aria-hidden className="size-4" />
          Import
        </DashboardButton>
        <DashboardButton size="sm">
          <Plus aria-hidden className="size-4" />
          New Snippet
        </DashboardButton>

        <div aria-hidden className="mx-1 h-5 w-px bg-border" />

        <IconButton aria-label="Toggle theme">
          <Moon aria-hidden />
        </IconButton>
        <NotificationButton count={3} />
        <AvatarPlaceholder />
      </div>
    </header>
  );
}

export { DashboardTopbar };
