import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import { user, session, account, verification } from "@/db/auth-schema";

const googleEnabled = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    // TODO before launch: connect a real email provider (Resend, Postmark, SES...)
    // and also require email verification for patient accounts.
    sendResetPassword: async ({ user: u, url }) => {
      if (process.env.NODE_ENV === "production") {
        throw new Error("Email provider not configured");
      }
      console.log(`[dev only] Password reset link for ${u.email}: ${url}`);
    },
  },

  ...(googleEnabled && {
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },
  }),

  user: {
    additionalFields: {
      // input: false means a sign-up request can NEVER choose its own role.
      // Everyone who self-registers is a patient. Staff roles are assigned by an admin.
      role: { type: "string", required: false, defaultValue: "patient", input: false },
    },
  },

  plugins: [nextCookies()], // keep last
});