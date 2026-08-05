"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  hint,
  href,
  icon: Icon,
  iconClass,
}: {
  label: string
  value: number
  hint?: string
  href: string
  icon: LucideIcon
  iconClass?: string
}) {
  return (
    <Link
      href={href}
      className="group block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="h-full transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lifted">
        <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-3">
          <div className="grid gap-0.5">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {label}
            </CardTitle>
            <p className="font-heading text-3xl font-semibold tracking-tight">
              {value}
            </p>
          </div>
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-lg",
              iconClass,
            )}
          >
            <Icon className="size-4" />
          </div>
        </CardHeader>
        {hint && (
          <CardContent className="pt-1">
            <p className="text-xs text-muted-foreground">{hint}</p>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
