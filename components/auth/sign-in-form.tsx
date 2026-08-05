"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn, type AuthActionState } from "@/features/auth/actions"

const initialState: AuthActionState = null

export function SignInForm() {
  const [state, formAction, pending] = React.useActionState(
    signIn,
    initialState,
  )

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="sign-in-email">Email</Label>
        <Input
          id="sign-in-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(state?.fieldErrors?.email)}
          disabled={pending}
          required
        />
        {state?.fieldErrors?.email?.map((message) => (
          <p key={message} className="text-xs text-destructive" role="alert">
            {message}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="sign-in-password">Password</Label>
        <Input
          id="sign-in-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          aria-invalid={Boolean(state?.fieldErrors?.password)}
          disabled={pending}
          required
        />
        {state?.fieldErrors?.password?.map((message) => (
          <p key={message} className="text-xs text-destructive" role="alert">
            {message}
          </p>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground">
          <input
            type="checkbox"
            name="remember"
            className="size-4 rounded accent-foreground"
          />
          Remember me
        </label>
      </div>

      {state?.error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="w-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lifted active:translate-y-0"
        disabled={pending}
      >
        {pending ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  )
}
