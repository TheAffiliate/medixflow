"use client";

import Link from "next/link";
import { HeartPulse } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { roleHome } from "@/lib/roleHome";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#roles", label: "Roles" },
  { href: "#access", label: "Access" },
  { href: "#legal", label: "Privacy & Terms" },
];

export default function PublicHeader() {
  const { isAuthenticated, user, navigateToLogin } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-poppins font-bold text-foreground">
          <span className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            <HeartPulse className="h-4 w-4" />
          </span>
          MedixFlow
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {isAuthenticated ? (
          <Button asChild size="sm">
            <Link href={roleHome(user?.role)}>Dashboard</Link>
          </Button>
        ) : (
          <Button size="sm" onClick={navigateToLogin}>
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
}