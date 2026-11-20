import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign in | MedixFlow",
};

export default function LoginPage() {
  return <AuthForm />;
}