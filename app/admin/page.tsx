import { Suspense } from "react";
import Link from "next/link";
import { Users, Stethoscope, Calendar, FileText } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import { getAdminCounts } from "@/lib/queries/admin";

const quickActions = [
  { label: "Add Patient File", desc: "Upload pre-existing patient records", href: "/admin/patients" },
  { label: "Onboard Doctor", desc: "Register a new HPCSA-approved doctor", href: "/admin/doctors" },
  { label: "Manage Medicine Stock", desc: "Update the dispensary stock list", href: "/admin/medicine" },
];

const gridClasses = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8";

async function AdminStats() {
  const counts = await getAdminCounts();

  return (
    <div className={gridClasses}>
      <StatCard title="Total Patients" value={counts.patients} icon={Users} color="blue" />
      <StatCard title="Active Doctors" value={counts.doctors} icon={Stethoscope} color="green" />
      <StatCard title="Active Appointments" value={counts.appointments} icon={Calendar} color="amber" />
      <StatCard title="Pending Prescriptions" value={counts.prescriptions} icon={FileText} color="purple" />
    </div>
  );
}

function AdminStatsSkeleton() {
  return (
    <div className={gridClasses}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-22 rounded-xl border border-border bg-card animate-pulse" />
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Overview of your surgery practice" />

      <Suspense fallback={<AdminStatsSkeleton />}>
        <AdminStats />
      </Suspense>

      <div className="mb-8">
        <AppointmentCalendar />
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold text-foreground mb-1">Quick Actions</h2>
        <p className="text-sm text-muted-foreground mb-4">Common administrative tasks</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="p-4 border border-border rounded-lg hover:border-primary hover:bg-accent transition-all group"
            >
              <p className="font-medium text-sm text-foreground group-hover:text-primary">{a.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}