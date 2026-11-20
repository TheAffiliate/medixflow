"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";

const inputClass =
  "w-full h-12 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

function ResetForm() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const newPassword = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (newPassword !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("This reset link is invalid or has expired.");
      return;
    }

    setLoading(true);
    try {
      const { error: err } = await authClient.resetPassword({ newPassword, token });
      if (err) {
        setError(err.message ?? "This reset link is invalid or has expired.");
        return;
      }
      router.push("/login");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Choose a new password" subtitle="At least 10 characters">
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="password" type="password" required minLength={10} autoComplete="new-password" placeholder="New password" className={inputClass} />
        <input name="confirm" type="password" required minLength={10} autoComplete="new-password" placeholder="Confirm new password" className={inputClass} />
        {error && (
          <div role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <Button type="submit" className="w-full h-12" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Update password
        </Button>
      </form>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetForm />
    </Suspense>
  );
}