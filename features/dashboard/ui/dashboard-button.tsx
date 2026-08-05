import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  dashboardColors,
  dashboardFocus,
  dashboardRadius,
  dashboardTransitions,
} from "@/features/dashboard/theme";

const dashboardButtonVariants = cva(
  cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 font-medium whitespace-nowrap select-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    dashboardRadius.button,
    dashboardTransitions.base,
    dashboardFocus.ring,
    "active:scale-[0.98]",
  ),
  {
    variants: {
      variant: {
        primary: cn(
          dashboardColors.primary,
          "shadow-sm hover:bg-primary/80 hover:shadow-md",
        ),
        secondary: cn(
          "border border-border bg-transparent text-foreground",
          "hover:bg-muted/60",
        ),
        ghost: "bg-transparent hover:bg-muted/60",
        destructive: cn(
          dashboardColors.error,
          "bg-destructive/10 hover:bg-destructive/20",
        ),
      },
      size: {
        default: "h-9 px-4 text-sm",
        sm: "h-8 px-3 text-sm",
        lg: "h-10 px-5 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function DashboardButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof dashboardButtonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="dashboard-button"
      data-variant={variant}
      data-size={size}
      className={cn(dashboardButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { DashboardButton, dashboardButtonVariants };
