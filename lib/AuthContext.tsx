"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "./roleHome";

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  user: AuthUser | null;
  navigateToLogin: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// PLACEHOLDER: nobody is signed in yet. Replace the state below with your
// real auth provider (Auth.js, Clerk, Supabase Auth, etc.) when you add one.
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const value: AuthContextValue = {
    isAuthenticated: false,
    user: null,
    navigateToLogin: () => router.push("/login"),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}