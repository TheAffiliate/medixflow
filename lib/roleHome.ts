export type Role =
  | "admin"
  | "receptionist"
  | "doctor"
  | "dispensary"
  | "patient";

// Maps a user's role to the dashboard they should land on.
// Adjust these paths to match the routes you create under app/.
export function roleHome(role?: Role | string | null): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "receptionist":
      return "/reception";
    case "doctor":
      return "/doctor";
    case "dispensary":
      return "/dispensary";
    case "patient":
      return "/patient";
    default:
      return "/";
  }
}