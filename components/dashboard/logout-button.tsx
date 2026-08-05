"use client"

import * as React from "react"
import { useTransition } from "react"
import { Loader2, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { signOut } from "@/features/auth/actions"

export function LogoutButton() {
  const [open, setOpen] = React.useState(false)
  const [pending, startTransition] = useTransition()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2.5 rounded-lg px-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted/60 hover:text-foreground"
        >
          <LogOut className="size-4 shrink-0" aria-hidden />
          Logout
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log out of SnippetFlow?</DialogTitle>
          <DialogDescription>
            You&apos;ll need to sign in again to access your snippets.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={pending}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={pending}
            onClick={() => {
              startTransition(() => {
                signOut()
              })
            }}
          >
            {pending ? (
              <Loader2 className="animate-spin" aria-hidden />
            ) : (
              <LogOut className="size-4" aria-hidden />
            )}
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
