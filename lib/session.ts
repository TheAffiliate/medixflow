import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { Role } from "@/lib/roleHome";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** Call at the top of any protected page, layout or data query. */
export async function requireRole(...roles: Role[]) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!roles.includes(session.user.role as Role)) redirect("/");
  return session;
}