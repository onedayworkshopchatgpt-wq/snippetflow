// Dashboard-only design tokens.
//
// Reuses the existing Tailwind theme primitives (globals.css CSS variables).
// These tokens are composed into class strings so future Dashboard components
// can consume them directly. No new global CSS is introduced here.

export const dashboardColors = {
  // Surfaces
  background: "bg-background text-foreground",
  surface: "bg-card text-card-foreground",
  surfaceMuted: "bg-muted text-muted-foreground",
  elevated: "bg-popover text-popover-foreground shadow-popover",
  glass: "bg-card/70 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60",

  // Text
  heading: "text-foreground",
  body: "text-foreground",
  secondary: "text-muted-foreground",
  caption: "text-muted-foreground",

  // Accent
  primary: "bg-primary text-primary-foreground",
  primarySoft: "bg-primary/10 text-primary",

  // Semantic
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
} as const;

export const dashboardRadius = {
  card: "rounded-[16px]",
  button: "rounded-[12px]",
  input: "rounded-[12px]",
  badge: "rounded-full",
} as const;

export const dashboardShadows = {
  soft: "shadow-card",
  hover: "shadow-lifted",
  elevated: "shadow-popover",
  hoverElevation: "hover:-translate-y-0.5 hover:shadow-lifted",
} as const;

export const dashboardBorders = {
  subtle: "border border-border",
  subtleMuted: "border border-border/60",
} as const;

// One spacing scale: 4 8 12 16 20 24 32 40 48. No arbitrary values.
export const dashboardSpacing = [4, 8, 12, 16, 20, 24, 32, 40, 48] as const;

export type DashboardSpacing = (typeof dashboardSpacing)[number];
