import { Suspense, type ReactNode } from "react";
import { requireRole } from "@/lib/session";

async function AdminGuard({ children }: { children: ReactNode }) {
  await requireRole("admin");
  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
      <Suspense fallback={null}>
        <AdminGuard>{children}</AdminGuard>
      </Suspense>
    </main>
  );
}