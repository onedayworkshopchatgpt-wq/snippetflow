import Link from "next/link"
import { Braces, Check, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SignInForm } from "@/components/auth/sign-in-form"

const FEATURE_BULLETS = [
  "Organize every snippet with tags and collections",
  "Find any snippet in milliseconds with instant search",
  "Share code securely with controlled visibility",
]

export default function SignInPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden border-r border-border/60 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/15 via-primary/5 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-md transition-opacity duration-200 hover:opacity-80 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            aria-label="SnippetFlow home"
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background transition-transform duration-200 group-hover:scale-105">
              <Braces className="size-4" aria-hidden />
            </span>
            <span className="font-heading text-sm font-semibold tracking-tight">
              SnippetFlow
            </span>
          </Link>
        </div>

        <div className="relative max-w-md">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3 text-primary" aria-hidden />
            Welcome back
          </p>
          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">
            Your snippets, right where you left them.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Sign in to access your library, collections, and shared snippets.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {FEATURE_BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <Check className="size-3" aria-hidden />
                </span>
                <span className="text-sm text-foreground">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-muted-foreground">
          © {new Date().getFullYear()} SnippetFlow. All rights reserved.
        </p>
      </aside>

      <div className="flex items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-[420px] animate-fade-in motion-reduce:animate-none">
          <div className="mb-8 flex flex-col items-center text-center lg:hidden">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-md transition-opacity duration-200 hover:opacity-80 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              aria-label="SnippetFlow home"
            >
              <span className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background transition-transform duration-200 group-hover:scale-105">
                <Braces className="size-4" aria-hidden />
              </span>
              <span className="font-heading text-sm font-semibold tracking-tight">
                SnippetFlow
              </span>
            </Link>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-float backdrop-blur-xl transition-all duration-300 supports-[backdrop-filter]:bg-card/60 hover:shadow-lifted sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Sign In
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Welcome back to SnippetFlow.
            </p>

            <div className="mt-6">
              <SignInForm />
            </div>

            <div className="my-6 flex items-center gap-3" aria-hidden>
              <span className="h-px flex-1 bg-border/60" />
              <span className="text-xs text-muted-foreground">or</span>
              <span className="h-px flex-1 bg-border/60" />
            </div>

            <Button
              asChild
              variant="outline"
              className="w-full transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/40 active:translate-y-0"
            >
              <Link href="/">Back to Home</Link>
            </Button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="rounded-md font-medium text-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
