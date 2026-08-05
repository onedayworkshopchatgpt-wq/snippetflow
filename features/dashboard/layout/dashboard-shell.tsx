import * as React from "react";

import { cn } from "@/lib/utils";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";
import { Workspace } from "./workspace";
import { dashboardColors } from "@/features/dashboard/theme";

function DashboardShell({
  sidebar,
  topbar,
  children,
  className,
}: {
  sidebar?: React.ReactNode;
  topbar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="dashboard-shell"
      className={cn(
        "relative flex h-dvh min-h-0 w-full overflow-hidden",
        dashboardColors.background,
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(96,165,250,0.08),transparent)]"
      />
      {sidebar ?? <DashboardSidebar />}
      <div className="relative flex min-w-0 flex-1 flex-col">
        {topbar ?? <DashboardTopbar />}
        <Workspace>{children}</Workspace>
      </div>
    </div>
  );
}

export { DashboardShell };
