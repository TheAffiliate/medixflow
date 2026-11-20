import type { LucideIcon } from "lucide-react";

type StatColor = "blue" | "green" | "amber" | "purple";

const colorClasses: Record<StatColor, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  purple: "bg-purple-100 text-purple-700",
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color?: StatColor;
}

// PLACEHOLDER: replace with the converted Base44 version when you share it.
// Keep this a SERVER component (no "use client"): icon components can't be
// passed as props from a server page into a client component.
export default function StatCard({ title, value, icon: Icon, color = "blue" }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm flex items-center gap-4">
      <span className={`h-11 w-11 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}