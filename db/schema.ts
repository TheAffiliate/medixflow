import { sql } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  date,
  time,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export * from "./auth-schema";

/**
 * MedixFlow data model.
 *
 * Source of truth for the database. When a Base44 entity or field is ported,
 * change it HERE, then run:  npm run db:generate  &&  npm run db:migrate
 *
 * Items marked "INFERRED" were deduced from the Base44 UI code, not from the
 * entity definitions. Confirm them against Base44's Data section.
 */

// ─── Enums ──────────────────────────────────────────────────────────────────
// Confirmed by AdminDashboard: "active". "inactive" is INFERRED.
export const doctorStatus = pgEnum("doctor_status", ["active", "inactive"]);

// Confirmed by AdminDashboard: "pending", "approved". The rest are INFERRED.
export const appointmentStatus = pgEnum("appointment_status", [
  "pending",
  "approved",
  "rejected",
  "cancelled",
  "completed",
]);

// Confirmed by AdminDashboard: "pending". "dispensed"/"collected" come from the landing page copy.
export const prescriptionStatus = pgEnum("prescription_status", [
  "pending",
  "dispensed",
  "collected",
  "cancelled",
]);

// ─── Patients ───────────────────────────────────────────────────────────────
export const patients = pgTable(
  "patients",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").references(() => user.id), // set once the patient registers
    fileNumber: text("file_number").notNull().unique(),
    idNumber: text("id_number").unique(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    dateOfBirth: date("date_of_birth"),
    gender: text("gender"),
    phone: text("phone"),
    email: text("email"),
    address: text("address"),
    medicalAidName: text("medical_aid_name"),
    medicalAidNumber: text("medical_aid_number"),
    bloodType: text("blood_type"),
    allergies: text("allergies"),
    preExistingConditions: text("pre_existing_conditions"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("patients_last_name_idx").on(t.lastName)]
);

// ─── Doctors ────────────────────────────────────────────────────────────────
export const doctors = pgTable("doctors", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => user.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  hpcsaNumber: text("hpcsa_number").notNull().unique(),
  speciality: text("speciality"),
  status: doctorStatus("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Real working days and slots, so booking can avoid double bookings.
export const doctorAvailability = pgTable("doctor_availability", {
  id: uuid("id").primaryKey().defaultRandom(),
  doctorId: uuid("doctor_id").notNull().references(() => doctors.id, { onDelete: "cascade" }),
  dayOfWeek: integer("day_of_week").notNull(), // 0 = Sunday ... 6 = Saturday
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  slotMinutes: integer("slot_minutes").notNull().default(15),
});

// ─── Appointments ───────────────────────────────────────────────────────────
export const appointments = pgTable(
  "appointments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    patientId: uuid("patient_id").notNull().references(() => patients.id),
    doctorId: uuid("doctor_id").notNull().references(() => doctors.id),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
    status: appointmentStatus("status").notNull().default("pending"),
    reason: text("reason"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("appointments_starts_at_idx").on(t.startsAt),
    // Database-level guarantee: one live booking per doctor per slot.
    uniqueIndex("appointments_no_double_booking")
      .on(t.doctorId, t.startsAt)
      .where(sql`${t.status} in ('pending', 'approved')`),
  ]
);

// ─── Consultations ──────────────────────────────────────────────────────────
export const consultations = pgTable("consultations", {
  id: uuid("id").primaryKey().defaultRandom(),
  appointmentId: uuid("appointment_id").references(() => appointments.id),
  patientId: uuid("patient_id").notNull().references(() => patients.id),
  doctorId: uuid("doctor_id").notNull().references(() => doctors.id),
  notes: text("notes"),
  diagnosis: text("diagnosis"),
  followUpDate: date("follow_up_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ─── Medicine stock ─────────────────────────────────────────────────────────
export const medicines = pgTable("medicines", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  strength: text("strength"),
  form: text("form"), // tablet, syrup, etc.
  stockQuantity: integer("stock_quantity").notNull().default(0),
  lowStockThreshold: integer("low_stock_threshold").notNull().default(10),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ─── Prescriptions ──────────────────────────────────────────────────────────
export const prescriptions = pgTable(
  "prescriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    consultationId: uuid("consultation_id").references(() => consultations.id),
    patientId: uuid("patient_id").notNull().references(() => patients.id),
    doctorId: uuid("doctor_id").notNull().references(() => doctors.id),
    status: prescriptionStatus("status").notNull().default("pending"),
    issuedAt: timestamp("issued_at", { withTimezone: true }).notNull().defaultNow(),
    dispensedAt: timestamp("dispensed_at", { withTimezone: true }),
    collectedAt: timestamp("collected_at", { withTimezone: true }),
  },
  (t) => [index("prescriptions_status_idx").on(t.status)]
);

export const prescriptionItems = pgTable("prescription_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  prescriptionId: uuid("prescription_id").notNull().references(() => prescriptions.id, { onDelete: "cascade" }),
  medicineId: uuid("medicine_id").notNull().references(() => medicines.id),
  dosage: text("dosage").notNull(),
  duration: text("duration"),
  quantity: integer("quantity").notNull().default(1),
  instructions: text("instructions"),
});

// ─── Audit trail (POPIA accountability) ─────────────────────────────────────
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actorUserId: text("actor_user_id").references(() => user.id),
    action: text("action").notNull(), // e.g. "patient.view", "prescription.issue"
    entityType: text("entity_type").notNull(),
    entityId: uuid("entity_id"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("audit_logs_entity_idx").on(t.entityType, t.entityId)]
);