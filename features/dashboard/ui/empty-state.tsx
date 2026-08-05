import * as React from "react";

import { cn } from "@/lib/utils";
import {
  dashboardBorders,
  dashboardColors,
  dashboardRadius,
  dashboardShadows,
  dashboardTypography,
} from "@/features/dashboard/theme";

function EmptyState({
  icon: Icon,
  title,
  description,
  children,
  className,
}: {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-6 py-12 text-center",
        dashboardRadius.card,
        dashboardBorders.subtleMuted,
        dashboardColors.surface,
        dashboardShadows.soft,
        className,
      )}
    >
      {Icon ? (
        <div
          className={cn(
            "flex size-12 items-center justify-center",
            dashboardRadius.button,
            dashboardColors.primarySoft,
          )}
        >
          <Icon aria-hidden className="size-5" />
        </div>
      ) : null}
      <div className="grid gap-1.5">
        <p className={cn(dashboardTypography.body, dashboardColors.heading, "font-semibold")}>
          {title}
        </p>
        {description ? (
          <p className={cn(dashboardTypography.body, dashboardColors.secondary)}>
            {description}
          </p>
        ) : null}
      </div>
      {children ? (
        <div className="mt-1 flex items-center justify-center gap-2">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export { EmptyState };
