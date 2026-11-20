import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { roleHome } from "@/lib/roleHome";

// Post-login landing: sends each signed-in user to the dashboard for their role.
async function RoleRedirect(): Promise<never> {
  const session = await getSession();
  if (!session) redirect("/login");
  redirect(roleHome(session.user.role));
}

export default function DashboardRedirect() {
  return (
    <Suspense fallback={<p className="p-8 text-sm text-muted-foreground">Loading…</p>}>
      <RoleRedirect />
    </Suspense>
  );
}