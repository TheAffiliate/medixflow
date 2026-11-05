"use client";

import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { roleHome } from "@/lib/roleHome";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck, FileText, CalendarCheck, Stethoscope,
  Users, Pill, ClipboardList, Lock, ArrowRight, Check, HeartPulse,
  UserRound, Building2, PackageCheck,
} from "lucide-react";

interface RoleItem {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface CapabilityItem {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface StepItem {
  t: string;
  d: string;
}

const roles: RoleItem[] = [
  {
    icon: Building2,
    title: "Administrators",
    text: "Oversee the practice: doctor onboarding, patient files, medicine stock, staff access and audit trails.",
  },
  {
    icon: CalendarCheck,
    title: "Receptionists",
    text: "Book and approve appointments, search patient files by name or file number, and track prescription status.",
  },
  {
    icon: Stethoscope,
    title: "Doctors",
    text: "See your day at a glance, record consultations, issue prescriptions and manage your availability.",
  },
  {
    icon: Pill,
    title: "Dispensary",
    text: "Work through the prescription queue, mark items dispensed or collected, and watch stock levels.",
  },
  {
    icon: UserRound,
    title: "Patients",
    text: "View your appointments, consultations and history, book a visit, and see your medication list.",
  },
];

const capabilities: CapabilityItem[] = [
  { icon: FileText, title: "One shared patient record", text: "Demographics, medical aid, allergies, pre-existing conditions, consultations and prescriptions in a single timeline." },
  { icon: CalendarCheck, title: "Availability-aware booking", text: "Appointments are constrained to each doctor's real days and time slots, so double bookings are avoided." },
  { icon: ClipboardList, title: "Consultation to prescription", text: "Doctors record a consultation and issue a prescription that routes straight to the dispensary queue." },
  { icon: PackageCheck, title: "Dispensary stock control", text: "Live stock levels with low and out-of-stock alerts, so the right medicine is on the shelf when it's needed." },
];

const steps: StepItem[] = [
  { t: "Use your practice account", d: "Accounts are created by the practice administrator — clinical staff and reception are invited directly." },
  { t: "Land on your dashboard", d: "You'll see only what your role allows, with a shared calendar of appointments across doctors." },
  { t: "Register as a patient", d: "New patients can enrol with their file number and ID number, then book an appointment online." },
];

export default function Home() {
  const { isAuthenticated, user, navigateToLogin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-accent via-background to-background" />
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-accent-foreground mb-6">
                <HeartPulse className="h-3.5 w-3.5" /> Private surgery management
              </span>
              <h1 className="font-poppins text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
                One calm place to run your entire practice.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mt-5 leading-relaxed max-w-xl">
                MedixFlow brings patient records, appointments, consultations, prescriptions and
                dispensary stock together — so your team spends time on care, not paperwork.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                {isAuthenticated ? (
                  <Button asChild size="lg">
                    <Link href={roleHome(user?.role)}>
                      Go to your dashboard <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" onClick={navigateToLogin}>
                    Sign in to your practice <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a href="#roles">See how it works</a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-7 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Access by role</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> HPCSA-aware doctor records</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> POPIA-aware handling</span>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl bg-card h-80 sm:h-105">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
                  alt="A clinician reviewing patient information on a laptop"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-4 right-4 sm:right-12 rounded-xl border border-border bg-card shadow-lg px-4 py-3 flex items-center gap-3">
                <span className="h-9 w-9 rounded-lg bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                  <CalendarCheck className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">Appointments, consultations and prescriptions</p>
                  <p className="text-xs text-muted-foreground">Visible to the right people, at the right moment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 scroll-mt-20">
          <div className="max-w-2xl">
            <h2 className="font-poppins text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              What MedixFlow is for
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              It is the operational system for a private surgery: every patient, every doctor, every
              appointment and every medicine, held in one shared record so nothing is lost between
              the front desk, the consulting room and the dispensary.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {capabilities.map((c) => (
              <div key={c.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <span className="h-9 w-9 rounded-lg bg-accent text-accent-foreground flex items-center justify-center mb-3">
                  <c.icon className="h-4 w-4" />
                </span>
                <h3 className="font-semibold text-foreground">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Roles */}
        <section id="roles" className="border-y border-border bg-card scroll-mt-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
            <h2 className="font-poppins text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              What you&apos;re about to do
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              Your sign-in details decide what you see. When you log in, you land on the dashboard
              built for your role - nothing more, nothing less.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {roles.map((r) => (
                <div key={r.title} className="rounded-xl border border-border bg-background p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                      <r.icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-semibold text-foreground">{r.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Access */}
        <section id="access" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-poppins text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                How to get in
              </h2>
              <ol className="mt-6 space-y-5">
                {steps.map((s, i) => (
                  <li key={s.t} className="flex gap-3">
                    <span className="h-7 w-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-foreground text-sm">{s.t}</p>
                      <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Already a patient here?</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sign in with the account you registered with. If you have not registered yet, sign in
                and complete the patient registration step using the file number the practice gave you.
              </p>
              {isAuthenticated ? (
                <Button asChild className="mt-5 w-full sm:w-auto">
                  <Link href={roleHome(user?.role)}>
                    Go to your dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button className="mt-5 w-full sm:w-auto" onClick={navigateToLogin}>
                  Sign in <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              <p className="text-xs text-muted-foreground mt-3">
                Trouble signing in? Contact the practice administrator.
              </p>
            </div>
          </div>
        </section>

        {/* Legal */}
        <section id="legal" className="border-t border-border bg-card">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-accent-foreground mb-4">
                <ShieldCheck className="h-3.5 w-3.5" /> Read before you sign in
              </span>
              <h2 className="font-poppins text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Your privacy and the terms you accept
              </h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                These two documents are not optional and apply to everyone who uses MedixFlow.
                Please read both before continuing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <Link
                href="/privacy"
                className="group rounded-xl border-2 border-border bg-background p-6 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-semibold text-foreground mt-4">Privacy Policy</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  What personal and health information we hold, why we hold it, how it is protected
                  and the rights you have under POPIA.
                </p>
              </Link>

              <Link
                href="/terms"
                className="group rounded-xl border-2 border-border bg-background p-6 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-semibold text-foreground mt-4">Terms of Use</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  The rules for using MedixFlow, the medical disclaimer, account responsibilities
                  and the limits of our liability.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}