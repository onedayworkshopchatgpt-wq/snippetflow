import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { DashboardInput } from "./dashboard-input";
import { dashboardColors } from "@/features/dashboard/theme";

function SearchInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div className={cn("relative", className)}>
      <Search
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2",
          dashboardColors.secondary,
        )}
      />
      <DashboardInput
        type="search"
        aria-label="Search"
        role="searchbox"
        className="pl-9"
        {...props}
      />
    </div>
  );
}

export { SearchInput };
