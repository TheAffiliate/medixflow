"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PublicFooter() {
  // Static fallback for the prerender; replaced with the real year after mount.
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

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