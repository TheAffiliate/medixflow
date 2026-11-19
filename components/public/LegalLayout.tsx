import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";

interface LegalLayoutProps {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}

export default function LegalLayout({ title, updated, intro, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <h1 className="font-poppins text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-xs text-muted-foreground mt-2">Last updated: {updated}</p>
          <p className="text-muted-foreground mt-6 leading-relaxed">{intro}</p>

          <div className="mt-10 space-y-10">{children}</div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="font-poppins text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}