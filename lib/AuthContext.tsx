"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { Role } from "./roleHome";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  navigateToLogin: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  const user: AuthUser | null = data?.user
    ? {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: (data.user.role ?? "patient") as Role,
      }
    : null;

  const value: AuthContextValue = {
    isAuthenticated: Boolean(user),
    isLoading: isPending,
    user,
    navigateToLogin: () => router.push("/login"),
    signOut: async () => {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}