import * as React from "react";

import { cn } from "@/lib/utils";
import {
  dashboardColors,
  dashboardFocus,
  dashboardRadius,
  dashboardTransitions,
} from "@/features/dashboard/theme";

function DashboardInput({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="dashboard-input"
      className={cn(
        "h-9 w-full min-w-0 border border-border px-3 text-sm",
        dashboardRadius.input,
        "bg-muted/40",
        dashboardColors.body,
        "placeholder:text-muted-foreground",
        dashboardTransitions.theme,
        dashboardFocus.ring,
        "hover:bg-muted/50 focus-visible:bg-muted/50",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&::-webkit-search-cancel-button]:hidden",
        className,
      )}
      {...props}
    />
  );
}

export { DashboardInput };
