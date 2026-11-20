import "server-only";
import { count, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { requireRole } from "@/lib/session";
import { patients, doctors, appointments, prescriptions } from "@/db/schema";

// Counts happen in SQL. No patient rows are ever sent to the browser.
export async function getAdminCounts() {
  await requireRole("admin"); // never rely on the layout alone

  const [[p], [d], [a], [r]] = await Promise.all([
    db.select({ value: count() }).from(patients),
    db.select({ value: count() }).from(doctors).where(eq(doctors.status, "active")),
    db
      .select({ value: count() })
      .from(appointments)
      .where(inArray(appointments.status, ["pending", "approved"])),
    db.select({ value: count() }).from(prescriptions).where(eq(prescriptions.status, "pending")),
  ]);

  return {
    patients: p.value,
    doctors: d.value,
    appointments: a.value,
    prescriptions: r.value,
  };
}