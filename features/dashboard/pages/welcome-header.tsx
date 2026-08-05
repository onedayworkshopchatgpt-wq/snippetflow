import * as React from "react";

import { cn } from "@/lib/utils";
import {
  dashboardColors,
  dashboardTypography,
} from "@/features/dashboard/theme";

function WelcomeHeader({
  greeting,
  description,
  action,
  className,
}: {
  greeting: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="welcome-header"
      className={cn(
        "flex flex-wrap items-end justify-between gap-4",
        className,
      )}
    >
      <div className="grid gap-1.5">
        <h1
          className={cn(
            dashboardTypography.heading,
            "text-3xl tracking-tight sm:text-[32px]",
            dashboardColors.heading,
          )}
        >
          {greeting}
        </h1>
        {description ? (
          <p className={cn(dashboardTypography.body, dashboardColors.secondary)}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export { WelcomeHeader };
