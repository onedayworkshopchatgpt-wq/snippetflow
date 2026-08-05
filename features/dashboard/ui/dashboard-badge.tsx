import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  dashboardColors,
  dashboardRadius,
} from "@/features/dashboard/theme";

const dashboardBadgeVariants = cva(
  cn(
    "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1",
    "px-2 text-xs font-medium whitespace-nowrap",
    dashboardRadius.badge,
  ),
  {
    variants: {
      variant: {
        default: cn(dashboardColors.primary),
        secondary: cn(
          "bg-secondary/40 text-secondary-foreground",
        ),
        outline: cn("border border-border text-foreground"),
        success: cn(
          dashboardColors.success,
          "bg-success/10",
        ),
        warning: cn(
          dashboardColors.warning,
          "bg-warning/10",
        ),
        error: cn(
          dashboardColors.error,
          "bg-destructive/10",
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function DashboardBadge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof dashboardBadgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="dashboard-badge"
      data-variant={variant}
      className={cn(dashboardBadgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { DashboardBadge, dashboardBadgeVariants };
