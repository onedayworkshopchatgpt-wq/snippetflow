import * as React from "react";

import { DashboardButton, SectionContainer } from "@/features/dashboard/ui";
import { DashboardShell } from "@/features/dashboard/layout";
import { WelcomeHeader } from "./welcome-header";
import { QuickActions } from "./quick-actions";
import { ContinueWorking } from "./continue-working";
import { RecentActivity } from "./recent-activity";
import { Collections } from "./collections";
import { HelpfulResources } from "./helpful-resources";

function DashboardHome() {
  return (
    <DashboardShell>
      <SectionContainer>
        <WelcomeHeader
          greeting="Welcome back, Dev User"
          description="Pick up where you left off or start something new."
          action={
            <DashboardButton>
              New Snippet
            </DashboardButton>
          }
        />
        <QuickActions />
        <div className="grid gap-6 lg:grid-cols-2">
          <ContinueWorking />
          <RecentActivity />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Collections />
          <HelpfulResources />
        </div>
      </SectionContainer>
    </DashboardShell>
  );
}

export { DashboardHome };
