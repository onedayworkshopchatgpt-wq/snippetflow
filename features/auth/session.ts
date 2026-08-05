import "server-only";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/server";
import { syncUserWithPrisma } from "@/features/auth/service";

export async function getCurrentUser() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return null;
  }

  return syncUserWithPrisma(session.user);
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return user;
}
