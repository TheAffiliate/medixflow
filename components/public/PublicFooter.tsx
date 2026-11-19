"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

// Nothing to subscribe to: the year doesn't change while the page is open.
const subscribe = () => () => {};

function useCurrentYear(): number {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(), // browser
    () => 2026 // server / prerender fallback
  );
}

export default function PublicFooter() {
  const year = useCurrentYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>© {year} MedixFlow. All rights reserved.</p>
        <nav className="flex items-center gap-5">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms of Use
          </Link>
        </nav>
      </div>
    </footer>
  );
}