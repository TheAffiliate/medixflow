"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Lock, Mail, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";

type Mode = "sign-in" | "sign-up" | "forgot";

const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";

const inputWrap = "relative";
const inputIcon = "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground";
const inputClass =
  "w-full h-12 rounded-lg border border-input bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

const titles: Record<Mode, { title: string; subtitle: string }> = {
  "sign-in": { title: "Welcome to MedixFlow", subtitle: "Sign in to continue" },
  "sign-up": { title: "Create your account", subtitle: "Patients can register here" },
  forgot: { title: "Reset your password", subtitle: "We'll email you a reset link" },
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("sign-in");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function switchMode(next: Mode) {
    setMode(next);
    setError("");
    setNotice("");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "").trim();

    try {
      if (mode === "sign-in") {
        const { error: err } = await authClient.signIn.email({ email, password });
        if (err) {
          setError("Invalid email or password.");
          return;
        }
        router.push("/dashboard");
        router.refresh();
      } else if (mode === "sign-up") {
        const { error: err } = await authClient.signUp.email({ name, email, password });
        if (err) {
          setError(err.message ?? "Could not create your account.");
          return;
        }
        router.push("/dashboard");
        router.refresh();
      } else {
        await authClient.requestPasswordReset({ email, redirectTo: "/reset-password" });
        // Same message whether or not the email exists (prevents account probing).
        setNotice("If an account exists for that email, a reset link has been sent.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setError("");
    await authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" });
  }

  const { title, subtitle } = titles[mode];

  return (
    <AuthLayout title={title} subtitle={subtitle}>
      {mode !== "forgot" && googleEnabled && (
        <>
          <Button type="button" variant="outline" className="w-full h-12" onClick={onGoogle}>
            <GoogleIcon /> Continue with Google
          </Button>
          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
          </div>
        </>
      )}

      <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
        {mode === "sign-up" && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
              Full name
            </label>
            <div className={inputWrap}>
              <UserRound className={inputIcon} />
              <input id="name" name="name" type="text" required autoComplete="name" placeholder="Jane Smith" className={inputClass} />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <div className={inputWrap}>
            <Mail className={inputIcon} />
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
          </div>
        </div>

        {mode !== "forgot" && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
              Password
            </label>
            <div className={inputWrap}>
              <Lock className={inputIcon} />
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={mode === "sign-up" ? 10 : undefined}
                autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
            {mode === "sign-up" && (
              <p className="mt-1.5 text-xs text-muted-foreground">At least 10 characters.</p>
            )}
          </div>
        )}

        {error && (
          <div role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        {notice && (
          <div role="status" className="rounded-lg bg-accent p-3 text-sm text-accent-foreground">
            {notice}
          </div>
        )}

        <Button type="submit" className="w-full h-12" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "sign-in" ? "Sign in" : mode === "sign-up" ? "Create account" : "Send reset link"}
        </Button>

        {mode === "sign-up" && (
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="underline">Terms of Use</Link> and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        )}
      </form>

      <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
        {mode === "sign-in" && (
          <>
            <button type="button" className="font-medium hover:text-foreground" onClick={() => switchMode("forgot")}>
              Forgot password?
            </button>
            <span>
              Need an account?{" "}
              <button type="button" className="font-semibold text-foreground" onClick={() => switchMode("sign-up")}>
                Sign up
              </button>
            </span>
          </>
        )}
        {mode !== "sign-in" && (
          <button type="button" className="font-medium hover:text-foreground" onClick={() => switchMode("sign-in")}>
            ← Back to sign in
          </button>
        )}
      </div>
    </AuthLayout>
  );
}