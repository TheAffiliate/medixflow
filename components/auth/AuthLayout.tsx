import type { ReactNode } from "react";
import Link from "next/link";
import { HeartPulse } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-accent via-background to-background px-5 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
        <Link
          href="/"
          aria-label="MedixFlow home"
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <HeartPulse className="h-8 w-8" />
        </Link>
        <h1 className="font-poppins text-2xl font-bold tracking-tight text-center text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-center text-sm text-muted-foreground">{subtitle}</p>
        )}
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}