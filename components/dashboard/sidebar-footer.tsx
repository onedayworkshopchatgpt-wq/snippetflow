"use client"

import { Settings } from "lucide-react"

import { LogoutButton } from "./logout-button"
import { NavigationItem } from "./navigation-item"

export function SidebarFooter() {
  return (
    <div className="shrink-0 border-t border-border/60 p-3">
      <div className="flex flex-col gap-0.5">
        <NavigationItem href="/dashboard/settings" icon={Settings}>
          Settings
        </NavigationItem>
        <LogoutButton />
      </div>
    </div>
  )
}
