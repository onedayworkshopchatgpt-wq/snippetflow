import * as React from "react";

import { cn } from "@/lib/utils";
import {
  dashboardBorders,
  dashboardColors,
  dashboardRadius,
  dashboardShadows,
  dashboardTransitions,
} from "@/features/dashboard/theme";

function DashboardCard({
  className,
  interactive = false,
  ...props
}: React.ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      data-slot="dashboard-card"
      className={cn(
        dashboardRadius.card,
        dashboardBorders.subtle,
        dashboardColors.surface,
        dashboardShadows.soft,
        "p-6",
        interactive &&
          cn(
            dashboardTransitions.base,
            dashboardShadows.hoverElevation,
            "hover:border-border/80",
          ),
        className,
      )}
      {...props}
    />
  );
}

export { DashboardCard };
